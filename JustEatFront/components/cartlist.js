import React from 'react';
import { View,Text,TouchableOpacity,StyleSheet } from 'react-native';
import {FontAwesome,MaterialCommunityIcons,MaterialIcons,Feather} from '@expo/vector-icons'


const Cartlist = ({result}) => {

    let Price = result.quantity*result.dish.Price;
    return(
        <View style={{flexDirection:'row'}}>
            {result.dish.veg === true ? <MaterialCommunityIcons name='checkbox-intermediate' color='green' size={15} /> :
                    <MaterialCommunityIcons name='checkbox-intermediate' color='red' size={15} /> }
            <Text>{result.dish.name}</Text>
            <View style={styles.innercont}>
                <TouchableOpacity>
                    <Feather name='minus' color='#4DC9FF' size={20} /> 
                </TouchableOpacity>
                <Text>{result.quantity}</Text>
                <TouchableOpacity>
                    <MaterialIcons name='add' size={20} color='#4DC9FF' />
                </TouchableOpacity>
            </View>
            <FontAwesome name='rupee' color='black' size={15} />
            <Text>{Price}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    innercont:{
        borderColor:'#A9A9A9',
        borderWidth:2,
        flexDirection:'row'
    }
});


export default Cartlist;