import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements';
import Server from '../server';
import userapi from '../api/dishapi';
import { SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OtpVerifyScreen from './otpform';


const Loginform = ({ closeModal }) => {
    const login_img = 'Veg role.jpg';
    const [username, setusername] = useState('');
    const [validname, setvalidname] = useState(true);
    const [email, setemail] = useState('');
    const [validmail, setvalidmail] = useState(true);
    const [Password, setPassword] = useState('');
    const [validpass, setvalidpass] = useState(true);
    const [mobile, setmobile] = useState('')
    const [validmob, setvalidmob] = useState(true);
    const [loginform, setloginform] = useState(false);
    const [req_status, setreq_status] = useState('');
    const [otp, setotp] = useState('');
    const [show_otp_screen, setshow_otp_screen] = useState(false);


    const user_state = {
        user: {
            name: username,
            email: email,
            Phone: mobile,
        },
        address: [],
        orders: [],
        favourites: []
    }

    const checkMobile = () => {
        var mobre = /[\d]/g;
        if (mobre.test(mobile) && mobile.length === 10) {
            setvalidmob(true);
            return true;
        }
        setvalidmob(false);
    }

    const checkemail = () => {
        var emailreg = email.split('@')[1];
        if (emailreg !== 'itbhu.ac.in') {
            setvalidmail(false);
            return true;
        }
        setvalidmail(true);
        return false;
    }

    const checkname = () => {
        if (username.length === 0) {
            setvalidname(false);
            return;
        }
        setvalidname(true)
    }

    const checkpass = () => {
        if (Password.length === 0) {
            setvalidpass(false);
            return;
        }
        setvalidpass(true)
    }

    const handleCreate = async () => {
        if (!validmail || !validmob || !validpass || !validname)
            return false;
        const response = await userapi.post('/users/register', {
            email: email,
            name: username,
            password: Password,
            Phone: '91' + mobile
        });
        if (response.status === 200) {
            setreq_status('Success');
            setloginform(true);
            await AsyncStorage.setItem('user', JSON.stringify(user_state));
            return;
        }
        setreq_status('Failed');
    }

    const handleLogin = async () => {
        if (!validname || !validmail)
            return false;
        let login_response = await userapi.post('/users/login', {
            Phone: '+91' + mobile
        });
        if (login_response.status === 200) {
            setreq_status('');
            setshow_otp_screen(true);
            return;
        }
    }

    return (
        req_status === 'Loading' ? <View style={styles.loading_cont}>
            <ActivityIndicator size='large' color='#4dc9ff' />
        </View> :
            <SafeAreaView>
                {
                    show_otp_screen === true ?
                        <View style={styles.loading_cont} >
                                <OtpVerifyScreen phone={mobile} switch_off_modal={closeModal}/>
                        </View>
                        :
                        <View>
                            <ImageBackground source={require('../assets/Vegrole.jpg')} style={styles.img} />
                            {
                                loginform === true ?
                                    <View style={styles.container} >
                                        {req_status === 'Success' ? <Text style={styles.formtext} >You can now Login to order Food</Text> : null}
                                        <Text style={styles.heading}>Login</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 15 }}>
                                            <Text style={{ color: '#a9a9a9' }}>Or</Text>
                                            <TouchableOpacity onPress={() => setloginform(!loginform)}>
                                                <Text style={{ color: '#4dc9ff', marginHorizontal: 5 }}>Create an account</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.formtext}>Username</Text>
                                        <TextInput placeholder='  Username' style={styles.input} value={username} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setusername(term)} />
                                        {!validname ? <Text style={{ color: 'red', marginLeft: 20 }}>Username should not be empty</Text> : null}
                                        <Text style={styles.formtext}>Mobile No.</Text>
                                        <TextInput placeholder='  +91-1234567898' style={styles.input} value={mobile} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setmobile(term)} onEndEditing={() => checkMobile()} />
                                        {!validmob && mobile.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>Invalid number</Text> : null}
                                        <Button title='Login' type='outline' containerStyle={{ marginTop: 20, marginHorizontal: 20 }} titleStyle={{ color: '#d2f8ff', fontWeight: 'bold' }}
                                            buttonStyle={{ borderColor: '#4dc9ff' }} onPress={() => {
                                                setreq_status('Loading');
                                                handleLogin();
                                            }} />
                                        <Button title='Cancel ' type='outline' containerStyle={{ margin: 20 }} titleStyle={{ color: '#d2f8ff', fontWeight: 'bold' }}
                                            buttonStyle={{ borderColor: '#4dc9ff' }} onPress={closeModal} />
                                    </View> :
                                    <ScrollView style={styles.container} >
                                        <Text style={styles.heading}>Create an Account</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 15 }}>
                                            <Text style={{ color: '#a9a9a9' }}>Or</Text>
                                            <TouchableOpacity onPress={() => setloginform(!loginform)}>
                                                <Text style={{ color: '#4dc9ff', marginHorizontal: 5 }}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.formtext}>Username</Text>
                                        <TextInput placeholder='  Username' style={styles.input} value={username} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setusername(term)} onEndEditing={() => checkname()} />
                                        {!validname ? <Text style={{ color: 'red', marginLeft: 20 }}>Username should not be empty</Text> : null}
                                        <Text style={styles.formtext}>EmailId</Text>
                                        <TextInput placeholder='  example@itbhu.ac.in' style={!checkemail ? styles.err : styles.input} value={email} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setemail(term)} onEndEditing={() => checkemail()} />
                                        {!validmail && email.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>You should only Login via your institute id</Text> : null}
                                        <Text style={styles.formtext}>Password</Text>
                                        <TextInput placeholder=' ********' style={styles.input} value={Password} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setPassword(term)} secureTextEntry={true} onEndEditing={() => checkpass()} />
                                        {!validpass ? <Text style={{ color: 'red', marginLeft: 20 }}>Password should not be empty</Text> : null}
                                        <Text style={styles.formtext}>Mobile No.</Text>
                                        <TextInput placeholder='  +91-1234567898' style={styles.input} value={mobile} placeholderTextColor='#d8f2ff'
                                            onChangeText={(term) => setmobile(term)} onEndEditing={() => checkMobile()} />
                                        {!validmob && mobile.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>Invalid number</Text> : null}
                                        <Button title='Create Account' type='outline' containerStyle={{ marginTop: 20, marginHorizontal: 20 }} titleStyle={{ color: '#d2f8ff', fontWeight: 'bold' }}
                                            buttonStyle={{ borderColor: '#4dc9ff' }} onPress={() => {
                                                handleCreate();
                                                setreq_status('Loading');
                                            }} />
                                        <Button title='Cancel ' type='outline' containerStyle={{ margin: 20 }} titleStyle={{ color: '#d2f8ff', fontWeight: 'bold' }}
                                            buttonStyle={{ borderColor: '#4dc9ff' }} onPress={closeModal} />
                                        {req_status === 'Failed' ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 18 }}>Oops, Something went wrong.Please try again Later.</Text> : null}
                                    </ScrollView>
                            }
                        </View>
                }
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        marginHorizontal: 20,
        color: '#4dc9ff'
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',

    },
    container: {
        position: 'absolute',
        top: 50,
        bottom: 0,
        left: 0,
        right: 0
    },
    formtext: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4dc9ff',
        marginLeft: 20
    },
    input: {
        height: 35,
        borderRadius: 5,
        marginHorizontal: 20,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#4dc9ff',
        marginVertical: 5,
        color: '#4dc9ff'
    },
    inputotp: {
        height: 35,
        borderRadius: 5,
        marginHorizontal: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: '#4dc9ff',
        marginVertical: 5,
        color: '#4dc9ff',
        borderStyle: "dashed"
    },
    loading_cont: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default Loginform;