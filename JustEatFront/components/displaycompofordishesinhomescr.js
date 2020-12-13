import React from 'react';
import {Text,View,Image,StyleSheet,TouchableOpacity} from 'react-native';
import Server from '../server';



const Displaycompo = ({result}) => {
   // console.log(result.name);
    const server=Server;
    return(
        <View style={{flex:1}}> 
           <TouchableOpacity onPress={() => {console.log('Press')}}>
                <View>
                    <Image style={Styles.img} source={{uri:`${server}/${result.image}`}} />
                    <Text style={Styles.text}>{result.name}</Text>
                </View>
           </TouchableOpacity>
       </View>
    );
}

const Styles = StyleSheet.create({
    img:{
        width:150,
        height:120,
        margin:10,
        borderRadius:10
    },
    text:{
        textAlign:'center',
        fontWeight:'bold'
    }
});

export default Displaycompo;