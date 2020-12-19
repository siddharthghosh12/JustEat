import React from 'react';
import { View, StyleSheet, Text, FlatList, TouchableOpacity } from 'react-native';
import Display from './Searchresult';
import {Entypo} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'

const Displaylist = ({ restdetail }) => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.indistyle} onPress={() => navigation.navigate('Details', { id : restdetail.restid })}>
                <Text style={styles.resttitle}>{restdetail.name}</Text>
                <Entypo name='chevron-with-circle-right' size={20} color='#4dc9ff' style={{alignSelf:'center',margin:10}} />
            </TouchableOpacity>
            <FlatList
                data={restdetail.dishes}
                keyExtractor={dish => dish.name}
                renderItem={({ item }) => {
                    return <Display item={item} restname={restdetail.name} restid={restdetail.restid} rest_img={restdetail.rest_img} />
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    resttitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginLeft:5,
        marginTop:10
    },
    container:{
        margin:10,
        elevation:1,
        borderRadius:2

    },
    indistyle:{
        flexDirection:'row',
        justifyContent:'space-between'
    }
});

export default Displaylist;