import createDataContext from '../createDatacontext';
import AsyncStorage from '@react-native-async-storage/async-storage';


const initailState = {
    user:null
}

const userReducer = (state,action) => {
    switch(action.type)
    {
        case "LOGIN_USER":
            return {...state,user:action.payload}
        case "LOGOUT_USER":
            return {...state,user:null}
        default:
            return state;
    }
        
}

const Login = (dispatch) => {
    return(item) => {
        dispatch({type:"LOGIN_USER",payload:item})
    }
}

const Logout = (dispatch) => async () => {
    let prev_user = await AsyncStorage.getItem('user');
    let user = JSON.parse(prev_user);
    let new_user = {
        ...user,
        token:null
    }
    await AsyncStorage.setItem('user',JSON.stringify(new_user));
        dispatch({type:'LOGOUT_USER'})
    }


export const {Context,Provider} = createDataContext(userReducer,{Login,Logout},initailState)