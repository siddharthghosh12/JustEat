import React,{useContext} from 'react';
import {View,Text,TouchableHighlight,StyleSheet } from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AntDesign,Fontisto} from '@expo/vector-icons';
import {useRoute} from '@react-navigation/native';
import {Context as DishContext} from '../Context/dishContext'

const PaymentScreen = ({navigation}) => {

    const route = useRoute();
    const { state : cartState } = useContext(DishContext)
    let {title,address,toPay,totalItems} = route.params;

    return(
        <SafeAreaView>
            <TouchableHighlight style={{margin:10}} onPress={() => navigation.goBack()}  >
                <AntDesign name='arrowleft' size={15} />
            </TouchableHighlight>
            <View style={{flexDirection:'row'}}>
                <Fontisto name='hotel' size={20} />
                <View>
                    <Text>{cartState[0].restname}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default PaymentScreen;

const styles = StyleSheet.create({})