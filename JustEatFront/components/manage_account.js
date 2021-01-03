import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Divider } from 'react-native-elements'
import { FontAwesome, Ionicons } from '@expo/vector-icons'




const Managecompo = ({ iconname, title }) => {
    return (
        <View>
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    {title === 'Send Feedback' ? <Ionicons name={iconname} size={30} color='#4dc9ff' /> :
                        <FontAwesome name={iconname} size={25} color='#4dc9ff' />}
                    <Text style={styles.Text}>{title}</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name='ios-arrow-dropright' size={30} color='#4dc9ff' />
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
        fontSize: 18,
        color: '#a9a9a9',
        marginLeft: 15
    }
});

export default Managecompo;