import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity,Animated } from 'react-native';
import { Context } from '../Context/dishContext';
import { FontAwesome, Feather, Entypo } from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

/*
    Shows a BottomSheet as soon as something goes in to cart,
    so that user can directly navigate from there to cart screen
*/
const BottomSheet = () => {

    // Helps in providing a navigation function so that user can navigate
    const navigation = useNavigation();

    // The global state which helps in state management across different components
    const { state } = useContext(Context);
    const Screenwidth = Dimensions.get('screen').width;

    // Function to get the total price of items in the Cart
    const getTotalPrice = state.reduce((sum, item) => {
        return sum + item.quantity * item.dish.Price;
    }, 0);

    // Function to get the total number of items in the cart
    const getTotalItems = state.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0)

    // Conditionally renders sheet whenever the cart has some items
    return (
        state.length > 0 ?
            <Animated.View style={[styles.BottomSheet, { width: Screenwidth },
            ]}>
                <View style={{ flexDirection: 'row' }}>
                    {getTotalItems === 1 ? <Text style={styles.Text}>{getTotalItems} item</Text> :
                        <Text style={styles.Text}>{getTotalItems} items</Text>}
                    <Entypo name='flow-line' size={35} color='white' style={{ alignSelf: 'center' }} />
                    <FontAwesome name='rupee' size={20} color='white' style={{ alignSelf: 'center' }} />
                    <Text style={styles.Text}>{getTotalPrice}</Text>
                </View>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => navigation.navigate('JustEat',{
                    screen:'CART'
                })}>
                    <Text style={styles.Text}>Go to Cart</Text>
                    <Feather name='shopping-bag' size={25} color='white' style={{alignSelf:'center'}} />
                </TouchableOpacity>
            </Animated.View> : null
    );
}
const styles = StyleSheet.create({
    BottomSheet: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#19f7f7',
        elevation: 8,
        height: 50,
        flexDirection: 'row',
        justifyContent:'space-around'
    },
    Text: {
        alignSelf:'center',        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal:5,
        paddingHorizontal:5
    }
});

export default BottomSheet;
