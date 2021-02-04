import React, { useMemo, useContext, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Border from '../thickborder';
import useDishes from '../hooks/usedishes';
import BottomImage from '../logo/bottomlogo';
import Restdetail from '../components/restaurantdetail';
import BottomSheet from '../components/Bottomsheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Context } from '../Context/userContext';
import { Context as DishContext } from '../Context/dishContext'
import Loading_compo from '../components/Loadingcompo';
import api from '../api/dishapi';


const DetailsScreen = ({ navigation }) => {
    const { result, id } = useDishes();
    const [touched, setouched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cartItem, setCartItem] = useState({})
    const { state, Handle_favourites } = useContext(Context)
    const { replaceCart,state:dishState } = useContext(DishContext)
    const scrollY = useRef(new Animated.Value(0)).current;
    const Currentval = new Animated.Value(1);
    const Animateheart = Animated.createAnimatedComponent(AntDesign);


    const SendRecommended = () => {
        return (result.dishes || []).filter((dish) => {
            return dish.bestSeller === true || dish.mustTry === true;
        });

    }

    const TriggerAnimation = () => {
        Animated.spring(Currentval, {
            toValue: 1.5,
            friction: 2,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(Currentval, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }).start();
        })
    }


    const add_to_favourites = async () => {
        if (state.user === null) {
            return;
        }
        setouched(!touched);
        Handle_favourites(item);
        await api.post('/users/add_to_fav', {
            id: id,
            name: result.name,
            image: result.image,
            trademark: result.trademark,
            CostFor2: result.CostFor2,
            rating: result.rating,
            touched: touched,
            email: state.user.user.email
        })
    }

    const remove_from_favourites = async () => {
        if (state.user === null) {
            return;
        }
        setouched(!touched);
        Handle_favourites(item);
        await api.delete('/users/delete_from_fav', {
            data: {
                id: id,
                email: state.user.user.email
            }
        })
    }

    const item = {
        id: id,
        name: result.name,
        image: result.image,
        trademark: result.trademark,
        CostFor2: result.CostFor2,
        rating: result.rating,
        touched: touched
    }


    useEffect(() => {
        // console.log(item);
        //console.log(result)
        if (touched)
            TriggerAnimation()
    }, [state?.user?.favourites]);

    const HEADER_MAX_HEIGHT = 200;
    const HEADER_MIN_HEIGHT = 60;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - 2 * HEADER_MIN_HEIGHT;


    const opacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })


    const Headercompo = () => {
        return (
            <View>
                <Text style={styles.titlestyle}>{result.name}</Text>
                <Text style={styles.innertext}>{result.trademark}</Text>
                <Divider style={{ margin: 15 }} />
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ marginLeft: 30 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                            <FontAwesome name='star' size={17} color='black' />
                            <Text>{result.rating}</Text>
                        </View>
                        <Text style={styles.innertext}>20+ ratings</Text>
                    </View>
                    <View style={{ marginLeft: 100 }}>
                        <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                            <FontAwesome name='rupee' size={17} color='black' />
                            <Text>{result.CostFor2}</Text>
                        </View>
                        <Text style={styles.innertext}>Cost for 2</Text>
                    </View>
                </View>
                <Divider style={{ margin: 15 }} />
                <Border height={10} />
            </View>
        );
    }

    const FooterCompo = () => {
        return (
            <View>
                <BottomImage />
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return <Restdetail items={item} restid={result._id} restname={result.name} restimg={result.image} openModal={() => setIsModalOpen(!isModalOpen)} setItem={(item) => setCartItem(item)} />
    }

    const Memoval = useMemo(() => renderItem, [result])
    return (
        result.length === 0 ?
            <View style={styles.loadingcont}>
                <Loading_compo />
            </View> :
            <SafeAreaView style={{ flex: 1 }}>
                <Animated.View style={[styles.header]}>
                    <View style={styles.header_container}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name='arrowleft' size={20} color="#404040" />
                        </TouchableOpacity>
                        <Animated.Text style={[styles.titlestyle], { fontSize: 18, fontWeight: 'bold', opacity: opacity }}>{result.name}</Animated.Text>
                        <View style={{ flexDirection: 'row' }}>
                            {state?.user?.favourites.findIndex(item => item.id === id) !== -1 && state.user !== null ? <TouchableOpacity onPress={() => remove_from_favourites()} style={{ marginHorizontal: 20 }}>
                                <Animateheart name='heart' size={20} color='red' style={{
                                    transform: [
                                        { scale: Currentval }
                                    ]
                                }} />
                            </TouchableOpacity> :
                                <TouchableOpacity onPress={() => add_to_favourites()} style={{ marginHorizontal: 20 }}>
                                    <Animateheart name='hearto' size={20} color='black' />
                                </TouchableOpacity>}
                        </View>
                    </View>
                </Animated.View>
                <View style={styles.modalView}>
                    <Modal visible={isModalOpen} animationType='fade'
                        transparent
                    >
                        <View style={styles.modal_container}>
                            <Text style={[styles.titlestyle], { fontSize: 16, fontWeight: 'bold',marginVertical:5 }}>Replace Cart Items?</Text>
                            <Text style={styles.modalText}>Your cart contain items from</Text>
                            <Text style={styles.modalText}>{dishState[0]?.restname}.</Text>                                       
                            <Text style={styles.modalText}>Do you want to replace them?</Text>
                            <View style={{flexDirection:'row',alignSelf:'center'}}>
                                <Button
                                    title='Yes'
                                    type='outline'
                                    onPress={() => {
                                        replaceCart(cartItem);
                                        setIsModalOpen(!isModalOpen)
                                    }}
                                    buttonStyle={{width:100}}
                                />
                                <Button title='No'
                                    type='outline'
                                    onPress={() => setIsModalOpen(!isModalOpen)}
                                    buttonStyle={{width:100}}
                                />
                            </View>
                        </View>
                    </Modal>
                </View>
                <Animated.FlatList
                    data={[{ title: 'Recommended', dishes: SendRecommended() }, { title: 'Menu', dishes: result.dishes }]}
                    keyExtractor={res => res.title}
                    showsVerticalScrollIndicator={false}
                    listKey="1.1"
                    ListHeaderComponent={Headercompo}
                    ListFooterComponent={FooterCompo}
                    renderItem={Memoval}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false, isInteraction: false }
                    )}
                    scrollEventThrottle={10}
                >
                </Animated.FlatList>
                <BottomSheet />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titlestyle: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 15
    },
    innertext: {
        marginLeft: 15,
        color: '#A9A9A9'
    },
    loadingcont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    menutxt: {
        fontWeight: 'bold',
        fontSize: 22,
        margin: 20
    },
    header_container: {
        flexDirection: 'row',
        marginLeft: 10,
        marginTop: 10,
        justifyContent: 'space-between',
    },
    header: {
        position: 'relative',
        top: 0,
        overflow: 'hidden',
        left: 0,
        right: 0,
    },
    modal_container: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 200,
        justifyContent: 'center',
        alignItems:'center',
        marginVertical: 10,
        width:250,
        padding:30,
        alignSelf:'center'
    },
    modalView: {
        flex: 1,
        alignSelf:'center',
        position:'absolute',
    },
    modalText :{
        color:"#a9a9a9",
        fontSize:13,
        marginVertical:1,
    }

});

export default DetailsScreen;