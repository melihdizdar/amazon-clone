import { PRODUCTS_DETAILS_FAIL, PRODUCTS_DETAILS_SUCCESS,PRODUCTS_DETAILS_REQUEST, PRODUCTS_LIST_FAIL, PRODUCTS_LIST_REQUEST, PRODUCTS_LIST_SUCCESS, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_SUCCESS, PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCTS_CATEGORY_LIST_REQUEST, PRODUCTS_CATEGORY_LIST_SUCCESS, PRODUCTS_CATEGORY_LIST_FAIL } from "../constants/productConstants"
import axios from "axios";

/*Ürünler listelenirken talep,başarılı ve başarısız durumların try catch yöntemi ile gösterildiği kod satırı*/
//export const listProducts = () => async (dispatch) => {
//export const listProducts = ({ seller = '' }) => async (dispatch) => { //49.Implement Seller View
//export const listProducts = ({ seller = '' , name = ''}) => async (dispatch) => { //53.Create Search Box and Search Screen
export const listProducts = ({ seller = '' , name = '', category = ''}) => async (dispatch) => { //54.Add Category Sidebar and Filter
    dispatch({
        type: PRODUCTS_LIST_REQUEST
    });
    try{
        //const {data} = await axios.get('/api/products');
        //const { data } = await axios.get(`/api/products?seller=${seller}`); //49.Implement Seller View
        //const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}`); //53.Create Search Box and Search Screen
        const { data } = await axios.get(`/api/products?seller=${seller}&name=${name}&category=${category}`); //54.Add Category Sidebar and Filter
        dispatch({type: PRODUCTS_LIST_SUCCESS,payload:data});
    } catch(error){
        dispatch({type:PRODUCTS_LIST_FAIL,payload: error.message});
    }
};
export const listProductCategories = () => async (dispatch) => { //54.Add Category Sidebar and Filter
  dispatch({ //54.Add Category Sidebar and Filter
    type: PRODUCTS_CATEGORY_LIST_REQUEST, //54.Add Category Sidebar and Filter
  }); //54.Add Category Sidebar and Filter
  try {
    const { data } = await axios.get(`/api/products/categories`); //54.Add Category Sidebar and Filter
    dispatch({ type: PRODUCTS_CATEGORY_LIST_SUCCESS, payload: data }); //54.Add Category Sidebar and Filter
  } catch (error) { //54.Add Category Sidebar and Filter
    dispatch({ type: PRODUCTS_CATEGORY_LIST_FAIL, payload: error.message }); //54.Add Category Sidebar and Filter
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

export const createProduct = () => async (dispatch,getState) => { //37.create product
    dispatch({type: PRODUCT_CREATE_REQUEST});
    const { userSignin: {userInfo} } = getState();
    try {
        const { data } = await axios.post('/api/products', {} , {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({type: PRODUCT_CREATE_SUCCESS, payload: data.product, 
        });
    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type: PRODUCT_CREATE_FAIL, payload: message});
    }
}

export const updateProduct = (product) => async (dispatch, getState) => { //39.update product
    dispatch({ type: PRODUCT_UPDATE_REQUEST, payload: product });
    const {userSignin: { userInfo },} = getState();
    try {
      const { data } = await axios.put(`/api/products/${product._id}`, product, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPDATE_FAIL, error: message });
    }
  };

export const deleteProduct = (productId) => async (dispatch, getState) => {  //41.delete product
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: productId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    const { data } = axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload:data});
  } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_DELETE_FAIL, payload: message });
    }
  };