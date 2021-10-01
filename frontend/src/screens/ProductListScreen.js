import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { PRODUCTS_CREATE_RESET } from '../constants/productConstants';

export default function ProductListScreen(props) {
  const productList = useSelector((state) => state.productList); // 36.list products
  const { loading, error, products } = productList; // 36.list products
  const productCreate = useSelector((state) => state.productCreate); //37.create product
  const { loading:loadingCreate, error: errorCreate, success:successCreate, product:createdProduct } = productCreate; //37.create product
  const dispatch = useDispatch();  // 36.list products
  useEffect(() => { // 36.list products
    if(successCreate){ //37.create product
      dispatch({type:PRODUCTS_CREATE_RESET}); //37.create product
      props.history.push(`/product/${createdProduct._id}/edit`); //37.create product
    }
    dispatch(listProducts()); // 36.list products
  }, [createdProduct,dispatch,props.history,successCreate]); //37.create product
  //}, [dispatch]); // 36.list products
  const deleteHandler = () => { // 36.list products
    /// dispatch delete action
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
      {loadingCreate && <LoadingBox/>}
      {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}
      {loading ? ( <LoadingBox/>) : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : 
      (
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
      )}
    </div>
  );
}