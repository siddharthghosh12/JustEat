import React from 'react';
import {StyleSheet,Image} from 'react-native';


//  Shows Loading animation whenever some network requests are involved using gif
const Loading_compo = () => {
    return(
      
            <Image source={require('../assets/animation.gif')} style={styles.img_style} />
      
    );
}

const styles = StyleSheet.create({
    img_style:{
        width:100,
        height:100
    }
});

export default Loading_compo;