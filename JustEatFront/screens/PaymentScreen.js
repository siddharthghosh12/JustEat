import React, { useContext, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, FontAwesome5, Entypo, MaterialCommunityIcons, Ionicons, Fontisto } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Context as DishContext } from '../Context/dishContext';
import { Button } from 'react-native-elements'
import Border from '../thickborder';
import Billcompo from '../components/Bill';

const PaymentScreen = ({ navigation }) => {

    const route = useRoute();
    const { state: cartState } = useContext(DishContext)
    let { title, address, toPay, totalItems } = route.params;
    const [checked, setChecked] = useState(false);

    const Currency_Icon = () => {
        return (
            <View style={styles.cashContainer}>
                <MaterialCommunityIcons name='currency-inr' size={12} color='#00a300' />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{flexDirection:'row'}}>
                <TouchableHighlight style={{ margin: 10 }} onPress={() => navigation.goBack()}  >
                    <AntDesign name='arrowleft' size={15} />
                </TouchableHighlight>
                <Text style={{alignSelf:'center',marginHorizontal:10,fontWeight:'bold'}}>To Pay :</Text>
                <MaterialCommunityIcons name='currency-inr' size={20} style={{alignSelf:'center'}} />
                <Text style={{alignSelf:'center',fontWeight:'bold'}}>{toPay}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    <FontAwesome5 name='hotel' size={20} style={styles.iconStyle} />
                    <View>
                        <Text style={styles.heading}>{cartState[0].restname}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {
                                totalItems > 1 ? <Text style={styles.normalText}>{totalItems} items</Text> : <Text style={styles.normalText}>{totalItems} item</Text>
                            }
                            <Text style={{ color: '#a9a9a9', fontSize: 12 }}> | ETA : 30 MINS</Text>
                        </View>
                    </View>
                </View>
                <AntDesign name='arrowdown' size={35} color='#a9a9a9' style={{ position: 'absolute', marginTop: 45, marginLeft: 3 }} />
                <View style={{ flexDirection: 'row', marginVertical: 10 }}>
                    {
                        title.toLowerCase().includes('work') || title.toLowerCase().includes('office') ?
                            <Entypo name='suitcase' size={20} style={styles.iconStyle} /> : null
                    }
                    {
                        title.toLowerCase().includes('home') ?
                            <Entypo name='home' size={20} style={styles.iconStyle} /> : null
                    }
                    {
                        title.toLowerCase().includes('other') ?
                            <Entypo name='location-pin' size={25} style={styles.iconStyle} /> : null
                    }
                    <View>
                        <Text style={styles.heading}>{title}</Text>
                        <Text style={styles.normalText}>{address}</Text>
                    </View>
                </View>
                <Border height={30} />
                <Billcompo total={toPay} />
                <View style={styles.bordercontainer}>
                    <Text style={styles.normalText}>Credit/Debit Cards</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 12, alignSelf: 'center', marginTop: 10 }}>You can either pay via {<Text style={{ fontWeight: 'bold' }}>CREDIT/DEBIT/VISA</Text>} to order</Text>
                    <View style={{ flexDirection: 'row', marginHorizontal: 35 }}>
                        <Fontisto name='mastercard' size={20} color='#a9a9a9' style={{ margin: 5 }} />
                        <Fontisto name='visa' size={20} color='#a9a9a9' style={{ margin: 5 }} />
                        <Fontisto name='american-express' size={20} color='#a9a9a9' style={{ margin: 5 }} />
                    </View>
                    <Button
                        title='Pay via card'
                        buttonStyle={{ backgroundColor: '#00a300', width: 200, alignSelf: 'center', marginVertical: 15 }}
                    />
                </View>
                <View style={styles.bordercontainer}>
                    <Text style={styles.normalText}>PAY ON DELIVERY</Text>
                </View>
                <View>
                    <View style={{ flexDirection: 'row', marginVertical: 10, marginHorizontal: 5, justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Currency_Icon />
                            <Text style={[styles.heading, { marginLeft: 10 }]}>Cash</Text>
                        </View>
                        {
                            checked ? <Ionicons name='ios-checkmark-circle' size={20} color='#00d100' /> :
                                <Pressable onPress={() => setChecked(!checked)} hitSlop={5}>
                                    <Ionicons name='ios-checkmark-circle-outline' size={20} color="#a9a9a9" />
                                </Pressable>
                        }
                    </View>
                    <Text style={{ fontSize: 12, color: '#a9a9a9', textAlign: 'center' }}>Online payment recommended to reduce contact</Text>
                    {
                        checked ?
                            <Button
                                title='Pay with cash'
                                buttonStyle={{ width: 200, alignSelf: 'center', backgroundColor: '#00a300', marginVertical: 15 }}
                            /> : null
                    }
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default PaymentScreen;

const styles = StyleSheet.create({
    heading: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 20
    },
    iconStyle: {
        marginHorizontal: 10,
        alignSelf: 'center'
    },
    normalText: {
        color: "#a9a9a9",
        marginLeft: 20,
        fontSize: 12
    },
    bordercontainer: {
        backgroundColor: '#f2f0f0',
        height: 50,
        justifyContent: 'center',
    },
    cashContainer: {
        backgroundColor: '#c3f6c3',
        borderColor: '#00d100',
        borderWidth: 1,
        width: 25,
        alignItems: 'center',
        height: 15,
        alignSelf: 'center'
    }
})