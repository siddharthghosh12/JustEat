import React from 'react';
import {View,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import AccountScreen from './Account';
import Manage_Address from '../components/Manage_address';
import Favourites from '../components/fav_compo';
import Loginform from '../components/LoginForm';

const Account_stack = createStackNavigator();


const Main_Account_screen = () => {
    return(
        <Account_stack.Navigator
            screenOptions={{headerShown:false}} 
        >
            <Account_stack.Screen name='Account' component={AccountScreen} />
            <Account_stack.Screen name='Address' component={Manage_Address} />
            <Account_stack.Screen name='Favourites' component={Favourites} />
            <Account_stack.Screen name='Login'component={Loginform}
            />
        </Account_stack.Navigator>
    );
}

export default Main_Account_screen;
