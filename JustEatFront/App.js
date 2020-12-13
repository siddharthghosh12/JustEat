import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchScreen from './screens/Search';
import CartScreen from './screens/Cart';
import AccountScreen from './screens/Account';
import JustEatScreen from './screens/JustEat';
import { Provider } from './Context/dishContext';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const MainTab = AnimatedTabBarNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFFFF'

function App() {


  return (
    <NavigationContainer
      theme={navTheme}>
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


          return focused ? <MaterialCommunityIcons name="food-apple" size={20} color="#4DC9FF" />
            : <MaterialCommunityIcons name="food-apple-outline" size={20} color="black" />
        }
      })} >
        <MainTab.Screen name="JUSTEAT" component={JustEatScreen} />
        <MainTab.Screen name="SEARCH" component={SearchScreen} />
        <MainTab.Screen name="CART" component={CartScreen} />
        <MainTab.Screen name="ACCOUNT" component={AccountScreen} />
      </MainTab.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
}