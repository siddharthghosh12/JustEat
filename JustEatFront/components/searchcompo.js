import React from 'react';
import { StyleSheet,View,TextInput } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';


const Searchcompo = ({term,onTermChange,onTermSubmit}) => {
    return(
        <View style={styles.background}>
            <EvilIcons name="search" size={40} color='#4dc9ff' />
            <TextInput style={styles.InputStyle} placeholder="Search" value={term} 
                onChangeText={newTerm => onTermChange(newTerm)} autoCapitalize="none"
                autoCorrect={false} onEndEditing={(term) => onTermSubmit(term)}  />
        </View>
    );
}

const styles = StyleSheet.create({
    background : {
        height: 35,
        borderRadius: 5,
        marginHorizontal:15,
        flexDirection:"row",
        borderWidth:1,
        borderColor:'#4dc9ff'
    },
    InputStyle : {
        flex:1,
        marginLeft:5
    }
});

export default Searchcompo;