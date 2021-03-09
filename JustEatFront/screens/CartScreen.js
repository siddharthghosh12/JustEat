import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Cart from './Cart';
import PaymentScreen from './PaymentScreen';
import DeliveryScreen from './DeliveryScreen';

const CartScreen_stack = createStackNavigator();

const CartScreen = () => {
    return (
        <CartScreen_stack.Navigator
            screenOptions={{ headerShown: false }}
        >
            <CartScreen_stack.Screen name='Basket' component={Cart} />
            <CartScreen_stack.Screen name='Payments' component={PaymentScreen} />
            <CartScreen_stack.Screen name='Delivery' component={DeliveryScreen} />
        </CartScreen_stack.Navigator>
    )
}

export default CartScreen;