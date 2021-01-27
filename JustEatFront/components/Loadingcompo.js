import React from 'react';
import {View,StyleSheet,Image} from 'react-native';


//  Shows Loading animation whenever some network requests are involved using gif
const Loading_compo = () => {
    return(
        <View style={styles.container}>
            <Image source={require('../assets/animation.gif')} style={styles.img_style} />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        display:'flex',
        justifyContent:'center',
        alignItems:"center",
        flex:1
    },
    img_style:{
        width:100,
        height:100
    }
});

export default Loading_compo;