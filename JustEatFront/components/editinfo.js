import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements'
import Loading_compo from './Loadingcompo';
import api from '../api/dishapi';
import { useNavigation } from '@react-navigation/native'

const EditInfoCompo = ({ phone, email, closeSheet }) => {

    const [mobile, setmobile] = useState(phone.substr(2, 10));
    const [validmob, setvalidmob] = useState(true);
    const [req_status, setReq_status] = useState('');
    const navigation = useNavigation();



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

    const Handle_save = async () => {
        if (!validmob || mobile === '')
            return;
        if (mobile === phone.substr(2, 10)) {
            setReq_status('Samenumber');
            return;
        }
        setReq_status('loading');
        let requestOtp = await api.post('/users/login', {
            Phone: '+91' + mobile,
            email: email
        });
        if (requestOtp.status === 200) {
            closeSheet();
            navigation.navigate('Login', {
                show_otp: true,
                Phone: '+91' + mobile,
                email: email
            });

        }

    }

    return (
        req_status === 'loading' ?
            <Loading_compo /> :
            <View>
                <Text style={styles.formtext}>Mobile No.</Text>
                <TextInput placeholder='+91-1234567898' style={styles.input} value={mobile} placeholderTextColor='#a9a9a9'
                    onChangeText={(term) => setmobile(term)} onEndEditing={() => checkMobile()} />
                {!validmob && mobile.length !== 0 ? <Text style={{ color: 'red', marginLeft: 20, marginVertical: 10 }}>*Invalid number</Text> : null}
                {req_status === 'Samenumber' ? <Text style={{ marginLeft: 20, marginVertical: 10, color: "#a9a9a9", fontSize: 12 }}>The new number was similar to the previous one.</Text> : null}
                <View style={styles.container}>
                    <Text style={styles.formtext}>Email</Text>
                    <Text style={{ color: '#a9a9a9', marginLeft: 5, fontSize: 16 }}>*(Email cannot be edited)</Text>
                </View>
                <TextInput placeholder='example@itbhu.ac.in' style={styles.input} placeholderTextColor='#a9a9a9'
                    value={email} editable={false}
                />
                <Button title='Save'
                    type='solid'
                    onPress={() => Handle_save()}
                    buttonStyle={{ backgroundColor: "#ecfaff", marginVertical: 10 }}
                    titleStyle={{ color: '#4dc9ff' }}
                />
            </View>
    )
}

const styles = StyleSheet.create({
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
        paddingLeft: 10
    },
    container: {
        flexDirection: 'row',
    }
});

export default EditInfoCompo;