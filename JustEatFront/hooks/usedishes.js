import {useState,useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import dishapi from '../api/dishapi';

export default () => {
    const route = useRoute();
    const {id} = route.params;
    const [result,setresult] = useState([]);
    
    const Search = async () => {
        try {
            const response = await dishapi.get(`/restaurants/${id}`);
            setresult(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
            Search();
    },[]);

    return {result,id};
}
