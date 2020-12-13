import React from 'react';
import {View,Image,StyleSheet} from 'react-native';
import Server from '../server';


const Cartlogo = () => {
    const server = Server;
    const img_name = 'Cart.png'

    return(
        <View>
            <Image source={{uri:`${server}/images/${img_name}`}} style={styles.img} />
        </View>
    );
} 

const styles = StyleSheet.create({
    img:{
        height:200,
        width:200
    }
});

export default Cartlogo;