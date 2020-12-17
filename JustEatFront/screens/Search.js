import React, { useState,useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Searchcompo from '../components/searchcompo';
import dishapi from '../api/dishapi';


const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setresults] = useState([]);
    const [search,setsearch] = useState([]);

    const Search = async () => {
        try {
            const respones = await dishapi.get('/restaurants');
            setresults(respones.data);
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        Search();
    },[]);
    const searchresults = [];

    const Filtersearch = (term) => {
        const query = term;
        console.log(term);
         (results || []).filter((item) => {
            return contains(item,query);
        });
        setsearch(searchresults);
    }

    const contains = ({name,dishes},query) => {
        const Name = name.toLowerCase();
        if(Name.includes(query))
            {
                searchresults.push({name});
            }
        else {
            const dishdata = (dishes || []).filter((item) => {
                const dishname = item.name.toLowerCase();
                if(dishname.includes(query))
                    {
                        return true;
                    }
            })
            if(dishdata.length>0)
            {
                const dishobject = {
                    name,
                    dishes:dishdata
                }
               searchresults.push(dishobject);
               
            }
        }
       
    }
 

    return (
        <View style={styles.container}>
            <Searchcompo term={term} onTermChange={newTerm => setTerm(newTerm)}
                onTermSubmit={() => Filtersearch(term)} />
            <Text style={styles.title}>Popular Cuisines</Text>
        </View>
    );
}

const styles = StyleSheet.create({
     container:{
         flex:1,
         marginTop:50
     },
     title:{
         fontSize:17,
         fontWeight:'bold',
         margin:15
     }
});

export default SearchScreen;