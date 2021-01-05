import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements'
import CodeInput from 'react-native-confirmation-code-input';
import CountDown from 'react-native-countdown-component';
import userapi from '../api/dishapi';
import { Context } from '../Context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OtpVerifyScreen = ({ phone, switch_off_modal }) => {

    const stop_time = 30;
    const [disable, setdisable] = useState(true);
    const [counter, setcounter] = useState(30);
    const [req_status, setreq_status] = useState('');
    const [random, setrandom] = useState(Math.random());
    const [loading, setloading] = useState(false);
    const { Login } = useContext(Context);


    const handle_resend = async () => {
        setrandom(Math.random());
        setcounter(stop_time);
        setdisable(true);

        await userapi.post('/users/login', {
            Phone: '+91' + phone
        });
    }

    const handleVerify = async (code) => {
        setloading(true);
        try {
            //console.log(code);
            const otp_res = await userapi.post('/users/verifyotp', {
                Phone: '+91' + phone,
                otp: code
            });

            if (otp_res.status === 200) {
                setreq_status('Success');
                let token_obj = {
                    token:otp_res.data.token
                }
                await AsyncStorage.mergeItem('user', JSON.stringify(token_obj));

                let user_state = await AsyncStorage.getItem('user');
                const user = JSON.parse(user_state);
                console.log(token_obj);
                console.log(user);
                switch_off_modal();
                Login(user);
                return ;
            }
            setreq_status('Failed')
        }
        catch (err) {
            console.log(err)
        }

    }
    return (
        loading === true ? 
        <View style={styles.container}>
            <ActivityIndicator size='large' color='#4dc9ff' />
        </View> :
            <View style={styles.container} >
                <View style={{ marginVertical: 100 }}>
                    <Text style={styles.form_text} >Enter Otp sent to +91{phone}</Text>
                    <CodeInput
                        secureTextEntry
                        activeColor='#4dc9ff'
                        inactiveColor='#d2f8ff'
                        inputPosition='left'
                        codeLength={6}
                        autoFocus
                        onFulfill={(code) => handleVerify(code)}
                    />
                </View>
                <View>
                    <Button
                        title='resend'
                        type='clear'
                        titleStyle={disable ? styles.disabled_style : styles.titleStyle}
                        disabled={disable}
                        containerStyle={{ width: 100, height: 50, margin: 10 }}
                        onPress={() => handle_resend()}
                    />
                    <CountDown
                        key={random}
                        size={15}
                        until={counter}
                        digitStyle={{ backgroundColor: '#d2f8ff' }}
                        digitTxtStyle={{ color: '#4dc9ff' }}
                        separatorStyle={{ color: '#d2f8ff' }}
                        timeToShow={['M', 'S']}
                        timeLabels={{ m: null, s: null }}
                        showSeparator
                        onFinish={() => {
                            setdisable(false)
                        }}
                    />
                </View>
                {req_status === 'Failed' ? <Text style={{ color: 'red', marginLeft: 10 }}> Invalid code </Text> : null}
            </View>
    );
}

const styles = StyleSheet.create({
    form_text: {
        color: '#4dc9ff',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 100
    },
    titleStyle: {
        color: '#4dc9ff'
    },
    disabled_style: {
        color: '#a9a9a9'
    }
});

export default OtpVerifyScreen;