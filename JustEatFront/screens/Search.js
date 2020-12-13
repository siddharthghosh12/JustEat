import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Searchcompo from '../components/searchcompo';
import dishapi from '../api/dishapi';


const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setresults] = useState([]);

    const Search = async () => {
        try {
            const respones = await dishapi.get('/dishes')
            console.log('pata ni kya dikkat h ');
            setresults(respones.data);
            console.log(respones.data);
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <View >
            <Searchcompo term={term} onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={Search} />
            <Text>We have found {results.length} results</Text>
            <Text>{term}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#F0EEEE',
        height: 35,
        borderRadius: 5,
        marginHorizontal: 15,
        marginTop: 30,
        flexDirection: "row"
    },
    InputStyle: {
        flex: 1,
        marginLeft: 5
    }
});

export default SearchScreen;