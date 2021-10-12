import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props) {
  const { name = 'all' } = useParams(); //53.Create Search Box and Search Screen
  const dispatch = useDispatch(); //53.Create Search Box and Search Screen
  const productList = useSelector((state) => state.productList); //53.Create Search Box and Search Screen
  const { loading, error, products } = productList; //53.Create Search Box and Search Screen
  useEffect(() => { //53.Create Search Box and Search Screen
    dispatch(listProducts({ name: name !== 'all' ? name : '' })); //53.Create Search Box and Search Screen
  }, [dispatch, name]); //53.Create Search Box and Search Screen
  return (
    <div>
      <div className="row">
        {loading ? (<LoadingBox></LoadingBox>) 
        : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <div>{products.length} Results</div>
        )}
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <ul>
            <li>Category 1</li>
          </ul>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>) : error ? (  <MessageBox variant="danger">{error}</MessageBox>) : 
            (
                <>
                    {products.length === 0 && (
                        <MessageBox>No Product Found</MessageBox>
                    )}
                    <div className="row center">
                        {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}