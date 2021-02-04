import React,{useMemo} from 'react';
import { Text,StyleSheet,View,FlatList } from 'react-native';
import Rendermenu from './rendermenu';


const Restdetail = ({items,restname,restid,restimg,openModal,setItem}) => {

    const renderItem = ({item}) => {
        return <Rendermenu res={item} id={restid} name={restname} img={restimg} showModal={openModal} setItem={setItem}/>
    }

    const Memoval = useMemo(() => renderItem,[items])
    
    return(
        <View style={styles.container}>
            <Text style={styles.titleStyle}>{items.title}</Text>
            <FlatList 
            data={items.dishes}
            keyExtractor={result => result.image}
            listKey={(item,index) => 'D' + index.toString()}
            renderItem={Memoval} />
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