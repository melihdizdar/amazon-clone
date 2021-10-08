import axios from 'axios';
import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (productId,qty) => async(dispatch,getState) =>{
    /*burda sepete ürün eklediğimiz zaman data.js den hangi verilerin çekileceğini tanımlayıp 
    linkleme işleminin hangi idden çekileceğini ayarladık.*/
    /*Sepete ürün aktarma aksiyonu*/
    const {data} = await axios.get(`/api/products/${productId}`);
    const {cart:{cartItems},} = getState(); //52.Force order items from one seller
    if (cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id) { //52.Force order items from one seller
        dispatch({ //52.Force order items from one seller
            type: CART_ADD_ITEM_FAIL, //52.Force order items from one seller
            payload: `Can't Add To Cart. Buy only from ${cartItems[0].seller.seller.name} in this order`, //52.Force order items from one seller
        });
    }
    else{
        dispatch({ //52.Force order items from one seller
        type: CART_ADD_ITEM, //52.Force order items from one seller
        payload:{ //52.Force order items from one seller
            name: data.name, //52.Force order items from one seller
            image: data.image, //52.Force order items from one seller
            price: data.price, //52.Force order items from one seller
            coutInStock: data.coutInStock, //52.Force order items from one seller
            product: data._id, //52.Force order items from one seller
            seller: data.seller, //52.Force order items from one seller
            qty, //52.Force order items from one seller
        },
    });
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems)); //52.Force order items from one seller
    }
    /*dispatch({
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
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems));*/
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