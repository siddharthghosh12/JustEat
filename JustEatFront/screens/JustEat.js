import React from 'react';
import { FontAwesome, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import SearchScreen from './Search';
import CartScreen from './Cart';
import AccountScreen from './Account';
import homeScreen from './homescreen';
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar';

const MainTab = AnimatedTabBarNavigator();
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


                return focused ? <MaterialCommunityIcons name="food-apple" size={20} color="#4DC9FF" />
                    : <MaterialCommunityIcons name="food-apple-outline" size={20} color="black" />
            }
        })} >
            <MainTab.Screen name="JUSTEAT" component={homeScreen}   />
            <MainTab.Screen name="SEARCH" component={SearchScreen} />
            <MainTab.Screen name="CART" component={CartScreen} />
            <MainTab.Screen name="ACCOUNT" component={AccountScreen} />
        </MainTab.Navigator>
    );
}

export default JustEatScreen;
/*
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { SearchBar } from 'react-native-elements';
import homeScreen from './homescreen';
import DetailsScreen from './detailsscreen';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import dishapi from '../api/dishapi';




const HomeStack = createStackNavigator();

const JustEatScreen = () => {
    const [touched, setouched] = useState(false);
    const [touch, settouch] = useState(false);
    const [term, setterm] = useState('');

    const Currentval = new Animated.Value(1);
    const Animateheart = Animated.createAnimatedComponent(FontAwesome);

    useEffect(() => {
        if (touched)
            TriggerAnimation()
    }, [touched])


    const TriggerAnimation = () => {
        Animated.spring(Currentval, {
            toValue: 1.5,
            friction: 2,
            useNativeDriver: true
        }).start(() => {
            Animated.spring(Currentval, {
                toValue: 1,
                useNativeDriver: true
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
                {touched ? <TouchableOpacity onPress={() => setouched(!touched)} style={{ marginHorizontal: 20 }}>
                    <Animateheart name='heart' size={25} color='red' style={{
                        transform: [
                            { scale: Currentval }
                        ]
                    }} />
                </TouchableOpacity> :
                    <TouchableOpacity onPress={() => { setouched(!touched) }} style={{ marginHorizontal: 20 }}>
                        <Animateheart name='heart-o' size={25} color='black' />
                    </TouchableOpacity>}
            </View>
        );
    }

    return (

        <HomeStack.Navigator >
            <HomeStack.Screen name='JustEat' component={homeScreen}
                options={{
                    headerTitle: props => <Title {...props} />,
                    headerRight: props => <Right {...props} />
                }} />
            <HomeStack.Screen name='Details' component={DetailsScreen}
                options={{ headerRight: props => <Detailsheader {...props} /> }} />
        </HomeStack.Navigator>

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
export default JustEatScreen;
*/