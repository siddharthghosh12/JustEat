import React, {  useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import Server from '../server';
import { useNavigation } from '@react-navigation/native'
import Custombutton from './custombutton'; 


const Rendermenu = ({ res,restid,restname,restimg }) => {
    const navigation = useNavigation();
    const server = Server;
    const feature = res.bestSeller || res.mustTry;

   







    return (
        <View>
            <View style={styles.container}>
                <View>
                    <View style={{ flexDirection: 'row' }}>
                        {res.veg ? <MaterialCommunityIcons name='checkbox-intermediate' size={15} color='green' /> :
                            <MaterialCommunityIcons name='checkbox-intermediate' size={15} color='darkred' />}
                        {feature ? <FontAwesome style={{ marginLeft: 9, alignSelf: 'center' }} name='star' size={15} color='orange' /> : <View></View>}
                        {(res.bestSeller && feature) ? <Text style={styles.featureStyle}>Bestseller</Text> : <View></View>}
                        {(res.mustTry && !res.bestSeller) ? <Text style={styles.featureStyle}>MustTry</Text> : <View></View>}
                    </View>
                    <Text style={styles.textstyle}>{res.name}</Text>
                    <View style={styles.innercont}>
                        <FontAwesome style={{ alignSelf: 'center' }} name='rupee' color='black' size={15} />
                        <Text style={{ marginLeft: 3, marginBottom: 2 }}>{res.Price}</Text>
                    </View>
                </View>
                <View>
                    <ImageBackground style={styles.imgstyle}
                        source={{ uri: `${server}/${res.image}` }} >
                        <Custombutton  dish={res} restid={restid} restname={restname} restimg={restimg} />
                    </ImageBackground>
                </View>
            </View>
            <Divider style={{ margin: 25 }} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 30
    },
    imgstyle: {
        width: 120,
        height: 100,
        marginRight: 5,
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    textstyle: {
        fontWeight: '700',
        fontSize: 15,
        textAlignVertical: 'center',
    },
    innercont: {
        flexDirection: 'row',
    },
    btnstyle: {
        height: 25,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    featureStyle: {
        color: 'orange'
    }
});

export default Rendermenu;