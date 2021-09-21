import { PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from "../constants/productConstants"
import axios from "axios";

export const listProducts = () => async (dispatch) => {
    dispatch({
        type: PRODUCTS_LIST_REQUEST
    });
    try{
        const {data} = await axios.get('/api/products');
        dispatch({type: PRODUCTS_LIST_SUCCESS,payload:data});
    } catch(error){
        dispatch({type:PRODUCTS_LIST_FAIL,payload: error.message});
    }
};