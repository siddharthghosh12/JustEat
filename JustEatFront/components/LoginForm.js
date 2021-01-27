import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, ImageBackground, TouchableOpacity, ScrollView, ActivityIndicator,KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import userapi from '../api/dishapi';
import { SafeAreaView } from 'react-native';
import OtpVerifyScreen from './otpform';
import Loading_compo from './Loadingcompo';
/*
TODO: Configure the design of the login screen.
      Add Loading animation.
      

*/
// Displays a Login form on the screen
const Loginform = () => {
    
    // Various params to check user_info and validate for network requests
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
    const [show_otp_screen, setshow_otp_screen] = useState(false);


    // Validation of mobile number of the user
    const checkMobile = () => {
        var mobre = /[\d]/g;

        // checks if the mobile_No. field is not empty and of sufficient length
        if (mobre.test(mobile) && mobile.length === 10) {
            setvalidmob(true);
            return true;
        }
        setvalidmob(false);
    }

     // Validation of email of the user
    const checkemail = () => {
        var emailreg = email.split('@')[1];
        // checks whether the user uses institute id or not
        if (emailreg !== 'itbhu.ac.in') {
            setvalidmail(false);
            return true;
        }
        setvalidmail(true);
        return false;
    }

    // Validation of user_name
    const checkname = () => {
        if (username.length === 0) {
            setvalidname(false);
            return;
        }
        setvalidname(true)
    }

    // Password Validation
    const checkpass = () => {
        if (Password.length === 0) {
            setvalidpass(false);
            return;
        }
        setvalidpass(true)
    }

    // Function to register the user
    const handleCreate = async () => {

        // checks whether all the params are valid or not
        if (!validmail || !validmob || !validpass || !validname || username==='' || mobile==='' || email==='' || Password==='')
            {
                setreq_status('SignupInvalid')
                return;
            }
            setreq_status('Loading');

        // Makes request using async/await and handles the response accordingly
        const response = await userapi.post('/users/register', {
            email: email,
            name: username,
            password: Password,
            Phone: '91' + mobile
        });
        if (response.status === 200) {
            setreq_status('Success');
            setloginform(true);
            return;
        }
        setreq_status('Failed');
    }

    // function to login the user in to the application
    const handleLogin = async () => {
        if (!validname || !validmob || username==='' || mobile==='')
            {
                setreq_status('LoginInvalid');
                return;
            }
            setreq_status('Loading');
        let login_response = await userapi.post('/users/login', {
            Phone: '+91' + mobile
        });
        if (login_response.status === 200) {
            setreq_status('');
            setshow_otp_screen(true);
            return;
        }
    }


    // Renders different components depending upon the state and situation
    return (
        req_status === 'Loading' ? <View style={styles.loading_cont}>
           <Loading_compo />
        </View> :
            <SafeAreaView>
                {
                    show_otp_screen === true ?
                        <View style={styles.loading_cont} >
                                <OtpVerifyScreen phone={mobile}/>
                        </View>
                        :
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <ImageBackground source={require('../assets/food1.png')} style={styles.img} />
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
                                        <TextInput placeholder='Username' style={styles.input} value={username} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setusername(term)} />
                                        {!validname ? <Text style={{ color: 'red', marginLeft: 20 }}>Username should not be empty</Text> : null}
                                        <Text style={styles.formtext}>Mobile No.</Text>
                                        <TextInput placeholder='+91-1234567898' style={styles.input} value={mobile} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setmobile(term)} onEndEditing={() => checkMobile()} />
                                        {!validmob && mobile.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>Invalid number</Text> : null}
                                        <Button title='Login' type='solid' containerStyle={{ marginTop: 20, marginHorizontal: 20 }} titleStyle={{ color: '#d2f8ff', fontWeight: 'bold' }}
                                            buttonStyle={{ backgroundColor: '#4dc9ff' }} onPress={() => {
                                                handleLogin();
                                            }} />
                                         {req_status === 'LoginInvalid' ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 18 }}>*One or more of the above input field is empty</Text> : null}
                                    </View> :
                                    <View style={styles.container} >
                                        <Text style={styles.heading}>Create an Account</Text>
                                        <View style={{ flexDirection: 'row', marginLeft: 20, marginBottom: 15 }}>
                                            <Text style={{ color: '#a9a9a9' }}>Or</Text>
                                            <TouchableOpacity onPress={() => setloginform(!loginform)}>
                                                <Text style={{ color: '#4dc9ff', marginHorizontal: 5 }}>Login</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={styles.formtext}>Username</Text>
                                        <TextInput placeholder='Username' style={styles.input} value={username} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setusername(term)} onEndEditing={() => checkname()} />
                                        {!validname ? <Text style={{ color: 'red', marginLeft: 20 }}>*Username should not be empty</Text> : null}
                                        <Text style={styles.formtext}>EmailId</Text>
                                        <TextInput placeholder='example@itbhu.ac.in' style={!checkemail ? styles.err : styles.input} value={email} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setemail(term)} onEndEditing={() => checkemail()} />
                                        {!validmail && email.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>*You should only Login via your institute id</Text> : null}
                                        <Text style={styles.formtext}>Password</Text>
                                        <TextInput placeholder='********' style={styles.input} value={Password} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setPassword(term)} secureTextEntry={true} onEndEditing={() => checkpass()} />
                                        {!validpass ? <Text style={{ color: 'red', marginLeft: 20 }}>*Password should not be empty</Text> : null}
                                        <Text style={styles.formtext}>Mobile No.</Text>
                                        <TextInput placeholder='+91-1234567898' style={styles.input} value={mobile} placeholderTextColor='#a9a9a9'
                                            onChangeText={(term) => setmobile(term)} onEndEditing={() => checkMobile()} />
                                        {!validmob && mobile.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20 }}>*Invalid number</Text> : null}
                                        {req_status === 'SignupInvalid' ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 14,marginVertical:10 }}>*One or more of the above input field is empty</Text> : null}
                                        <Button title='Create Account' type='outline' containerStyle={{ marginTop: 20, marginHorizontal: 20 }} titleStyle={{ color: '#ecfaff', fontWeight: 'bold' }}
                                            buttonStyle={{ backgroundColor: '#4dc9ff' }} onPress={() => {
                                                handleCreate();
                                            }} />
                                        {req_status === 'Failed' ? <Text style={{ color: 'red', marginLeft: 20, fontSize: 16 }}>*Oops, Something went wrong.Please try again Later.</Text> : null}
                                    </View>
                            }
                        </ScrollView>
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
        width: 250,
        height: 250,
        alignSelf:'center',
        marginTop:50
    },
    container: {
        position: 'relative',
        elevation:2,
        borderTopEndRadius:20,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
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
        color: '#4dc9ff',
        paddingLeft:10
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