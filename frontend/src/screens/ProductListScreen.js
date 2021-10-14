import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams} from 'react-router-dom';
import { createProduct, deleteProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCT_CREATE_RESET, PRODUCT_DELETE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const { pageNumber = 1 } = useParams(); //59.Implement Pagination
  const sellerMode = props.match.path.indexOf('/seller') >= 0; //49.Implement Seller View
  const productList = useSelector((state) => state.productList); // 36.list products
  const { loading, error, products, page, pages } = productList; //59.Implement Pagination
  //const { loading, error, products } = productList; // 36.list products
  const productCreate = useSelector((state) => state.productCreate); //37.create product
  const { loading:loadingCreate, error: errorCreate, success:successCreate, product:createdProduct } = productCreate; //37.create product
  const productDelete = useSelector((state) => state.productDelete); //41.delete product
  const {loading: loadingDelete,error: errorDelete,success: successDelete,} = productDelete; //41.delete product
  const userSignin = useSelector((state) => state.userSignin); //49.Implement Seller View
  const { userInfo } = userSignin; //49.Implement Seller View
  const dispatch = useDispatch();  // 36.list products
  useEffect(() => { // 36.list products
    if(successCreate){ //37.create product
      dispatch({type:PRODUCT_CREATE_RESET}); //37.create product
      props.history.push(`/product/${createdProduct._id}/edit`); //37.create product
    }
    if (successDelete) { //41.delete product
      dispatch({ type: PRODUCT_DELETE_RESET }); //41.delete product
    }
    dispatch(listProducts({ seller: sellerMode ? userInfo._id : '', pageNumber })); //59.Implement Pagination
    //dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' })); //49.Implement Seller View
    //dispatch(listProducts()); // 36.list products
  }, [createdProduct,dispatch,props.history,sellerMode,successCreate,successDelete,userInfo._id,pageNumber]); //59.Implement Pagination
  //}, [createdProduct,dispatch,props.history,sellerMode,successCreate,successDelete,userInfo._id]); //49.Implement Seller View
  //}, [createdProduct, dispatch, props.history, successCreate, successDelete]); //41.delete product
  //}, [createdProduct,dispatch,props.history,successCreate]); //37.create product
  //}, [dispatch]); // 36.list products
  const deleteHandler = (product) => { // 36.list products
    if (window.confirm('Are you sure to delete?')) {
      dispatch(deleteProduct(product._id)); //41.delete product
    }
  };
  const createHandler = () => { //37.create product
    dispatch(createProduct()); //37.create product
  }
  return (
    <div>
      <div className="row">
        <h1>Products</h1>
        <button type="button" className="primary" onClick={createHandler}>
          Create Product
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
      {loadingCreate && <LoadingBox/>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? ( <LoadingBox/>) : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : 
      (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>PRICE</th>
                <th>CATEGORY</th>
                <th>BRAND</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <button type="button" className="small" onClick={() =>props.history.push(`/product/${product._id}/edit`)}>
                      Edit
                    </button>
                    <button type="button" className="small" onClick={() => deleteHandler(product)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="row center pagination"> {/*59.Implement Pagination*/}
            {[...Array(pages).keys()].map((x) => (
              <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={`/productlist/pageNumber/${x + 1}`}>{x + 1}</Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}