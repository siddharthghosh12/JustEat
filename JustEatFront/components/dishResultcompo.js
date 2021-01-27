import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import  dishapi from '../api/dishapi';
import Displaycompo from './displaycompofordishesinhomescr';

// Displays the top recommended dishes to the user
// TODO: Configure touches and wireUp dishes with respective canteens
const Dishresultcompo = ({title}) => {

    // To Store the list of dishes returned from the server
    const [result,setresult] = useState([]);

    // Gets the list of dishes from the server as soon as the screen loads for the first time
    useEffect(() => {
        let mounted = true;
        (async () => {
            const response = await dishapi.get('/dishes/bestseller');
            if(mounted)
                setresult(response.data);
        })();

        return () => mounted=false;
    },[])

    return(
        <View style={{marginBottom:20}}>
            <View style={styles.container}>
                <FontAwesome name="thumbs-up" size={30} color="#4DC9FF" />
                <Text style={styles.Textstyle}>{title} </Text>
            </View>
            <FlatList 
            horizontal
            data={result}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(res) => res._id}
            renderItem={({item}) => {
                return <Displaycompo  result={item} />
            }}   />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        marginLeft:15,
        marginTop:20,
        alignItems:"center"
    },
    Textstyle: {
        marginLeft:10,
        fontWeight: "bold",
        fontSize:19
    }
});

export default Dishresultcompo;