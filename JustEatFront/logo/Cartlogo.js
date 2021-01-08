import React from 'react';
import {View,Image,StyleSheet} from 'react-native';


const Cartlogo = () => {

    return(
        <View>
            <Image source={require('../assets/Cart.png')} style={styles.img} />
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