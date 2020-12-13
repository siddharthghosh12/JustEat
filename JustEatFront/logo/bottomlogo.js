import React from 'react';
import {Image,StyleSheet} from 'react-native';
import Server from '../server';


const BottomImage = () => {
    const server = Server;
    const img_name = 'icon.jpg';

    return(
        <Image style={styles.img} source={{uri:`${server}/images/${img_name}`}} />
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