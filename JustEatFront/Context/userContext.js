import createDataContext from '../createDatacontext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initailState = {
    user: null
}

const userReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_USER":
            return { ...state, user: action.payload }
        case "LOGOUT_USER":
            return { ...state, user: null }
        case "SAVE_ADDRESS":
            let new_address_array = [...state.user.address];
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
            case 'SET_NEW_ADDRESS':
                let array = [...state.user.address]
                let i;
                for(i=0;i<array.length;i++)
                {
                    array[i].save_as_current=false;
                    if(i===action.payload)
                        array[i].save_as_current=true;
                } 
                return {
                    ...state,
                    user: {
                        ...state.user,
                        address: [...array]
                    }
                }
        default:
            return state;
    }

}

const Login = (dispatch) => {
    return (item) => {
        console.log(item)
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
    let new_address_array = [...user.address];
    for (key in new_address_array) {
        new_address_array[key].save_as_current = false;
    }

    let new_user = {
        ...user,
        address: [...new_address_array, item]
    }
    console.log(new_user);
    await AsyncStorage.setItem('user', JSON.stringify(new_user));
    dispatch({ type: 'SAVE_ADDRESS', payload: item })
}
const Set_address = (dispatch) => async (item) => {
    let previous_user = await AsyncStorage.getItem('user');
    let _user = JSON.parse(previous_user);
    let address_array = [..._user.address];
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


export const { Context, Provider } = createDataContext(userReducer, { Login, Logout, Save_address,Set_address }, initailState)