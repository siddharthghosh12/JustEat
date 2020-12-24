import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Server from '../server';
import Custombutton from './DisplayButton';

const Display = ({ item, restname, restid, rest_img }) => {
  /*  console.log('dish',item);
    console.log('Restid',restid);
    console.log('Restname',restname);
    console.log('Rest_img',rest_img);
    */
    return (
        <View style={styles.container}>
        <Image source={{ uri: `${Server}/${item.image}` }} style={styles.imgstyle} />
            <Text style={styles.dishtitle}>{item.name}</Text>
            <View style={styles.btnstyle}>
                <Custombutton dish={item} restid={restid} restname={restname} restimg={rest_img} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    imgstyle: {
        height: 60,
        width: 60,
        borderRadius: 10,

    },
    container: {
        flexDirection: 'row',
        margin: 10,
    },
    dishtitle: {
        fontWeight: 'bold',
        marginLeft: 10,
        alignSelf: 'center'
    },
    btnstyle:{
        alignSelf:'center',
        marginLeft:'auto',
        marginRight:50
    }
});

export default Display;