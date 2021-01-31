import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { Context } from '../Context/userContext';
import api from '../api/dishapi';
import Loading_compo from './Loadingcompo';

const EditAddress = ({ item, closeModal }) => {

    const [title, setTitle] = useState(item.title);
    const [address, setAddress] = useState(item.address);
    const [req_status, setReq_status] = useState('');
    const { state, Edit_Address } = useContext(Context)

    const item_to_send = {
        _id: item._id,
        title,
        address,
        Phone: state.user.user.Phone
    }

    const Handle_Save = async () => {
        setReq_status('loading');
        let response = await api.put('/users/edit_address', {
            _id: item._id,
            title,
            address,
            Phone: state.user.user.Phone
        })
        if (response.status === 200) {
            setReq_status('success');
            Edit_Address(item_to_send);
            closeModal();
            return;
        }
        setReq_status('failed');
    }
    return (
        req_status === 'loading' ?
            <Loading_compo />
            :
            <View>
                <Text style={styles.form_text}>Enter Title</Text>
                <TextInput value={title} onChangeText={(term) => setTitle(term)}
                    placeholder='Home,Office ...' style={styles.input}
                />
                <Text style={styles.form_text}>Enter Address</Text>
                <TextInput value={address} onChangeText={(term) => setAddress(term)}
                    placeholder='221B Baker Street...' style={styles.input}
                />
                <Button title='Save'
                    buttonStyle={{ backgroundColor: '#ecfaff', width: 200, alignSelf: 'center', marginVertical: 10 }}
                    titleStyle={{ color: '#4dc9ff' }}
                    onPress={() => Handle_Save()}
                />
                <Button title='Cancel'
                    onPress={() => closeModal()}
                    buttonStyle={{ width: 200, alignSelf: 'center', backgroundColor: '#4dc9ff', marginVertical: 10 }}
                    titleStyle={{ color: '#d2f8ff' }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 35,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#4dc9ff',
        marginVertical: 5,
        color: '#4dc9ff',
        paddingLeft: 10
    },
    form_text: {
        marginHorizontal: 20,
        marginVertical: 2,
        color: '#4dc9ff',
        fontWeight: '700',
        fontSize: 16
    },
})

export default EditAddress;