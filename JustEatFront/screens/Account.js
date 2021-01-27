import React, { useContext, useState } from 'react';
import { Button, Divider } from 'react-native-elements';
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { Context } from '../Context/userContext'
import Managecompo from '../components/manage_account';
import Border from '../thickborder';
import Ordercompo from '../components/ordercompo';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'

const screen_width = Dimensions.get('screen').width;
const screen_height = Dimensions.get('screen').height;
const AccountScreen = () => {

    const navigation = useNavigation()
    const { state, Logout } = useContext(Context);

    const Img_icon = () => {
        return(
            <View style={styles.name_img}>
                <Text style={styles.name_img_text}>{state.user.user.name[0]}</Text>
            </View>
        )
    }


    return (
        state?.user === null ?
            <View style={styles.container}>
                <ImageBackground source={require('../assets/Food.png')} style={styles.image} />
                <Button title='Login / Register' buttonStyle={{ width: 300, alignSelf: 'center', backgroundColor: '#4dc9ff', borderRadius: 10, marginVertical: 10 }}
                    type='solid' titleStyle={{ color: '#ecfaff', fontSize: 18 }} onPress={() => navigation.navigate('Login')} />
                <Divider style={{ margin: 20, height: 2, backgroundColor: '#4dc9ff' }} />
                <Managecompo iconname='ios-mail' title='Send Feedback' />
            </View> :
            <View style={styles.account_container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <Img_icon />
                        <Text style={styles.heading}>{state.user.user.name.toUpperCase()}</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={[styles.heading, { color: '#4dc9ff', marginRight: 15 }]}>edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Entypo name='dot-single' size={20} color='black' style={styles.icon} />
                    <Text style={styles.Text}>{state.user.user.Phone}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Entypo name='dot-single' size={20} color='black' style={styles.icon} />
                    <Text style={styles.Text}>{state.user.user.email}</Text>
                </View>
                <Divider style={{ margin: 5, height: 2, backgroundColor: 'black' }} />
                <TouchableOpacity onPress={() => navigation.navigate('Address')}>
                    <Managecompo iconname='home' title='Manage Address' />
                </TouchableOpacity>
                <Managecompo iconname='money' title='Payments' />
                <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
                    <Managecompo iconname='heart-o' title='Favourites' />
                </TouchableOpacity>
                <Managecompo iconname='ios-mail' title='Send Feedback' />
                <View style={styles.order_cont}>
                    <Text style={styles.Past_order_text}>Past Orders</Text>
                </View>
                <Ordercompo />
                <Border height={20} />
                <TouchableOpacity style={styles.logout_cont} onPress={() => Logout()}>
                    <Text style={[styles.heading, { marginTop: 15 }]}>Logout</Text>
                    <AntDesign name='poweroff' size={20} color='black' style={{ margin: 15 }} />
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 1,
        flex: 1,
    },
    image: {
        height: screen_height / 1.5,
        width: screen_width,
        resizeMode: 'cover',
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 25,
    },
    Text: {
        marginLeft: 5,
        fontWeight: '900',
        color: '#a9a9a9'
    },
    icon: {
        marginLeft: 10
    },
    account_container: {
        marginTop: 20,
        flex: 1
    },
    order_cont: {
        backgroundColor: '#f2f0f0',
        justifyContent: 'center'
    },
    logout_cont: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    Past_order_text: {
        justifyContent: 'center',
        color: 'black',
        marginLeft: 15,
        fontWeight: 'bold',
        marginVertical: 15
    },
    name_img: {
        backgroundColor:'#ecfaff',
        marginHorizontal:12,
        width:50,
        height:50,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        marginVertical:10,
        borderColor:"#4dc",
        borderWidth:1
    },
    name_img_text :{
        color:'#4dc9ff',
        fontWeight:"800",
        fontSize:22
    }
})

export default AccountScreen;