import React from 'react';
import { StyleSheet,View,TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';


const Searchcompo = ({term,onTermChange,onTermSubmit}) => {
    return(
        <View style={styles.background}>
            <Feather name="search" size={35} />
            <TextInput style={styles.InputStyle} placeholder="Search" value={term} 
                onChangeText={newTerm => onTermChange(newTerm)} autoCapitalize="none"
                autoCorrect={false} onEndEditing={onTermSubmit}  />
        </View>
    );
}

const styles = StyleSheet.create({
    background : {
        backgroundColor:'#F0EEEE',
        height: 35,
        borderRadius: 5,
        marginHorizontal:15,
        marginTop:30,
        flexDirection:"row"
    },
    InputStyle : {
        flex:1,
        marginLeft:5
    }
});

export default Searchcompo;