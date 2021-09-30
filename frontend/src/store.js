import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderMineListReducer, orderPayReducer } from './reducers/orderReducers';
import { productListReducer,productDetailsReducer } from "./reducers/productReducers";
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';

/*react-redux kısmındaki store kısmını açma komutları*/

const initialState = { //sayfa refreshlendiği zaman bilgilerin kaybolmamasını sağlar
    userSignin:{
        userInfo: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')): null,
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')):[],
        shippingAddress : localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress'))
        : {}, //Shipping address'de girdiğin bilgilerin kaybolmaması için kullanılan kod
        paymentMethod: 'PayPal',
    },
};
const reducer = combineReducers({
    // reducerların tanımlandığı kod satırları
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMineList: orderMineListReducer, 
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;