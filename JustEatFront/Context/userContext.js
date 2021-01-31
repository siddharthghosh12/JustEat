import createDataContext from '../createDatacontext';
import AsyncStorage from '@react-native-async-storage/async-storage';

// initialState of user set as null
const initailState = {
    user: null
}

// Reducer function
const userReducer = (state, action) => {
    switch (action.type) {
        // Logs the user in by setting user === action.payload
        case "LOGIN_USER":
            return { ...state, user: action.payload }
        // Logs out the user by setting it to null
        case "LOGOUT_USER":
            return { ...state, user: null }
        /*
            Here we copied the previous array in to a new one and iterate over the
            array and set save_as_current to false for all the items , then we returned 
            a new array along with the copied array and action.payload 
        */
        case "SAVE_ADDRESS":
            let new_address_array = state.user.address.map(a => { return { ...a } });
            for (key in new_address_array) {
                new_address_array[key].save_as_current = false
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    address: [...new_address_array, action.payload]
                }
            }
        /*
            Set save_as_current prop for all the previous saved items as false
            and true for action.payload
        */
        case 'SET_NEW_ADDRESS':
            let array = state.user.address.map(a => { return { ...a } })
            let i;
            for (i = 0; i < array.length; i++) {
                array[i].save_as_current = false;
                if (i === action.payload)
                    array[i].save_as_current = true;
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    address: [...array]
                }
            }
        // return a new object along with the previous array and action.payload
        case "ADD_TO_FAVOURITES":
            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: [...state.user.favourites, action.payload]
                }
            }
        // Filter the id in action.PAYLOAD and return the object
        case "REMOVE_FROM_FAVOURITES":
            let old_fav = [...state.user.favourites]
            const remove = () => {
                return (old_fav || []).filter((item) => {
                    return item.id !== action.payload.id;
                })
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    favourites: remove()
                }
            }
        case "DELETE_ADDRESS":
            let old_address = [...state.user.address]
            let remove_add = () => {
                return (old_address || []).filter((item) => {
                    return item._id !== action.payload;
                })
            }
            return {
                ...state,
                user: {
                    ...state.user,
                    address: remove_add()
                }
            }
        case "EDIT_ADDRESS":
            let new_add_array = state.user.address.map((obj) => {
                if (obj._id === action.payload._id) {
                    obj.title = action.payload.title;
                    obj.address = action.payload.address;
                    return obj
                }
                return obj;
            });
            return {
                ...state,
                user: {
                    ...state.user,
                    address: [...new_add_array]
                }
            }
        case "EDIT__INFO":
            return {
                ...state,
                user:{
                    ...state.user,
                    user:{
                        ...state.user.user,
                        Phone:action.payload
                    }
                }
            }
        default:
            return state;
    }

}

// Functions to dipatch various actions
const Login = (dispatch) => {
    return (item) => {
        dispatch({ type: "LOGIN_USER", payload: item })
    }
}

const Logout = (dispatch) => async () => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    let new_user = {
        ...user,
        token: null
    }
    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: 'LOGOUT_USER' })
}

const Save_address = (dispatch) => async (item) => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    let new_address_array = user.address.map(a => { return { ...a } });
    for (key in new_address_array) {
        new_address_array[key].save_as_current = false;
    }

    let new_user = {
        ...user,
        address: [...new_address_array, item]
    }
    // console.log(new_user);
    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: 'SAVE_ADDRESS', payload: item })
}
const Set_address = (dispatch) => async (item) => {
    let previous_user = await AsyncStorage.getItem('user');
    let _user = JSON.parse(previous_user);
    let address_array = _user.address.map(a => { return { ...a } });
    let i;
    for (i = 0; i < address_array.length; i++) {
        address_array[i].save_as_current = false;
        if (i === item)
            address_array[i].save_as_current = true
    }

    let _new_user = {
        ..._user,
        address: [...address_array]
    }
    await AsyncStorage.setItem('user', JSON.stringify(_new_user));
    dispatch({ type: 'SET_NEW_ADDRESS', payload: item })
}


const Handle_favourites = (dispatch) => async (item) => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    if (!item.touched) {
        let new_user = {
            ...user,
            favourites: [...user.favourites, item]
        }
        await AsyncStorage.setItem('user', JSON.stringify(new_user))
        dispatch({ type: 'ADD_TO_FAVOURITES', payload: item });
        return;
    }
    old_fav = [...user.favourites]
    const remove_fav = () => {
        return (old_fav || []).filter((fav_item) => {
            return fav_item.id !== item.id;
        })
    }

    let new_user = {
        ...user,
        favourites: remove_fav()
    }
    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: item })
}

const Edit_Address = (dispatch) => async (item) => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    let new_address_array = user.address.map((obj) => {
        if (obj._id === item._id) {
            obj.title = item.title;
            obj.address = item.address;
            return obj
        }
        return obj;
    })

    let new_user = {
        ...user,
        address: [...new_address_array]
    }

    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: "EDIT_ADDRESS", payload: item })
}

const Delete_Address = (dispatch) => async (item) => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    const remove_Address = () => {
        return (user.address || []).filter((obj) => {
            return obj._id !== item
        })
    }
    let new_user = {
        ...user,
        address: remove_Address()
    }
    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: "DELETE_ADDRESS", payload: item })
}

const Edit_info = (dispatch) => async (item) => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);

    let new_user = {
        ...user,
        user: {
            ...user.user,
            Phone: item
        }
    }
    await AsyncStorage.setItem('user',JSON.stringify(new_user));
    dispatch({type:"EDIT_INFO",paylaod:item})
}

export const { Context, Provider } = createDataContext(userReducer, { Login, Logout, Save_address, Set_address, Handle_favourites, Edit_Address, Delete_Address,Edit_info }, initailState)