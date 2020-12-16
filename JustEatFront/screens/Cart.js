import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TextInput } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { Divider, CheckBox } from 'react-native-elements'
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native'
import { Context } from '../Context/dishContext';
import Cartlogo from '../logo/Cartlogo';
import Cartlist from '../components/cartlist';
import Border from '../thickborder';
import Billcompo from '../components/Bill';

import Server from '../server';

const CartScreen = () => {
    const { state } = useContext(Context);
    const navigation = useNavigation();
    const [term, setterm] = useState('');
    const [deliver, setdeliver] = useState(false);
    const [dinein, setdinein] = useState(false);
    const server = Server;
    const getTotal = state.reduce((sum,item) => {
        return sum + item.dish.Price*item.quantity;
    },0);

    


    const listheader = () => {
        return (
            <View style={styles.headercont}>
                <Image source={{ uri: `${server}/${state[0].restimg}` }} style={styles.imgstyle} />
                <Text style={styles.headerText}>{state[0].restname}</Text>
            </View>
        );
    }


    const listFooter = () => {
        return (
            <View >
                <Divider style={{ margin: 15 }} />
                <View style={styles.footsearchcompo}>
                    <Foundation name='clipboard-pencil' size={25} color='#A9A9A9' />
                    <TextInput style={styles.search} placeholder='Any requests? We will try our best' value={term}
                        onChangeText={() => setterm()} />
                </View>
                <Border height={15} />
                <View style={styles.checkcont}>
                    <CheckBox title='Opt for Delievery' checked={deliver}
                        containerStyle={styles.CheckBoxstyle} onPress={() => {
                            setdeliver(!deliver);
                            if (dinein) {
                                setdinein(!dinein)
                            }
                        }} textStyle={{ color: '#4Dc9FF' }} checkedColor='#4dc9ff' />
                    <CheckBox title='Opt for Dine-In' checked={dinein}
                        containerStyle={styles.CheckBoxstyle} onPress={() => {
                            setdinein(!dinein)
                            if (deliver) {
                                setdeliver(!deliver);
                            }
                        }} textStyle={{ color: '#4DC9ff' }} checkedColor='#4dc9ff' />
                </View>
                <Border height={15} />
                <Billcompo total={getTotal} />
            </View>
        );
    }

    return (
        state.length === 0 ?
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                <Cartlogo />
                <Text style={styles.text}>SAY YES TO TUMMY</Text>
                <Text style={styles.infoText}>Your cart is empty.</Text>
                <Text style={styles.infoText}>Add something from the Menu</Text>
                <Button title='Browse all restaurants'
                    buttonStyle={{ borderColor: '#4DC9FF', borderWidth: 1, borderRadius: 5 }}
                    titleStyle={{ color: '#4DC9FF' }}
                    containerStyle={{ marginTop: 20 }}
                    type="outline"
                    onPress={() => navigation.navigate('JUSTEAT')} />
            </View>
            :
            <View style={{ marginTop: 30, flex: 1 }}>
                <FlatList
                    data={state}
                    keyExtractor={result => result.dish.name}
                    renderItem={({ item }) => {
                        return <Cartlist result={item} />
                    }}
                    ListHeaderComponent={listheader}
                    ListFooterComponent={listFooter} />
            </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop:10
    },
    infoText: {
        color: '#A9A9A9'
    },
    imgstyle: {
        width: 60,
        height: 50
    },
    headercont: {
        flexDirection: 'row',
        flex: 1,
        margin: 15,
        marginBottom: 20,

    },
    headerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
    search: {
        flex: 1,
        marginLeft: 5
    },
    footsearchcompo: {
        marginLeft: 15,
        flexDirection: 'row',
        height: 30,
        marginBottom: 10
    },
    CheckBoxstyle: {
        borderColor: '#4DC9FF',
        borderWidth: 1,
        backgroundColor: '#D8F2FF',
        width: 160
    },
    checkcont: {
        flexDirection: 'row',
        marginVertical:15
    }
})

export default CartScreen;