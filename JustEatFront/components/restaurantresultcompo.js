import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-elements'
import { MaterialIcons } from '@expo/vector-icons'
import dishapi from '../api/dishapi';
import Displaycompo from './displaycompoforrestinhomescr';
import Dishresultcompo from './dishResultcompo';
import Server from '../server';
import Border from '../thickborder';
import { useNavigation } from '@react-navigation/native';




const RestResultcompo = ({ title }) => {
    const [result, setresult] = useState([]);
    const [load, setload] = useState(true);
    const navigation = useNavigation();

   

    useEffect(() => {
        let mounted = true;
        (async ()=> {
            let response = await dishapi.get('/restaurants');
            if(mounted)
            {
                setresult(response.data);
                setload(false)
            }
        })();

        return () => mounted = false;
    }, [])

    const img_name = 'icon.jpg';
    const headercompo = () => {
        return (
                <View>
                    <Dishresultcompo title="Top Picks For You" />
                    <Border height={5} />
                    <View style={styles.container}>
                        <MaterialIcons name="restaurant" size={30} color="#4DC9FF" />
                        <Text style={styles.text}>{title}</Text>
                    </View>
                </View>
        );
    }

    const footercompo = () => {
        return (
                <View>
                    <Button title="See All Restaurants"
                        type='solid' raised
                        buttonStyle={{ width: 200, alignSelf: 'center', backgroundColor: 'black' }}
                        titleStyle={{ color: '#4DC9FF' }} />
                    <Image style={styles.img} source={{ uri: `${Server}/images/${img_name}` }} />
                </View>
        );
    }


    return (
        load ?
                <View style={styles.loadcont}>
                    <ActivityIndicator size="large" color='#4DC9FF' />
                </View> :
        <View style={{ flex: 1 }}>
            <FlatList
                data={result}
                keyExtractor={(res) => res._id}
                ListHeaderComponent={headercompo}
                ListFooterComponent={footercompo}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => {

                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item._id })} >
                            <Displaycompo result={item} />
                        </TouchableOpacity>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginLeft: 15,
        marginTop: 10,
    },
    text: {
        marginLeft: 10,
        fontWeight: "bold",
        fontSize: 19
    },
    img: {
        height: 424,
        width: 300,
        margin: 30
    },
    loadcont: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    }
});

export default RestResultcompo;