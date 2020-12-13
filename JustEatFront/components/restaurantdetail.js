import React from 'react';
import { Text,StyleSheet,View,FlatList } from 'react-native';
import Rendermenu from './rendermenu';


const Restdetail = ({title,items,restname,restid,restimg}) => {

    return(
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{title}</Text>
            <FlatList 
            data={items}
            keyExtractor={result => result.image}
            initialNumToRender={30}
            renderItem={({item}) => { 
                //console.log(item.name);
               return <Rendermenu res={item} restid={restid} restname={restname} restimg={restimg}/>
            }} />
        </View>
    );
}

const styles = StyleSheet.create({
 container: {
     marginTop:20,
 },
 titleStyle:{
     fontWeight:'bold',
     fontSize:22,
     margin:20
 }
});

export default Restdetail;