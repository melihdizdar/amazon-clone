const{
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
} = require('../constants/productConstants');

export const productListReducer = (state = { loading:true, products:[] },action) => {
    switch(action.type){
        case PRODUCTS_LIST_REQUEST:
            return{loading:true};
        case PRODUCTS_LIST_SUCCESS:
            return{loading:false,products: action.payload};
        case PRODUCTS_LIST_FAIL:
            return{loading:false,error:action.payload};
        default:
            return state;
    }
}

export const productDetailsReducer = (state = {product:{},loading:true},action) => {
    switch(action.type){
        case PRODUCTS_DETAILS_REQUEST:
            return {loading:true};
        case PRODUCTS_DETAILS_SUCCESS:
            return{loading:false,product:action.payload};
        case PRODUCTS_DETAILS_FAIL:
            return {loading:false,error: action.payload}
        default:
            return state
    }
};