import { CART_ADD_ITEM, CART_ADD_ITEM_FAIL, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[]},action) =>{
    /*redux içine sepetteki itemlerin eklemesini ve silinesini ekledik.*/
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const existItem = state.cartItems.find(x => x.product === item.product);
            if(existItem){
                return{
                    ...state,
                    error: '', //52.Force order items from one seller
                    cartItems: state.cartItems.map(x => x.product === existItem.product? item: x),
                };
            } else{
                //return {...state,cartItems:[...state.cartItems,item]};
                return {...state,error: '',cartItems:[...state.cartItems,item]}; //52.Force order items from one seller
            }
        case CART_REMOVE_ITEM:
            return {...state,cartItems: state.cartItems.filter(x => x.product !== action.payload),
            };
        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress: action.payload};
        case CART_SAVE_PAYMENT_METHOD:
            return {...state, paymentMethod: action.payload};
        case CART_ADD_ITEM_FAIL: //52.Force order items from one seller
            return { ...state, error: action.payload }; //52.Force order items from one seller
        case CART_EMPTY:
            //return {...state, cartItems: [] };
            return { ...state, error: '', cartItems: [] }; //52.Force order items from one seller
    default:
        return state;
    }
}