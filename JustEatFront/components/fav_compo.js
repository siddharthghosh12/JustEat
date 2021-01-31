import React, { useContext } from 'react';
import { Text, StyleSheet, Image,TouchableOpacity,FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Context } from '../Context/userContext';
import { AntDesign } from '@expo/vector-icons';
import Displaycompo from './displaycompoforrestinhomescr';
import Border from '../thickborder';

// Displays a list of restaurants whenever the user marks some restaurant as FAVOURIE
const Favourites = ({navigation}) => {

    //Fetching the global state to get a list of favourites for a particular user
    const { state } = useContext(Context)

    // conditionally renders an image or list depending upon the user favourites list
    return (
        state.user.favourites.length === 0 ?
            <SafeAreaView style={styles.container}>
                <Image source={require('../assets/LoveForFood.png')} style={styles.img_style} />
                <Text style={{ color: '#a9a9a9', top: -30 }}>Once you favourite a restaurant, it will appear here.</Text>
            </SafeAreaView>
            :
            <SafeAreaView style={{flex:1}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{margin:15}}>
                    <AntDesign name='arrowleft' size={20} color="#404040" />
                </TouchableOpacity>
                <Border height={15} />
                <FlatList
                    data={state.user.favourites}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Details',{id:item.id})}>
                                <Displaycompo result={item} />
                            </TouchableOpacity>
                        );
                    }}
                />
            </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    img_style: {
        height: 300,
        width: 300,
        resizeMode: 'cover'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Favourites;