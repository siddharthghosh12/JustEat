import createDataContext from '../createDatacontext';


const dishReducer = (state,action) => {
   // console.log('Action.payload>>>>',action.payload)
    switch(action.type)
    {
        case 'ADD_TO_CART':
           if(!state.find(item => item.dish.name === action.payload.dish.name && item.restid === action.payload.restid))
           {   /* console.log('--------------------------------------------------'); 
               console.log('I am the new one');
                console.log('--------------------------------------------------');
                */
               return [...state,action.payload]
           }
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
        default:
            return state
    }
}



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

export const {Context,Provider} = createDataContext(dishReducer,{ addToCart,removeFromCart },[]);