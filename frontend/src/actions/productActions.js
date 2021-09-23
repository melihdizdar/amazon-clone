import { PRODUCTS_DETAILS_FAIL, PRODUCTS_DETAILS_SUCCESS,PRODUCTS_DETAILS_REQUEST, PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS } from "../constants/productConstants"
import axios from "axios";

/*Ürünler listelenirken talep,başarılı ve başarısız durumların try catch yöntemi ile gösterildiği kod satırı*/
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
/*Ürünlerin detay sayfasında talep,başarılı ve başarısız durumların try catch yöntemi ile gösterildiği kod satırı*/
export const detailsProduct = (productId) => async(dispatch) => {
    dispatch({type: PRODUCTS_DETAILS_REQUEST, payload:productId});
    try{
        const {data} = await axios.get(`/api/products/${productId}`);
        dispatch({type: PRODUCTS_DETAILS_SUCCESS,payload: data});
    } catch(error){
        dispatch({type:PRODUCTS_DETAILS_FAIL, payload:error.response && error.response.data.message ?
        error.response.data.message : error.message,});
    }
};