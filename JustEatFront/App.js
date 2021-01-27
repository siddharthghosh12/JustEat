import React, { useState, useEffect, useContext, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer, DefaultTheme, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import JustEatScreen from './screens/JustEat';
import DetailsScreen from './screens/detailsscreen';
import Mapscreen from './screens/Mapscreen';
import Launch_carousel from './FirstLaunch';
import * as RootNavigtion from './RootNavigator';
import { createStackNavigator } from '@react-navigation/stack';
import { FontAwesome, MaterialCommunityIcons,EvilIcons } from '@expo/vector-icons';
import { Provider } from './Context/dishContext';
import { Provider as UserProvider, Context } from './Context/userContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



const HomeStack = createStackNavigator();

const navTheme = DefaultTheme;
navTheme.colors.background = '#FFFFFF';

function App() {

  const [first_launch, setFirst_launch] = useState(false);
  const { Login, state } = useContext(Context);
  let move_to_maps = useRef(false);



  const Check_token = () => {
    //AsyncStorage.removeItem('user');
    AsyncStorage.getItem('user')
      .then((user) => {
        if (user !== null) {
          let user_state = JSON.parse(user);
          if (user_state.token !== null) {
            console.log('USER FROM ASYNC',user_state)
            Login(user_state);
          }
        }
      })
      .catch(err => console.log(err))
  }

  const check_first_Launch = () => {
    // AsyncStorage.removeItem('first');
    AsyncStorage.getItem('first')
      .then((val) => {
        if (val === null) {
          AsyncStorage.setItem('first', JSON.stringify({ first_launch: true }));
          move_to_maps.current = true;
          setFirst_launch(true);
        }
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    if (!first_launch) {
      if (move_to_maps.current)
        RootNavigtion.navigate('Maps');
    }
  }, [first_launch])

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      Check_token();
      check_first_Launch();
    }
    return () => mounted = false;
  }, []);



  const getHeader = (route) => {
    const routename = getFocusedRouteNameFromRoute(route) ?? 'JUSTEAT';

    if (routename === 'JUSTEAT')
      return 'JUSTEAT'
    else
      return 'DONT'
  }


  const Title = () => {
    return (
      <TouchableOpacity style={styles.container} onPress={() => RootNavigtion.navigate('Maps')}>
       {
         state.user !== null ?
         <View style={{flexDirection:'row'}}>
           <FontAwesome name="home" size={30} color="#4DC9FF" style={{alignSelf:'center'}}/>
         {
            state?.user?.address.map((item, index) => {
             return (
               <View key={index}>
                 {
                   item.save_as_current === true ?
                     <View>
                       <Text style={styles.address_text}>{item.title}</Text>
                       <Text style={{color:'#a9a9a9',marginLeft:10}}>{item.address}</Text>
                     </View>
                     : null
                 }
               </View>
             );
           })
         }
         </View>:
         <View style={{flexDirection:'row'}}>
           <EvilIcons name='location' size={30} color='#4dc9ff' style={{alignSelf:'center'}} />
           <Text style={styles.address_text}>Save Location</Text>
         </View>
       }
      </TouchableOpacity>

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


  return (
    first_launch === true ?

      <Launch_carousel state={first_launch} close_state={() => setFirst_launch(false)}
        navigate_to_maps={() => RootNavigtion.navigate('Maps')}
      />
      :
      <NavigationContainer
        theme={navTheme} ref={RootNavigtion.Navigation_ref}  >
        <HomeStack.Navigator
        >
          <HomeStack.Screen name='JustEat' component={JustEatScreen}
            options={({ route }) => ({
              headerShown: getHeader(route) === 'JUSTEAT' ? true : false,
              headerTitle: props => <Title {...props} />,
              headerRight: props => <Right {...props} />
            })
            }
          />
          <HomeStack.Screen name='Details' component={DetailsScreen}
            options={{headerShown:false}} />
          <HomeStack.Screen name='Maps' component={Mapscreen}
            options={{ headerShown: false }}
          />
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
  },
  address_text: {
    marginLeft: 10,
    fontWeight: 'bold',
    fontSize: 15,
    alignItems: 'center'
  }
});

export default () => {
  return (
    <UserProvider>
      <Provider>
        <App />
      </Provider>
    </UserProvider>
  );
}