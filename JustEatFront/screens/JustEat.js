import React from 'react';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchScreen from './Search';
import CartScreen from './Cart';
import homeScreen from './homescreen';
import Main_Account_screen from './Account_screen';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const MainTab = AnimatedTabBarNavigator();



const JustEatScreen = () => {
    return (
        <MainTab.Navigator tabBarOptions={{
            activeTintColor: '#4DC9FF',
            activeBackgroundColor: 'black'
        }} screenOptions={({ route }) => ({
            tabBarIcon: ({ focused }) => {


                if (route.name === "SEARCH") {
                    return focused ? <FontAwesome name="search" size={20} color="#4DC9FF" />
                        : <Feather name="search" size={20} color="black" />
                }
                else if (route.name === "CART") {
                    return focused ? <FontAwesome name="shopping-cart" size={20} color="#4DC9FF" />
                        : <Feather name="shopping-cart" size={20} color="black" />
                }
                else if (route.name === "ACCOUNT") {
                    return focused ? <FontAwesome name="user" size={20} color="#4DC9FF" />
                        : <Feather name="user" size={20} color="black" />
                }


                return focused ? <MaterialCommunityIcons name="alpha-j-circle" size={25} color="#4DC9FF" />
                    : <MaterialCommunityIcons name='alpha-j-circle-outline' size={25} color="black" />
            }
        })} >
            <MainTab.Screen name="JUSTEAT" component={homeScreen}   />
            <MainTab.Screen name="SEARCH" component={SearchScreen} />
            <MainTab.Screen name="CART" component={CartScreen} />
            <MainTab.Screen name="ACCOUNT" component={Main_Account_screen} />
        </MainTab.Navigator>
    );
}

export default JustEatScreen;
