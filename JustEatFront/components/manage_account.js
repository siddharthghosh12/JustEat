import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons'



// Displays a Touchable component for various items on the account screen 
const Managecompo = ({ iconname, title }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    {title === 'Send Feedback' ? <Ionicons name={iconname} size={25} color='black' /> :
                        <FontAwesome name={iconname} size={25} color='black' />}
                    <Text style={styles.Text}>{title}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name='ios-arrow-dropright' size={25} color='black' />
                </TouchableOpacity>
            </View>
            <Divider />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
    },
    Text: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#4dc9ff',
        marginLeft: 15
    }
});

export default Managecompo;