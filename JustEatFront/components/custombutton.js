//import Stuff
import React, {  useRef, useContext } from 'react';
import { View,  TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import {Context} from '../Context/dishContext';
/*
Custom button for adding or removing dishes to/from the Cart
*/ 
const Custombutton = ({ count, incCount, decCount,dish,restid,restname,restimg }) => {
/* 
Use of context API for data management across components. 
    basically to show data in to the cart screen 
    */
    const {state,addToCart,removeFromCart} = useContext(Context);
    //Variable for animating the Add Text
    const onClickAdd = useRef(new Animated.Value(0)).current;

    // Variable for animating the Plus(+) icon from left to right
    const PlusIcon = useRef(new Animated.Value(-60)).current;

    // Variable for animating the Minus(-) icon from right to left
    const MinusIcon = useRef(new Animated.Value(60)).current;

    // item to be send as Payload to the dishContext,js file
    const item = { 
        restid,
        restname,
        restimg,
        dish,
        quantity: 1
    }

    // Animation function for moving the add button down
    const addMovesDown = () => {
        Animated.timing(onClickAdd, {
            toValue: 10,
            duration: 500,
            useNativeDriver: true
        }).start(() => {
            Animated.timing(onClickAdd, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            }).start()
        });
    }

    //Animation function for moving the Plus(+) icon
    const plusMovesRight = () => {
        Animated.timing(PlusIcon, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
        }).start();
    }

     //Animation function for moving the Minus(-) icon
    const minusMovesLeft = () => {
        Animated.timing(MinusIcon, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true
        }).start()
    }

 
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
                    
                    addToCart(item);
                    addMovesDown();
                    plusMovesRight();
                    minusMovesLeft();
                    setTimeout(() => {
                        incCount();
                    }, 300); 
                    

                }}>
                    <Animated.Text style={[{
                        color: '#4DC9FF',
                        transform: [
                            {
                                translateY: onClickAdd
                            }
                        ]
                    }]}>Add</Animated.Text>
                </TouchableOpacity>
            </View> :
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    decCount();
                    removeFromCart(item);
                }} style={styles.iconStyle}>
                    <Animated.View style={[
                        {
                            transform: [
                                {
                                    translateX: MinusIcon
                                }
                            ]
                        }
                    ]}>
                        <Feather name='minus' size={20} color="#4DC9FF" />
                    </Animated.View>
                </TouchableOpacity>
                <Animated.Text style={[styles.counterStyle,
                {
                    transform: [
                        {
                            translateY: onClickAdd
                        }
                    ]
                }]}>{count}</Animated.Text>
                <TouchableOpacity onPress={() => {
                    incCount();
    
                    addToCart(item)
                }} style={styles.iconStyle}>
                    <Animated.View style={[
                        {
                            transform: [
                                {
                                    translateX: PlusIcon
                                }
                            ]
                        }
                    ]}>
                        <MaterialIcons name='add' size={20} color='#4DC9FF' />
                    </Animated.View>
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