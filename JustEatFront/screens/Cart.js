import React, { useContext, useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput, Animated, Dimensions } from 'react-native';
import { Foundation, AntDesign, FontAwesome, Entypo, Ionicons } from '@expo/vector-icons';
import { Divider, CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { Context } from '../Context/dishContext';
import Cartlogo from '../logo/Cartlogo';
import Cartlist from '../components/cartlist';
import Border from '../thickborder';
import Billcompo from '../components/Bill';
import { Context as UserContext } from '../Context/userContext'
import Server from '../server';
import { TouchableOpacity } from 'react-native-gesture-handler';

const screen_width = Dimensions.get('screen').width;

const Cart = () => {
    const { state } = useContext(Context);
    let { state: userState } = useContext(UserContext)
    const navigation = useNavigation();
    const [term, setterm] = useState('');
    const [deliver, setdeliver] = useState(false);
    const [dinein, setdinein] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;
    const scale_anim = useRef(new Animated.Value(0)).current;
    const server = Server;



    const getTotalItems = state.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0)

    const getTotal = state.reduce((sum, item) => {
        return sum + item.dish.Price * item.quantity;
    }, 0);


    const findCurrentAddress = () => {
        let item = userState.user.address.find(item => item.save_as_current === true);
        return item;
    }

    Animated.loop(
        Animated.sequence([
            Animated.timing(scale_anim, {
                toValue: 1.5,
                duration: 300,
                delay: 400,
                useNativeDriver: true
            }),
            Animated.timing(scale_anim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ])
    ).start()

    let title, address;

    const MakePayment = () => {
        let address_item = findCurrentAddress();
        if (address_item !== null) {
            title = address_item.title;
            address = address_item.address;
        }
        return (
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.bottomIcon}>
                    {
                        title.toLowerCase().includes('work') || title.toLowerCase().includes('office') ?
                            <Entypo name='suitcase' size={20} /> : null
                    }
                    {
                        title.toLowerCase().includes('home') ?
                            <Entypo name='home' size={20} /> : null
                    }
                    {
                        title.toLowerCase().includes('other') ?
                            <Entypo name='location-pin' size={40} /> : null
                    }
                    <Animated.View style={[styles.animated_tick, { transform: [{ scale: scale_anim }] }]}>
                        <Ionicons name='ios-checkmark-circle' color='#00d100' size={20} />
                    </Animated.View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    <Text style={styles.headerText}>Deliver to {title}</Text>
                    <Text style={{ color: '#a9a9a9', fontSize: 12, marginLeft: 10 }}>{address}</Text>
                </View>
            </View>
        );
    }

    const opacity = scrollY.interpolate({
        inputRange: [0, 40],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    const listheader = () => {
        return (
            <View style={styles.headercont}>
                <Image source={{ uri: `${server}/${state[0].restimg}` }} style={styles.imgstyle} />
                <Text style={styles.headerText}>{state[0].restname}</Text>
            </View>
        );
    }


    const listFooter = () => {
        return (
            <View >
                <Divider style={{ margin: 15 }} />
                <View style={styles.footsearchcompo}>
                    <Foundation name='clipboard-pencil' size={25} color='#A9A9A9' />
                    <TextInput style={styles.search} placeholder='Any requests? We will try our best' value={term}
                        onChangeText={() => setterm()} />
                </View>
                <Border height={15} />
                <View style={styles.checkcont}>
                    <CheckBox title='Opt for Delievery' checked={deliver}
                        containerStyle={styles.CheckBoxstyle} onPress={() => {
                            setdeliver(!deliver);
                            if (dinein) {
                                setdinein(!dinein)
                            }
                        }} textStyle={{ color: '#4Dc9FF' }} checkedColor='#4dc9ff' />
                    <CheckBox title='Opt for Dine-In' checked={dinein}
                        containerStyle={styles.CheckBoxstyle} onPress={() => {
                            setdinein(!dinein)
                            if (deliver) {
                                setdeliver(!deliver);
                            }
                        }} textStyle={{ color: '#4DC9ff' }} checkedColor='#4dc9ff' />
                </View>
                <Border height={15} />
                <Billcompo total={getTotal} />
                <Border height={30} />
            </View>
        );
    }

    return (
        state.length === 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Cartlogo />
                <Text style={styles.text}>SAY YES TO TUMMY</Text>
                <Text style={styles.infoText}>Your cart is empty.</Text>
                <Text style={styles.infoText}>Add something from the Menu</Text>
                <Button title='Browse all restaurants'
                    buttonStyle={{ borderColor: '#4DC9FF', borderWidth: 1, borderRadius: 5 }}
                    titleStyle={{ color: '#4DC9FF' }}
                    containerStyle={{ marginTop: 20 }}
                    type="outline"
                    onPress={() => navigation.navigate('JUSTEAT')} />
            </View>
            :
            <View style={{ marginTop: 30, flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={{ margin: 10 }} onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={20} />
                    </TouchableOpacity>
                    <Animated.View style={{ opacity: opacity }}>
                        <View>
                            <Text style={styles.headerText}>{state[0].restname}</Text>
                            <View style={{ flexDirection: 'row', marginLeft: 25 }}>
                                {
                                    getTotalItems > 1 ? <Text >{getTotalItems} items,</Text> :
                                        <Text>{getTotalItems} item,</Text>
                                }
                                <Text> To Pay : </Text>
                                <FontAwesome name='rupee' size={15} style={{ alignSelf: 'center' }} />
                                <Text> {getTotal}</Text>
                            </View>
                        </View>
                    </Animated.View>
                </View>
                <FlatList
                    data={state}
                    keyExtractor={result => result.dish.name}
                    renderItem={({ item }) => {
                        return <Cartlist result={item} />
                    }}
                    ListHeaderComponent={listheader}
                    ListFooterComponent={listFooter}
                    showsVerticalScrollIndicator={false}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false, isInteraction: false }
                    )}
                />
                {
                    userState?.user !== null ?
                        <View style={styles.bottomContainer}>
                            <MakePayment />
                            <Button
                                title='PROCEED TO PAY'
                                titleStyle={{ fontSize: 14 }}
                                buttonStyle={{ backgroundColor: '#00a300' }}
                                onPress={() => navigation.navigate('Payments',{
                                    title:title,
                                    address:address,
                                    toPay:getTotal,
                                    totalItems:getTotalItems
                                })}
                            />
                        </View> : <View></View>
                }
            </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 10
    },
    infoText: {
        color: '#A9A9A9'
    },
    imgstyle: {
        width: 60,
        height: 50
    },
    headercont: {
        flexDirection: 'row',
        flex: 1,
        margin: 15,
        marginBottom: 20,

    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
    search: {
        flex: 1,
        marginLeft: 5
    },
    footsearchcompo: {
        marginLeft: 15,
        flexDirection: 'row',
        height: 30,
        marginBottom: 10
    },
    CheckBoxstyle: {
        borderColor: '#4DC9FF',
        borderWidth: 1,
        backgroundColor: '#D8F2FF',
        width: 160
    },
    checkcont: {
        flexDirection: 'row',
        marginVertical: 15
    },
    bottomIcon: {
        borderColor: '#d2f8ff',
        borderWidth: 1,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    bottomContainer: {
        width: screen_width,
        height: 120
    },
    animated_tick: {
        position: 'absolute',
        top: -5,
        right: -5
    }
})

export default Cart;