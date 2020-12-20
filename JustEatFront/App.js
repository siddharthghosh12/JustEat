import React, { useState,useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity,Animated } from 'react-native';
import { NavigationContainer, DefaultTheme,getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SearchBar } from 'react-native-elements';
import JustEatScreen from './screens/JustEat';
import DetailsScreen from './screens/detailsscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Provider } from './Context/dishContext';




const HomeStack = createStackNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFFFF'

function App  ()  {
    const [touched, setouched] = useState(false);
    const [touch, settouch] = useState(false);
    const [term, setterm] = useState('');

    const Currentval = new Animated.Value(1);
    const Animateheart = Animated.createAnimatedComponent(FontAwesome);

    useEffect(() => {
        if(touched)
            TriggerAnimation()
    },[touched]);

    const getHeader = (route) => {
      const routename = getFocusedRouteNameFromRoute(route) ?? 'JUSTEAT';

      if(routename === 'JUSTEAT')
        return 'JUSTEAT'
      else
        return 'DONT'
    }


    const TriggerAnimation = () => {
        Animated.spring(Currentval,{
            toValue:1.5,
            friction:2,
            useNativeDriver:true
        }).start(() => {
            Animated.spring(Currentval,{
                toValue:1,
                useNativeDriver:true
            }).start();
        })
    }
    const Search = () => {
        return (
            <View style={{ borderColor: 'black', borderWidth: 3 }}>
                <SearchBar placeholder="Type here.." />
            </View>
        );
    }
    const Title = () => {
        return (
            <View style={styles.container}>
                <FontAwesome name="map-marker" size={30} color="#4DC9FF" />
                <Text style={styles.TextStyle}>Your Address</Text>
            </View>

        );
    }

    const Right = () => {
        return (
            <View>
                <TouchableOpacity style={styles.container} onPress={() => console.log("Pressed")}>
                    <MaterialCommunityIcons name="brightness-percent" size={24} color="#4DC9FF" style={{ marginRight: 5 }} />
                    <Text style={styles.TextRight}>Offers!</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const Detailsheader = () => {
        return (
            <View style={styles.searchcontainer}>
                <TouchableOpacity onPress={() => {
                    settouch(!touch);
                }}>
                    <Feather name='search' size={25} color='black' />
                </TouchableOpacity>
                {touched ? <TouchableOpacity onPress={() => setouched(!touched)} style={{marginHorizontal:20}}>
                    <Animateheart name='heart' size={25} color='red' style={{
                        transform:[
                            {scale:Currentval} 
                        ]
                    }}/>
                </TouchableOpacity> :
                    <TouchableOpacity onPress={() => {setouched(!touched)}} style={{marginHorizontal:20}}>
                        <Animateheart name='heart-o' size={25} color='black' />
                    </TouchableOpacity>}
            </View>
        );
       
    }

    return (
      <NavigationContainer
        theme={navTheme}  >
        <HomeStack.Navigator 
           >
            <HomeStack.Screen name='JustEat' component={JustEatScreen}
              options={({route}) => ({
                headerShown : getHeader(route) === 'JUSTEAT' ? true:false,
                headerTitle: props => <Title {...props} />,
                headerRight: props => <Right {...props} />
              })
              }
                />
            <HomeStack.Screen name='Details' component={DetailsScreen}
                options={{ headerRight: props => <Detailsheader {...props} /> }} />
        </HomeStack.Navigator>
      </NavigationContainer>

    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    },
    TextStyle: {
        fontSize: 15,
        marginLeft: 10,
        justifyContent: "flex-end"
    },
    TextRight: {
        marginRight: 10,
        fontSize: 15,
        justifyContent: "center"

    },
    searchcontainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputstyle: {
        flex: 1,
        marginTop: 40,
        backgroundColor: '#F0EEEE'
    }
});
/*
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
}*/

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
}