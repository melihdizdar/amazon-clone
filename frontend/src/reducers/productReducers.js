const{
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
    PRODUCTS_LIST_FAIL,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAIL,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_RESET,
    PRODUCTS_CATEGORY_LIST_REQUEST,
    PRODUCTS_CATEGORY_LIST_SUCCESS,
    PRODUCTS_CATEGORY_LIST_FAIL,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_RESET,
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
            //return{loading:false,products: action.payload};
            return {loading: false,products: action.payload.products,pages: action.payload.pages,page: action.payload.page,}; //59.Implement Pagination
        case PRODUCTS_LIST_FAIL:
            return{loading:false,error:action.payload};
        default:
            return state;
    }
}

export const productCategoryListReducer = (state = { loading:true, products:[] },action) => { //54.Add Category Sidebar and Filter
  switch(action.type){
      case PRODUCTS_CATEGORY_LIST_REQUEST:
          return{loading:true};
      case PRODUCTS_CATEGORY_LIST_SUCCESS:
          return{loading:false,categories: action.payload};
      case PRODUCTS_CATEGORY_LIST_FAIL:
          return{loading:false,error:action.payload};
      default:
          return state;
  }
}

//export const productDetailsReducer = (state = {product:{},loading:true},action) => {
export const productDetailsReducer = (state = {loading:true},action) => { //38.build product edit screen
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

export const productCreateReducer = (state = {},action) => { //37.create product
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true};
        case PRODUCT_CREATE_SUCCESS:
            return{loading:false,success:true,product:action.payload};
        case PRODUCT_CREATE_FAIL:
            return {loading:false, error: action.payload}
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
};

export const productUpdateReducer = (state = {}, action) => { //39.update product
    switch (action.type) {
      case PRODUCT_UPDATE_REQUEST:
        return { loading: true };
      case PRODUCT_UPDATE_SUCCESS:
        return { loading: false, success: true };
      case PRODUCT_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      case PRODUCT_UPDATE_RESET:
        return {};
      default:
        return state;
    }
  };

export const productDeleteReducer = (state = {}, action) => {  //41.delete product
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {},action) => { //56.Rate and Review Products
  switch(action.type){
      case PRODUCT_REVIEW_CREATE_REQUEST:
          return {loading:true};
      case PRODUCT_REVIEW_CREATE_SUCCESS:
          return{loading:false,success:true,review:action.payload};
      case PRODUCT_REVIEW_CREATE_FAIL:
          return {loading:false, error: action.payload}
      case PRODUCT_REVIEW_CREATE_RESET:
          return {}
      default:
          return state
  }
};