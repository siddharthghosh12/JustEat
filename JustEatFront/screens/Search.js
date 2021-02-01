import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput, FlatList, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { EvilIcons, Entypo } from '@expo/vector-icons';
import dishapi from '../api/dishapi';
import Server from '../server';
import Displaylist from '../components/Searchcompo';
import Loading_compo from '../components/Loadingcompo';



const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setresults] = useState([]);
    const [search, setsearch] = useState([]);
    const [loading, setLoading] = useState(false);
    let timer_ref = useRef(null);

    const burger_img = 'burgersearch.jpg';
    const noodle_img = 'noodlesearch.jpg';
    const veg_img = 'leafsearch.png';

    const Search = async () => {
        try {
            const respones = await dishapi.get('/restaurants');
            setresults(respones.data);
            setLoading(false)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        setLoading(true)
        Search();
    }, []);
    const searchresults = [];


    function Filtersearch(term) {
        const query = term;
        //console.log(term);
        (results || []).filter((item) => {
            return contains(item, query);
        });
        setsearch(searchresults);
    }

    function contains({ name, dishes, image, _id }, query) {
        if (query === '') {
            setsearch([]);
            return;
        }
        const Name = name.toLowerCase();
        const restid = _id;
        const rest_img = image;
        /* console.log(_id),
         console.log(image);
         */
        if (Name.includes(query)) {
            searchresults.push({ name, restid });
        }
        else {
            const dishdata = (dishes || []).filter((item) => {
                const dishname = item.name.toLowerCase();
                if (dishname.includes(query)) {
                    return true;
                }
            });

            if (dishdata.length > 0) {
                const dishobject = {
                    name,
                    rest_img,
                    restid,
                    dishes: dishdata
                }
                searchresults.push(dishobject);

            }


        }

    }

    const improved_fn = function (fn, del, term) {
        return function () {
            let context = this;
            clearTimeout(timer_ref.current);
            timer_ref.current = setTimeout(() => {
                Filtersearch.apply(context, [term]);
            }, del);
        }
    }


    const fun = improved_fn(Filtersearch, 300, term)

    return (
        loading ?
            <Loading_compo />
            :

            <View style={styles.container}>
                <View style={styles.background}>
                    <EvilIcons name="search" size={40} color='#4dc9ff' />
                    <TextInput style={styles.InputStyle} placeholder="Search" value={term}
                        onChangeText={(newt) => {
                            setTerm(newt);
                        }} autoCapitalize="none"
                        autoCorrect={false} onEndEditing={() => Filtersearch(term)}
                        onKeyPress={() => fun()} selectTextOnFocus selectionColor='#ecfaff'
                    />
                    <TouchableOpacity onPress={() => {
                        setTerm('')
                        setsearch([])
                    }} style={{ alignSelf: 'center', marginRight: 5 }} >
                        <Entypo name='circle-with-cross' color='#e0e0e0' size={20} />
                    </TouchableOpacity>
                </View>
                {
                    search.length !== 0 ?
                        <FlatList
                            data={search}
                            keyExtractor={res => res.restid}
                            renderItem={({ item }) => {
                                // console.log('ITEM',item);
                                return <Displaylist restdetail={item} />
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                        :
                        <View>
                            <Text style={styles.title}>Popular Cuisines</Text>
                            <View style={styles.imgcont}>
                                <TouchableOpacity onPress={() => Filtersearch('burger')}>
                                    <Image source={{ uri: `${Server}/images/${burger_img}` }} style={styles.img} />
                                    <Text style={styles.imgText} >Burger</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Filtersearch('maggi')}>
                                    <Image source={{ uri: `${Server}/images/${noodle_img}` }} style={styles.img} />
                                    <Text style={styles.imgText}>Noodles</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => Filtersearch('veg')}>
                                    <Image source={{ uri: `${Server}/images/${veg_img}` }} style={styles.img} />
                                    <Text style={styles.imgText}>Veg Eateries</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                }
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,

    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        margin: 15
    },
    img: {
        marginHorizontal: 10,
        height: 60,
        width: 60,
        borderRadius: 30
    },
    imgcont: {
        flexDirection: 'row',
        marginLeft: 15
    },
    imgText: {
        marginLeft: 20
    },
    background: {
        height: 35,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#4dc9ff',
        marginBottom: 15
    },
    InputStyle: {
        flex: 1,
        marginLeft: 5
    }
});

export default SearchScreen;