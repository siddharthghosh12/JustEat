import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Linking, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import api from '../api/dishapi';
import Loading_compo from '../components/Loadingcompo';
import { EvilIcons, AntDesign, Ionicons, FontAwesome5, Feather } from '@expo/vector-icons';
import Border from '../thickborder';
import { Context as UserContext } from '../Context/userContext';


const DeliveryScreen = ({navigation}) => {


    const [restaurant, setRestaurant] = useState(null);
    const [region, setRegion] = useState(null);
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [timer, setTimer] = useState('28');
    const { state: userState } = useContext(UserContext);
    const route = useRoute();
    const { restId } = route.params;

    useEffect(() => {

        let mounted = true;
        const getRestaurant = async () => {
            setLoading(true);
            let response = await api.get(`/restaurants/${restId}`);

            let index_of_order = userState.user.orders.findIndex(item => item.orderStatus === 'Delivering');
            if (mounted && response.status === 200) {
                setLoading(false);
                setRestaurant(response.data);

                if (index_of_order !== -1)
                    setOrderId(String(userState.user.orders[index_of_order].OrderId).replace(/[^\d]/g, ''));
            }
        }

        getRestaurant();

        return () => mounted = false;

    }, []);

    useEffect(() => {
        if (restaurant !== null) {

            let DestinationRegion = {
                latitude: 25.257736,
                longitude: 82.985684,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }

            let mapRegion = {
                latitude: (restaurant.location.latitude + DestinationRegion.latitude) / 2,
                longitude: (restaurant.location.longitude + DestinationRegion.longitude) / 2,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            }

            setRegion(mapRegion)
        }
    }, [restaurant]);


    const onPressCall = () => {
        const url = 'tel:8191966871';
        Linking.canOpenURL(url)
            .then(async (supported) => {
                if (supported) {
                    try {
                        return Linking.openURL(url);
                    } catch (e) {
                        return console.error(e);
                    }
                }
            });
    }

    const onRefresh = async () => {
        // console.log('logging',userState?.user?.orders);
        // console.log(userState)
        setRefreshing(true);
        setLoading(true);
        let index = userState.user.orders.findIndex(item => item.orderStatus === 'Delivering');
        if (index !== -1) {
            let id = userState.user.orders[index].OrderId;
            let response = await api.get(`order/check_status/${id}`);
            if (response.status === 200) {
                let order_date = new Date(response.data.orderAt);
                let cur_date = new Date();
                setTimer(parseInt(String(28 - (cur_date.getTime() - order_date.getTime()) / 60000)));
                setRefreshing(false);
                setLoading(false);
            }
        }
        else
            console.log('No order');
    }

    useEffect(() => {
        let mounted = true;

        if(mounted)
        {
            onRefresh();
        }
    },[])

    const RestMarker = () => {
        return (
            <Marker
                coordinate={{
                    latitude: restaurant.location.latitude,
                    longitude: restaurant.location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <View style={styles.markercontainer}>
                    <View style={styles.markerStyle}>
                        <EvilIcons name='location' size={25} color='white' />
                    </View>
                </View>
                <Text style={styles.markerText}>{restaurant.name}</Text>
            </Marker>
        )
    }

    const TimeStamp = () => {
        return (
            <View style={styles.TimeStamp}>
                <Image source={require('../assets/Preparing.gif')} style={{ width: 75, height: 75 }} />
                <Text style={styles.TimeStampText}>{timer} mins</Text>
            </View>
        )
    }
    const DestMarker = () => {
        return (
            <Marker
                coordinate={{
                    latitude: 25.257736,
                    longitude: 82.985684,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01
                }}
            >
                <View style={styles.markercontainer}>
                    <View style={styles.markerStyle}>
                        <AntDesign name='home' size={25} color='white' />
                    </View>
                </View>
                <Text style={styles.markerText}>Vishwkarma Hostel</Text>
            </Marker>
        )
    }

    const StatusMenu = ({ title }) => {
        return (
            <View style={styles.statusContainer}>
                <Ionicons name='ios-list-box' size={30} color="#a9a9a9" />
                <Ionicons name='ios-checkmark-circle' size={15} color='#06ff50' style={styles.checkStyle} />
                <View style={{ marginHorizontal: 35 }}>
                    <Text style={styles.statusText}>{title}</Text>
                    <Text style={{ fontSize: 12, color: "#a9a9a9" }}>We have received your Order.</Text>
                </View>
            </View>
        );
    }

    const OrderReceived = () => {
        return (
            <View style={{ marginHorizontal: 20, flexDirection: 'row', marginBottom: 5 }}>
                <View>
                    <Ionicons name='ios-checkmark-circle' size={20} color='#06ff50' style={{ position: "absolute", bottom: 15, left: 18 }} />
                    <FontAwesome5 name='hand-holding' size={30} color='#a9a9a9' />
                </View>
                <View style={{ marginHorizontal: 25 }}>
                    <Text style={styles.statusText}>Order Confirmed</Text>
                    <Text style={{ fontSize: 12, color: "#a9a9a9" }}>Your Order has been confirmed.</Text>
                </View>
            </View>
        )
    }

    const FoodProcessing = () => {
        return (
            <View style={{ marginHorizontal: 5, flexDirection: 'row' }}>
                <Image source={require('../assets/Preparing.gif')} style={{ width: 75, height: 75 }} />
                <View style={{ marginVertical: 25 }}>
                    <Text style={styles.statusText}>Processing Food</Text>
                    <Text style={{ fontSize: 12, color: "#a9a9a9" }}>Your Food is being Processed.</Text>
                </View>
            </View>
        )
    }

    const CallPartner = () => {
        return (
            <TouchableOpacity style={{ flexDirection: 'row', marginHorizontal: 20 }} onPress={() => onPressCall()}>
                <Feather name='shopping-bag' size={25} style={{ alignSelf: 'center', color: "#a9a9a9" }} />
                <View style={{ marginLeft: 35 }}>
                    <Text style={styles.statusText}>Food is being prepared.</Text>
                    <Text style={{ fontSize: 12, color: '#a9a9a9' }}>Name is waiting to pickup your order.</Text>
                    <Text style={{ fontSize: 12, color: '#a9a9a9' }}>Wanna give some instructions ??.</Text>
                </View>
                <Feather name='phone' size={25} style={{ alignSelf: 'center', marginLeft: 20 }} />
            </TouchableOpacity>
        )
    }
    return (
        loading ?
            <View style={styles.loadingcontainer}>
                <Loading_compo />
            </View> :
            <SafeAreaView>
                <ScrollView showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <View style={styles.headerContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name='arrowleft' size={20} style={{ fontWeight: "bold" }} />
                        </TouchableOpacity>
                        <Text style={styles.headerText}>Order #{orderId}</Text>
                    </View>
                    <MapView
                        style={styles.map}
                        provider={PROVIDER_GOOGLE}
                        initialRegion={region}
                    >
                        <RestMarker />
                        <DestMarker />
                    </MapView>
                    <TimeStamp />
                    <View style={{ marginVertical: 15 }}>
                        <Border height={15} />
                    </View>
                    <StatusMenu title='Order Placed' />
                    <OrderReceived />
                    <FoodProcessing />
                    <CallPartner />
                </ScrollView>
            </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    map: {
        height: 400
    },
    headerContainer: {
        flexDirection: 'row',
        marginHorizontal: 15,
        height: 30,
        alignItems: 'center'
    },
    headerText: {
        fontWeight: "bold",
        marginLeft: 15,
        fontSize: 16
    },
    loadingcontainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    markercontainer: {
        height: 40,
        width: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    markerStyle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4dc9ff'
    },
    markerText: {
        fontSize: 10
    },
    TimeStamp: {
        backgroundColor: "#fff",
        position: "absolute",
        right: 20,
        top: 300,
        width: 80,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    TimeStampText: {
        color: '#4dc9ff',
        fontSize: 18
    },
    statusContainer: {
        flexDirection: 'row',
        margin: 20,
        height: 50
    },
    statusText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    checkStyle: {
        position: "absolute",
        bottom: 15,
        left: 20
    },
});

export default DeliveryScreen;