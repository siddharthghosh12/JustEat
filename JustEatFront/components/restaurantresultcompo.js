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



// This is the homeScreencompo which  shows a list of restaurants as well as dishes
const RestResultcompo = ({ title }) => {

    // Various state params to maintain display
    const [result, setresult] = useState([]);
    const [load, setload] = useState(true);

    // For navigation to details screen
    const navigation = useNavigation();

   
    // gets the list of restaurants the when the screen loads for the first time
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
    // header component of flatlist displaying the list of top dishes
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

    // footer cmoponent to display a button and bottom_image
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
                   <Image source={require('../assets/animation.gif')} style={{width:100,height:100}} />
                </View> :
        <View style={{ flex: 1 }}>
            <FlatList
                data={result}
                keyExtractor={(res) => res._id}
                ListHeaderComponent={headercompo}
                showsVerticalScrollIndicator={false}
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