import React,{useEffect,useState} from 'react';
import {Text,View,StyleSheet,FlatList} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import  dishapi from '../api/dishapi';
import Displaycompo from './displaycompofordishesinhomescr';


const Dishresultcompo = ({title}) => {
    const [result,setresult] = useState([]);

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