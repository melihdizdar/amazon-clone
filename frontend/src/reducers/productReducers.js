const{
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
} = require('../constants/productConstants');

export const productListReducer = (state = { loading:true, products:[] },action) => {
    /*
        Ürünlerin talep edildiği durumda yükleme ekranının çıkacağını,
        başarılı durumda yükleme ekranın çıkmayıp ürünlerin yayınlanacağını,
        başarısız durumda error mesajı geleceğini tanımladık.
    */
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
    /*
        Ürüne tıklanıldığı zaman ürün detayları sayfası gelirken öncesinde yükleme ekranının geleceğini,
        başarılı olduğu taktirde loading ekranının gelmeyip ürünlerin detay sayfasına girileceğini,
        başarısız durumda loading olmayacağı ve error mesajının geleceği tanımlanır.
    */
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