import React from 'react';
import { Text,View,Button,ScrollView,VirtualizedList } from 'react-native';
import RestResultcompo from '../components/restaurantresultcompo';

const homeScreen = () => {
    return(
        <View  style={{flex:1}}> 
            <RestResultcompo  title="Restaurants Nearby"/>
        </View>
    ); 
}

export default homeScreen;