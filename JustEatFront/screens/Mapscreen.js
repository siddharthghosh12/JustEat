import React, { useState, useContext } from 'react';
import { Platform } from 'react-native';
import {
    View, StyleSheet, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, TouchableOpacity, ActivityIndicator,
    ScrollView
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Button } from 'react-native-elements'
import { Context } from '../Context/userContext';
import userapi from '../api/dishapi';
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { AntDesign, EvilIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'

const Mapscreen = () => {

    const navigation = useNavigation();
    const { state, Save_address,Set_address } = useContext(Context)
    const [title, setTitle] = useState('');
    const [destination, setdestination] = useState('');
    const [req_status, set_req_status] = useState('')
    const [init_state, setinit_state] = useState({
        latitude: 27.151806,
        longitude: 78.390047,
    });

    const item = {
        title: title,
        address: destination,
        save_as_current: true
    }




    const handle_save_address = async () => {
        try {
            const response = await userapi.post('/users/save_address', {
                Phone: '91' + state.user.user.Phone,
                title: title,
                address: destination
            });
            if (response.status === 200) {
                Save_address(item);
                set_req_status('Success');
                navigation.goBack()
                return;
            }
            set_req_status('Failed');
        }
        catch (e) {
            console.log(e);
        }
    }

    return (
        req_status === 'Loading' ?
            <View style={styles.loading_container}>
                <ActivityIndicator size='large' color='#4dc9ff' />
            </View> :
            <View style={styles.container}>
                {
                    state?.user?.address.length === 0 ?
                        <KeyboardAvoidingView style={styles.container}
                            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        >
                            <Text style={styles.Text}>Long Press the marker to set your location</Text>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: 27.151806,
                                    longitude: 78.390047,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01
                                }}
                            >
                                <Marker
                                    draggable
                                    coordinate={init_state}
                                    onDragStart={(e) => setinit_state(e.nativeEvent.coordinate)}
                                    onDragEnd={(e) => setinit_state(e.nativeEvent.coordinate)}
                                />
                            </MapView>
                            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                <View>
                                    <Text style={styles.form_text}>Enter Title</Text>
                                    <TextInput value={title} onChangeText={(term) => setTitle(term)}
                                        placeholder=' Home,Office ...' style={styles.input}
                                    />
                                    <Text style={styles.form_text}>Enter Address</Text>
                                    <TextInput value={destination} onChangeText={(term) => setdestination(term)}
                                        placeholder=' 221B Baker Street' style={styles.input}
                                    />
                                    <Button
                                        title='Add Address'
                                        raised
                                        type='outline'
                                        titleStyle={{ color: '#4dc9ff' }}
                                        buttonStyle={{ borderColor: '#4dc9ff' }}
                                        containerStyle={{ borderColor: '#d2f8ff', width: 200, marginVertical: 20, alignSelf: 'center' }}
                                        onPress={() => {
                                            set_req_status('Loading')
                                            handle_save_address()
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </KeyboardAvoidingView> :
                        <SafeAreaView forceInset={{top:'always'}}>
                            <ScrollView showsVerticalScrollIndicator={false} >
                                <Text style={styles.Text}>Saved addresses</Text>
                                {
                                    state?.user?.address.map((item, index) => {
                                        return (
                                            <View key={index}>
                                                <TouchableOpacity style={{ marginTop: 15, flexDirection: 'row' }} onPress={() => {
                                                    Set_address(index);
                                                    navigation.goBack();
                                                }}>
                                                    {
                                                        item?.title?.toLowerCase() === 'home' ?
                                                            <AntDesign name='home' size={30} color='#a9a9a9' style={{
                                                                marginLeft: 10,
                                                                alignSelf: 'center'
                                                            }} /> :
                                                            <EvilIcons name='location' size={30} color='#a9a9a9' style={{
                                                                marginLeft: 10,
                                                                alignSelf: 'center'
                                                            }} />
                                                    }
                                                    <View>
                                                        <Text style={styles.form_text}>{item.title}</Text>
                                                        <Text style={[styles.form_text, { color: '#a9a9a9', fontSize: 14, marginHorizontal: 30 }]}>{item.address}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                {
                                                    index !== state?.user?.address.length - 1 ?
                                                        <Divider style={{ margin: 15 }} /> : null
                                                }
                                            </View>
                                        );
                                    })
                                }
                                <Divider style={{ margin: 15, backgroundColor: '#4dc9ff', height: 2 }} />
                                <Text style={[styles.Text, { marginVertical: 10 }]}>Set as new delivery location</Text>
                                <Text style={styles.form_text}>Enter Title</Text>
                                <TextInput value={title} onChangeText={(term) => setTitle(term)}
                                    placeholder=' Home,Office ...' style={styles.input}
                                />
                                <Text style={styles.form_text}>Enter Address</Text>
                                <TextInput value={destination} onChangeText={(term) => setdestination(term)}
                                    placeholder=' 221B Baker Street' style={styles.input}
                                />
                                <Button
                                    title='Save address'
                                    raised
                                    type='outline'
                                    titleStyle={{ color: '#4dc9ff' }}
                                    buttonStyle={{ borderColor: '#4dc9ff' }}
                                    containerStyle={{ borderColor: '#d2f8ff', width: 200, marginVertical: 20, alignSelf: 'center' }}
                                    onPress={() => {
                                        set_req_status('Loading')
                                        handle_save_address()
                                    }}
                                    disabled={state.user !== null ? false : true}
                                />
                            </ScrollView>
                        </SafeAreaView>
                }
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30
    },
    map: {
        height: 300
    },
    Text: {
        color: '#4dc9ff',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 18
    },
    input: {
        height: 35,
        borderRadius: 5,
        marginHorizontal: 10,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#4dc9ff',
        marginVertical: 5,
        color: '#4dc9ff'
    },
    form_text: {
        marginHorizontal: 20,
        marginVertical: 2,
        color: '#4dc9ff',
        fontWeight: '700',
        fontSize: 16
    },
    loading_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Mapscreen;