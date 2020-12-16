import React,{useContext} from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import {FontAwesome,MaterialCommunityIcons,MaterialIcons,Feather} from '@expo/vector-icons';
import {Context} from '../Context/dishContext';


const Cartlist = ({result}) => {
    const {addToCart,removeFromCart} = useContext(Context);
    let Price = result.quantity*result.dish.Price;
    return(
        <View style={{flexDirection:'row',margin:15,justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',width:190,flexWrap:'wrap'}}>
            {result.dish.veg === true ? <MaterialCommunityIcons name='checkbox-intermediate' color='green' size={15} /> :
                    <MaterialCommunityIcons name='checkbox-intermediate' color='darkred' size={15}  /> }
            <Text style={styles.Textstyle}>{result.dish.name}</Text>
            </View>
            <View style={styles.innercont}>
                <TouchableOpacity onPress={() => removeFromCart(result)}>
                    <Feather name='minus' color='#4DC9FF' size={20} /> 
                </TouchableOpacity>
                <Text style={{marginHorizontal:10}}>{result.quantity}</Text>
                <TouchableOpacity onPress={() => addToCart(result)}>
                    <MaterialIcons name='add' size={20} color='#4DC9FF' />
                </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',marginRight:2}}>
            <FontAwesome name='rupee' color='black' size={15} style={{alignSelf:'center'}} />
            <Text>{Price}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    innercont:{
        borderColor:'#A9A9A9',
        borderWidth:1,
        flexDirection:'row'
    },
    Textstyle:{
        marginLeft:5,
        fontWeight:'bold'
    }
});


export default Cartlist;