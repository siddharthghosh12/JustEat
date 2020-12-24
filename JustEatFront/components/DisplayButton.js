//import Stuff
import React, { useRef, useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Context } from '../Context/dishContext';
/*
Custom button for adding or removing dishes to/from the Cart
*/
const Custombutton = ({ dish, restid, restname, restimg }) => {
    /* 
    Use of context API for data management across components. 
        basically to show data in to the cart screen 
        */
    const { state, addToCart, removeFromCart } = useContext(Context);
    //Variable for animating the Add Text
    const onClickAdd = useRef(new Animated.Value(0)).current;



    // item to be send as Payload to the dishContext,js file
    const item = {
        restid,
        restname,
        restimg,
        dish,
        quantity: 1
    }

    const [count, setcount] = useState(0);
    const checkCount = () => {
        state.map((data) => {
            if (data.restid === item.restid && data.dish.name === item.dish.name) {
                if (data.quantity !== count) {
                    setcount(data.quantity);
                }
            }
        });
    }
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            checkCount();
            if (!state.find(item => item.dish.name === dish.name) && count)
                setcount(0);
        }

        return () => mounted = false;

    }, [state]);

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
                    addMovesDown();
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
                    setcount(count - 1);
                    removeFromCart(item);
                }} style={styles.iconStyle}>
                    <View>
                        <Feather name='minus' size={20} color="#4DC9FF" />
                    </View>
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
                    setcount(count + 1)
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