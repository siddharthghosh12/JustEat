import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Divider } from 'react-native-elements';

const Billcompo = ({ total }) => {
    const topay = total + 10;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bill Details</Text>
            <View style={styles.flexcont}>
                <Text>Item Total</Text>
                <View style={{ flexDirection: 'row' }}>
                    <MaterialCommunityIcons name='currency-inr' size={15} color='black' style={{ alignSelf: 'center' }} />
                    <Text>{total}.00</Text>
                </View>
            </View>
            <View style={styles.flexcont} >
                <Text>Delivery Fee</Text>
                <View style={{ flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='currency-inr' size={15} color='black' style={{ alignSelf: 'center' }} />
                    <Text>10.00</Text>
                </View>
            </View>
            <View style={styles.flexcont}>
            <Text>Total Discount</Text>
                <View style={{ flexDirection: 'row',marginRight:5 }}>
                    <Text>-</Text>
                    <MaterialCommunityIcons name='currency-inr' size={15} color='lightgreen' style={{alignSelf:'center'}} />
                    <Text style={{color:'lightgreen'}}>00</Text>
                </View>
            </View>
            <View>
                <Divider style={{marginVertical:10,marginLeft:5,marginRight:15}} />
            </View>
            <View style={styles.flexcont} >
                <Text style={styles.dectext}>Taxes and Charges</Text>
                <View style={{ flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='currency-inr' size={15} color='black' style={{ alignSelf: 'center' }} />
                    <Text>00.00</Text>
                </View>
            </View>
            <View>
                <Divider style={{marginVertical:10,marginLeft:5,marginRight:15}} />
            </View>
            <View style={styles.flexcont} >
                <Text style={styles.title}>To Pay</Text>
                <View style={{ flexDirection: 'row'}}>
                    <MaterialCommunityIcons name='currency-inr' size={15} color='black' style={{ alignSelf: 'center' }} />
                    <Text>{topay}.00</Text>
                </View>
            </View>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginLeft: 15
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    flexcont: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: 10,
        marginVertical: 5
    },
    dectext:{
        textDecorationLine:'underline',
        textDecorationStyle:'dotted',
        color:'#4DC9FF'
    }
});

export default Billcompo;