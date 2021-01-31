import React, { useContext, useState } from 'react'
import { Text, View, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../Context/userContext';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import Border from '../thickborder';
import EditAddress from './editAddresscompo';
import Loading_compo from './Loadingcompo';
import api from '../api/dishapi';


const Manage_Address = ({ navigation }) => {

    const { state, Delete_Address } = useContext(Context);
    const [modalVisible, setModalVisible] = useState(false);
    const [item, setItem] = useState('');
    const [req_status, setReq_status] = useState('')

    const Handle_delete = async ( id ) => {
        setReq_status('loading');
        let response = await api.delete('/users/delete_address', {
           data : {
            Phone: "+" + state.user.user.Phone,
            _id: id
           }
        });
        if (response.status === 200) {
            Delete_Address(id);
            setReq_status('success');
            return;
        }
        setReq_status('failed')
    }

    const Address_template = ({ info }) => {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    {
                        info.title.toLowerCase() === 'home' ? <AntDesign name='home' size={25} style={{ alignSelf: 'center' }} />
                            :
                            <EvilIcons name='location' size={30} style={{ alignSelf: 'center' }} />
                    }
                    <View>
                        <Text style={styles.title}>{info.title}</Text>
                        <Text style={styles.address}>{info.address}</Text>
                    </View>
                </View>
                <View style={[styles.container, { marginLeft: 60 }]}>
                    <Button title='edit' type='clear' titleStyle={{ color: '#4dc9ff' }} onPress={() => {
                        setItem(info);
                        setModalVisible(!modalVisible)
                    }} />
                    <Button title='delete' type='clear' titleStyle={{ color: 'red' }} onPress={() => Handle_delete(info._id)} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        state.user.address.length === 0 ?
            <SafeAreaView>
                <Text>I am your Manage address Screen</Text>
            </SafeAreaView> :
            <SafeAreaView style={{ flex: 1 }}>
                {
                    req_status === 'loading' ? <Loading_compo />
                        :
                        <View>
                            <TouchableOpacity onPress={() => navigation.goBack()} style={{ margin: 15 }}>
                                <AntDesign name='arrowleft' size={20} color="#404040" />
                            </TouchableOpacity>
                            <Border height={15} />
                            <FlatList
                                data={state.user.address}
                                keyExtractor={(item) => item._id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <Address_template info={item} />
                                    );
                                }}
                            />
                            <View style={styles.modalView}>
                                <Modal
                                    animationType='slide'
                                    visible={modalVisible}
                                    transparent
                                >
                                    <View style={styles.modal_container}>
                                        <EditAddress item={item} closeModal={() => setModalVisible(false)} />
                                    </View>
                                </Modal>
                            </View>
                        </View>
                }
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20
    },
    title: {
        marginLeft: 10,
        fontSize: 18,
        color: '#4dc9ff',
        marginVertical: 5
    },
    address: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 15
    },
    modal_container: {
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        minHeight: 300,
        justifyContent: 'center',
        marginVertical: 20
    },
    modalView: {
        justifyContent: 'center',
        flex: 1
    },
})

export default Manage_Address;