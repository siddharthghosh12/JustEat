import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator,FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Border from '../thickborder';
import Restdetail from '../components/restaurantdetail';
import useDishes from '../hooks/usedishes';
import Rendermenu from '../components/rendermenu';
import BottomImage from '../logo/bottomlogo';

const DetailsScreen = () => {
    const [result] = useDishes();
    const [Recommended, setrecommended] = useState([]);
    
   // console.log(result.image)
    useEffect(() => {
        if (result) {
            const response = SendRecommended(true, true);
            setrecommended(response);
        }
    }, [result])

    const SendRecommended = (best, must) => {
        return (result.dishes || []).filter((dish) => {
            return dish.bestSeller === best || dish.mustTry === must;
        });

    }



    const Headercompo = () => {
        return (
                <View style={{ flex: 1 }}>
                    <Text style={styles.titlestyle}>{result.name}</Text>
                    <Text style={styles.innertext}>{result.trademark}</Text>
                    <Divider style={{ margin: 15 }} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ marginLeft: 30 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                                <FontAwesome name='star' size={17} color='black' />
                                <Text>{result.rating}</Text>
                            </View>
                            <Text style={styles.innertext}>20+ ratings</Text>
                        </View>
                        <View style={{ marginLeft: 100 }}>
                            <View style={{ flexDirection: 'row', marginHorizontal: 30 }}>
                                <FontAwesome name='rupee' size={17} color='black' />
                                <Text>{result.CostFor2}</Text>
                            </View>
                            <Text style={styles.innertext}>Cost for 2</Text>
                        </View>
                    </View>
                    <Divider style={{ margin: 15 }} />
                    <Border height={3} />
                    <Restdetail title='Recommended' items={Recommended} restname={result.name} restid={result._id} restimg={result.image}/>
                    <Border height={30} />
                    <Text style={styles.menutxt}>Menu</Text>
                </View>
        );
    }

const FooterCompo = () => {
    return(
        <View>
            <BottomImage />
        </View>
    )
}

    return (
        result.length === 0 ?
            <View style={styles.loadingcont}>
                <ActivityIndicator size='large' color='#4DC9FF' />
            </View> :
            <View style={{ flex: 1 }}>
               <FlatList 
               data={result.dishes}
               keyExtractor={res => res.image}
               initialNumToRender={30}
               showsVerticalScrollIndicator={false}
               ListHeaderComponent={Headercompo}
               ListFooterComponent={FooterCompo}
               renderItem={({item}) => {
                   return <Rendermenu res={item}/>
               }}
                />
            </View>
    );
}

const styles = StyleSheet.create({
    titlestyle: {
        marginLeft: 15,
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 15
    },
    innertext: {
        marginLeft: 15,
        color: '#A9A9A9'
    },
    loadingcont: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    menutxt:{
        fontWeight:'bold',
        fontSize:22,
        margin:20
    }
});

export default DetailsScreen;