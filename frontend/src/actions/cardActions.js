import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

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
            seller: data.seller, //49.Implement Seller View
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

export const saveShippingAddress = (data) => (dispatch) => {
    //girilen adresin sisteme kaydolmasını sağlayan kod satırı
    dispatch({type: CART_SAVE_SHIPPING_ADDRESS, payload:data});
    localStorage.setItem('shippingAddress', JSON.stringify(data));
}

export const savePaymentMethod = (data) => (dispatch) => {
    //girilen payment methodunun sisteme kaydolmasını sağlayan kod satırı
    dispatch({type: CART_SAVE_PAYMENT_METHOD, payload:data});
}