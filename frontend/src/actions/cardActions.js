import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";

export const addToCart = (productId,qty) => async(dispatch,getState) =>{
    /*burda sepete ürün eklediğimiz zaman data.js den hangi verilerin çekileceğini tanımlayıp 
    linkleme işleminin hangi idden çekileceğini ayarladık.*/
    /*Sepete ürün aktarma aksiyonu*/
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            coutInStock: data.coutInStock,
            product: data._id,
            qty,
        },
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (productId) => (dispatch,getState) => {
    /*burda sepetteki ürünün silinme aksiyonu gerçekleşiyor.*/
    dispatch({type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems',JSON.stringify(getState().cartItems));
};