import React, { useContext, useState } from 'react';
import { Button, Divider } from 'react-native-elements';
import { Text, View, StyleSheet, Image, Dimensions, Modal,TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'
import { Context } from '../Context/userContext';
import Server from '../server';
import Loginform from '../components/LoginForm';
import Managecompo from '../components/manage_account';
import Border from '../thickborder';
import Ordercompo from '../components/ordercompo';
import { AntDesign } from '@expo/vector-icons';

const screen_width = Dimensions.get('screen').width;
const AccountScreen = () => {

    const { state,Logout } = useContext(Context);
    const [modalvisible, setModalvisible] = useState(false);
    const acc_icon = 'account.png';
    //console.log(state);
    return (
        state?.user === null ?
            <View style={styles.container}>
                <Image source={{ uri: `${Server}/images/${acc_icon}` }} style={styles.image} />
                <Text style={styles.heading}>ACCOUNT</Text>
                <Text style={styles.Text}>Login/Create Account to fill your tummy</Text>
                <Button title='Login' buttonStyle={{ width: 200, alignSelf: 'center', borderColor: '#4dc9ff' }}
                    type='outline' titleStyle={{ color: '#4dc9ff', fontSize: 18 }} onPress={() => setModalvisible(true)} />
                <Modal animationType='slide'
                    transparent={true} visible={modalvisible}
                >
                    <View style={styles.containerView}>
                        <View style={styles.modalView}>
                            <Loginform closeModal={() => setModalvisible(false)} />
                        </View>
                    </View>
                </Modal>
                <Divider style={{ margin: 20, height: 2, backgroundColor: '#4dc9ff' }} />
                <Managecompo iconname='ios-mail' title='Send Feedback' />
            </View> :
            <View style={styles.account_container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>{state.user.user.name.toUpperCase()}</Text>
                    <TouchableOpacity>
                        <Text style={[styles.heading,{color:'#4dc9ff',marginRight:15}]}>edit</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.Text}>{state.user.user.Phone}</Text>
                    <Entypo name='dot-single' size={20} color='#a9a9a9' />
                    <Text style={styles.emailtext}>{state.user.user.email}</Text>
                </View>
                <Divider style={{ margin: 5, height: 2, backgroundColor: '#4dc9ff' }} />
                <Managecompo iconname='home' title='Manage Address' />
                <Managecompo iconname='money' title='Payments' />
                <Managecompo iconname='heart-o' title='Favourites' />
                <Managecompo iconname='ios-mail' title='Send Feedback' />
                <View style={styles.order_cont}>
                    <Text style={[styles.Text,{color:'#4dc9ff',marginBottom:5}]}>Past Orders</Text>
                </View>
                <Ordercompo />
                <Border height={20} />
                <TouchableOpacity style={styles.logout_cont} onPress={() => Logout()}>
                    <Text style={[styles.heading,{marginTop:15}]}>Logout</Text>
                    <AntDesign name='poweroff' size={20} color='black' style={{margin:15}} />
                </TouchableOpacity>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 1
    },
    image: {
        height: 400,
        width: screen_width
    },
    heading: {
        fontSize: 17,
        fontWeight: 'bold',
        marginTop: 25,
        marginLeft: 15
    },
    Text: {
        marginLeft: 15,
        fontWeight: '900',
        color: '#a9a9a9',
        marginBottom: 15
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        flex: 1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    containerView: {
        margin: 20,
        flex: 1
    },
    account_container: {
        marginTop: 20,
        flex: 1
    },
    emailtext: {
        fontWeight: '900',
        color: '#a9a9a9',
        marginBottom: 15
    },
    order_cont:{
        backgroundColor:'#f2f0f0',
        height:30
    },
    logout_cont:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
})

export default AccountScreen;