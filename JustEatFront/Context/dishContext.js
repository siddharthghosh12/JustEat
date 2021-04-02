import createDataContext from '../createDatacontext';

// Reducer function handling various state changes depending upon action.TYPE
const dishReducer = (state,action) => {
   
    switch(action.type)
    {
        // Function  to add dishes to the Cart
        case 'ADD_TO_CART':
            /*
                Checks if the dish already exists or not, it doesn't exist then add it to the cart.
            */
           if(!state.find(item => item.dish.name === action.payload.dish.name && item.restid === action.payload.restid))
           {  
               return [...state,action.payload]
           }
           /*
            if the dish already exists then map through the state, find that dish object and then 
            increase its qunatity by 1 and return the state.
           */
           else {
              
             return  state.map((item,index) =>{
                   if((item.dish.name !== action.payload.dish.name ))
                   {
                       return item;
                   }
                   if(item.restid === action.payload.restid)
                   {
                    return{
                        ...item,
                        quantity: item.quantity + 1
                    }
                   }
                   return item;
               }) 
           }
           /*
                Map through the state find the dish object sent in via action.PAYLOAD
                and it its restId matches then reduce the quantity by one ,
                and if its quantity is 1 then filter it.
           */
        case 'REMOVE_FROM_CART':
            return  state.map((item,index) =>{
                if((item.dish.name !== action.payload.dish.name ))
                {
                    return item;
                }
                if(item.restid === action.payload.restid)
                {
                    
                 return{
                     ...item,
                     quantity: item.quantity - 1
                 }
                }
                return item;
            }).filter((item) => {
                if(item.quantity === 0)
                    return false;
                return true;
            });
        case "REPLACE_CART":
            return [action.payload]
        case "CLEAR_CART":
            return []
        default:
            return state
    }
}


//Functions to dispatch actions
const addToCart = (dispatch) => {
  return (item) => {
      dispatch({type:'ADD_TO_CART',payload:item});
  };
};

const removeFromCart = (dispatch) => {
    return(item) => {
        dispatch({type:'REMOVE_FROM_CART',payload:item});
    }
}

const replaceCart = (dispatch) => {
    return(item) => {
        dispatch({type:"REPLACE_CART",payload:item})
    }
}

const clearCart = (dispatch) => {
    return (item) => {
        dispatch({type:"CLEAR_CART",payload:item})
    }
}

export const {Context,Provider} = createDataContext(dishReducer,{ addToCart,removeFromCart,replaceCart,clearCart },[]);