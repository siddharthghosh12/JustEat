import React, { useMemo, useContext,useState,useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { Divider } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Border from '../thickborder';
import useDishes from '../hooks/usedishes';
import BottomImage from '../logo/bottomlogo';
import Restdetail from '../components/restaurantdetail';
import BottomSheet from '../components/Bottomsheet';



const DetailsScreen = () => {
    const [result] = useDishes();
 


    const SendRecommended = () => {
        return (result.dishes || []).filter((dish) => {
            return dish.bestSeller === true || dish.mustTry === true;
        });

    }
    



    const Headercompo = () => {
        return (
            <View >
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
                <Border height={10} />
            </View>
        );
    }

    const FooterCompo = () => {
        return (
            <View>
                <BottomImage />
            </View>
        )
    }

    const renderItem = ({item}) => {
        return <Restdetail items={item} restid={result._id} restname={result.name} restimg={result.image}/>
    }

    const Memoval = useMemo(() => renderItem,[result])
    return (
        result.length === 0 ?
            <View style={styles.loadingcont}>
                <ActivityIndicator size='large' color='#4DC9FF' />
            </View> :
            <View style={{ flex: 1 }}>
                <FlatList
                    data={[{title:'Recommended',dishes:SendRecommended()},{title:'Menu',dishes:result.dishes}]}
                    keyExtractor={res => res.title}
                    showsVerticalScrollIndicator={false}
                    listKey="1.1"
                    ListHeaderComponent={Headercompo}
                    ListFooterComponent={FooterCompo}
                    renderItem={Memoval}
                />
            <BottomSheet />
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
    menutxt: {
        fontWeight: 'bold',
        fontSize: 22,
        margin: 20
    },
    
});

export default DetailsScreen;