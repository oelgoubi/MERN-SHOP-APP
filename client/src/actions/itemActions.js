import {GET_ITEMS,ADD_ITEM,DELETE_ITEM,ITEMS_LOADING} from './types';
import axios from 'axios';



export const getItems = () => dispatch =>{
    dispatch(setItemsLoading());
    axios.get('/api/items')
    .then(res=>{
        //console.log(res.data.items)
         dispatch({
        type:GET_ITEMS,
        payload: res.data.items
    })})
    .catch(err=>{
        console.log(err.message)
    })
}


export const addItem = (item)=> dispatch =>{

    axios.post('/api/items',item)
    .then(res => dispatch({
        type:ADD_ITEM,
        payload: res.data.item
    }))
    
}

export const deleteItem = id => dispatch =>{
   
    axios.delete(`/api/items/${id}`)
    .then(res=>{
           console.log('item deleted'+ res.data.item);
           dispatch({
               type:DELETE_ITEM,
               payload: id
           })
        })
    .catch(err => console.log(err.message));


}
   




export const setItemsLoading = ()=>{
    return{
        type : ITEMS_LOADING
    }
}


