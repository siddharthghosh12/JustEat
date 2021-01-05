import createDataContext from '../createDatacontext';

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

const Logout = (dispatch) => {
    return () => {
        dispatch({type:'LOGOUT_USER'})
    }
}

export const {Context,Provider} = createDataContext(userReducer,{Login,Logout},initailState)