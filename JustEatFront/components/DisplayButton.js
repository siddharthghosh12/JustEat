//import Stuff
import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated,Text } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Context } from '../Context/dishContext';

// TODO: Allow orders only from a single canteen
//Custom button for adding or removing dishes to/from the Cart
const Custombutton = ({ dish, restid, restname, restimg }) => {
    
    // functions to change the global state by adding or removing dishes
    const { state, addToCart, removeFromCart } = useContext(Context);



    // item to be send as Payload to the dishContext,js file
    const item = {
        restid,
        restname,
        restimg,
        dish,
        quantity: 1
    }

    // Keeps the count of number of dishes
    const [count, setcount] = useState(0);


    // function which watches any change in the global state to sync up changes to display
    const checkCount = () => {
        state.map((data) => {
            if (data.restid === item.restid && data.dish.name === item.dish.name) {
                if (data.quantity !== count) {
                    setcount(data.quantity)
                }
            }
        });
    }


    // Runs the above function each time when the screen is mounted and as the global state changes 
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            checkCount();
            if (!state.find(item => item.dish.name === dish.name) && count)
                setcount(0)
        }

        return () => mounted = false;

    }, [state]);



    /* 
    Displays ADD when Count variable is zero, and for count > 0 
    it displays - {count} + button
     */
    return (
        count === 0 ?
            <View style={[styles.addcontainer, {
                alignSelf: 'center'
            }
            ]}>
                <TouchableOpacity onPress={() => {
                    setcount(count+1)
                    addToCart(item);
                }}>
                    <Animated.Text style={[{
                        color: '#4DC9FF'}]}>Add</Animated.Text>
                </TouchableOpacity>
            </View> :
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    setcount(count-1)
                    removeFromCart(item);
                }} style={styles.iconStyle}>
                    <View>
                        <Feather name='minus' size={20} color="#4DC9FF" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.counterStyle}>{count}</Text>
                <TouchableOpacity onPress={() => {
                    setcount(count+1)
                    addToCart(item)
                }} style={styles.iconStyle}>
                    <View>
                        <MaterialIcons name='add' size={20} color='#4DC9FF' />
                    </View>
                </TouchableOpacity>
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 25,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 8,
        alignSelf: 'center',
        position: 'absolute',
        bottom: -10

    },
    addcontainer: {
        height: 25,
        width: 100,
        backgroundColor: 'white',
        borderRadius: 5,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'center', position: 'absolute',
        bottom: -10
    },
    iconStyle: {
        justifyContent: 'center'
    },
    counterStyle: {
        alignSelf: 'center',
        color: '#4DC9FF',
        fontWeight: 'bold'
    }
});

export default Custombutton; 