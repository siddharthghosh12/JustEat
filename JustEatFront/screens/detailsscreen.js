import React, { useMemo, useContext, useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Border from '../thickborder';
import useDishes from '../hooks/usedishes';
import BottomImage from '../logo/bottomlogo';
import Restdetail from '../components/restaurantdetail';
import BottomSheet from '../components/Bottomsheet';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import {Context} from '../Context/userContext';
import Loading_compo from '../components/Loadingcompo'



const DetailsScreen = ({ navigation }) => {
    const { result,id } = useDishes();
    const [touched, setouched] = useState(true);
    const {state,Handle_favourites} = useContext(Context)
    const scrollY = useRef(new Animated.Value(0)).current;
    const Currentval = new Animated.Value(1);
    const Animateheart = Animated.createAnimatedComponent(AntDesign);


    const SendRecommended = () => {
        return (result.dishes || []).filter((dish) => {
            return dish.bestSeller === true || dish.mustTry === true;
        });

    }

    const TriggerAnimation = () => {
        Animated.timing(Currentval, {
            toValue: 2,
            duration:500,
            useNativeDriver: true,
        }).start(() => {
            Animated.timing(Currentval, {
                toValue: 1,
                duration:300,
                useNativeDriver: true
            }).start();
        })
    }

    const item={
        id:id,
        name:result.name,
        img:result.image,
        trademark:result.trademark,
        CostFor2:result.CostFor2,
        rating:result.rating,
        touched:touched
    }


    useEffect(() => {
      // console.log(item);
     //console.log(result)
        if (touched)
            TriggerAnimation()
    }, [touched]);

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
        return <Restdetail items={item} restid={result._id} restname={result.name} restimg={result.image} />
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
                        <Animated.Text style={[styles.titlestyle], { fontSize: 18, fontWeight: 'bold', opacity: opacity }}>{result.name.toUpperCase()}</Animated.Text>
                        <View style={{ flexDirection: 'row' }}>
                            <AntDesign name='search1' size={20} color='#808080' />
                            {touched && state?.user?.favourites.findIndex(item => 
                            item.id === id
                            ) !== -1 && state.user !== null  ? <TouchableOpacity onPress={() => {
                                if(state.user === null)
                                    return;
                                setouched(!touched)
                                Handle_favourites(item);
                            }} style={{ marginHorizontal: 20 }}>
                                <Animateheart name='heart' size={20} color='red' style={{
                                    transform: [
                                        { scale: Currentval }
                                    ]
                                }} />
                            </TouchableOpacity> :
                                <TouchableOpacity onPress={() => { 
                                    if(state.user === null)
                                        return;
                                       setouched(!touched)
                                        Handle_favourites(item)
                                    }} style={{ marginHorizontal: 20 }}>
                                    <Animateheart name='hearto' size={20} color='black' />
                                </TouchableOpacity>}
                        </View>
                    </View>
                </Animated.View>
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
        left:0,
        right:0,
    }

});

export default DetailsScreen;