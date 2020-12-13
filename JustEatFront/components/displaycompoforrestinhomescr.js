import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
import Server from '../server';
import {FontAwesome,Entypo} from '@expo/vector-icons';

const Displaycompo = ({result}) => {
    const server = Server;
    //console.log(result.name);
    return(
            <View style={styles.container}>
                <Image style={styles.imgstyle} source={{uri:`${server}/${result.image}`}}/>
                <View style={styles.innercont}>
                    <Text style={styles.text}>{result.name}</Text>
                    <Text style={styles.innertext}>{result.trademark}</Text>
                    <View style={styles.nestcont}>
                        <Entypo  name='dot-single' size={20} color='black' />
                        <FontAwesome name='star' size={20} color="#FFDF00" />
                        <Text>{result.rating}</Text>
                        <Entypo name='dot-single' size={20} color='black' />
                        <FontAwesome  name='rupee' size={19} color='black' />
                        <Text>{result.CostFor2} for two</Text>
                    </View>
                </View>
            </View>
    );
}

const styles = StyleSheet.create({
    imgstyle:{
        width:100,
        height:100,
        borderRadius:10
    },
    container:{
        flexDirection:"row",
        margin:25
    },
    text:{
        fontWeight:'bold',
        flex:1,
        textAlign:'center',
        fontSize:16,
    },
    innertext:{
        flex:1,
        textAlign:'center',
        color:'#A9A9A9',
        marginBottom:25
    },
    innercont:{
        flex:1,
    },
    nestcont:{
        flexDirection:'row',
        flex:1,
        justifyContent:'center',
    }
});


export default Displaycompo;