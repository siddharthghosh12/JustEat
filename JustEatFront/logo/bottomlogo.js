import React from 'react';
import {Image,StyleSheet} from 'react-native';


const BottomImage = () => {


    return(
        <Image style={styles.img} source={require('../assets/icon.jpg')} />
    );
}

const styles = StyleSheet.create({
    img:{
        height: 424,
        width: 300,
        margin: 30
    }
})

export default BottomImage;