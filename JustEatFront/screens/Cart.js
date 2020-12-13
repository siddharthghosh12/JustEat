import React, { useContext } from 'react';
import { Text,View,StyleSheet,FlatList,Image } from 'react-native';
import {Button} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native'
import {Context} from '../Context/dishContext'; 
import Cartlogo from '../logo/Cartlogo';
import Cartlist from '../components/cartlist';

import Server from '../server';

const CartScreen = () => {
    const {state} = useContext(Context);
    const navigation = useNavigation();
    const server = Server;


    const listheader = () => {
        return(
            <View style={styles.headercont}>
                <Image source={{uri:`${server}/${state[0].restimg}`}} style={styles.imgstyle} />
                <Text style={styles.headerText}>{state[0].restname}</Text>   
            </View>
        );
    }
 

    return(
        state.length === 0 ?
        <View style={{alignItems:'center',justifyContent:'center',flex:1}}>
            <Cartlogo />
            <Text style={styles.text}>SAY YES TO TUMMY</Text>  
            <Text style={styles.infoText}>Your cart is empty.</Text>
            <Text style={styles.infoText}>Add something from the Menu</Text>
            <Button title='Browse all restaurants'
            buttonStyle={{borderColor:'#4DC9FF',borderWidth:1,borderRadius:5}} 
            titleStyle={{color:'#4DC9FF'}}
            containerStyle={{marginTop:20}}
             type="outline"
             onPress={() => navigation.navigate('JUSTEAT')} />
        </View>:
        <View style={{marginTop:30,flex:1}}>
            <FlatList 
             data={state}
             keyExtractor={result => result.dish.name}
             renderItem={({item}) => {
                 return <Cartlist result={item} />
             }} 
             ListHeaderComponent={listheader}/>
        </View>
    ); 
}

const styles = StyleSheet.create({
    text:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:10
    },
    infoText :{
        color:'#A9A9A9'
    },
    imgstyle:{
        width:60,
        height:50
    },
    headercont:{
        flexDirection:'row',
        flex:1,
        margin:15,
        marginBottom:20,
        
    },
    headerText:{
        fontSize:16,
        fontWeight:'bold',
        marginLeft:10,
        alignSelf:'center'
    }
})

export default CartScreen;