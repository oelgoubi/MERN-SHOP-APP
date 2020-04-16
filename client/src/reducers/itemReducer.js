import {v4 as uuidv4} from 'uuid';
import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from '../actions/types'

const initalState = {
    items:[],
    loading:false };  // GET DATA STATE

 const itemReducer =(state = initalState,action)=>{


    switch(action.type)
    {
        case GET_ITEMS:
            return {
                ...state,
                items:action.payload,
                loading:false
            };
        case DELETE_ITEM:
            return{
                ...state,
                items:state.items.filter(item=> item._id !== action.payload)
            }; 
        case ADD_ITEM:
            return{
                ...state,
                items:[...state.items,action.payload]
            }
        case ITEMS_LOADING:
            return{
                ...state,
                loading:true
            }    
        default:
            return state;
    }
}


export default itemReducer;