import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { detailsUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SellerScreen(props) {
  const sellerId = props.match.params.id; //50.Create Seller Page
  const userDetails = useSelector((state) => state.userDetails); //50.Create Seller Page
  const { loading, error, user } = userDetails; //50.Create Seller Page

  const productList = useSelector((state) => state.productList); //50.Create Seller Page
  const { loading: loadingProducts, error: errorProducts, products, } = productList; //50.Create Seller Page

  const dispatch = useDispatch(); //50.Create Seller Page
  useEffect(() => { //50.Create Seller Page
    dispatch(detailsUser(sellerId)); //50.Create Seller Page
    dispatch(listProducts({ seller: sellerId })); //50.Create Seller Page
  }, [dispatch, sellerId]); //50.Create Seller Page
  return (
    <div className="row top">
      <div className="col-1">
        {loading ? (
          <LoadingBox/>) : error ? (  <MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img className="small" src={user.seller.logo} alt={user.seller.name}></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>
            <li>
              <Rating rating={user.seller.rating} numReviews={user.seller.numReviews}></Rating>
            </li>
            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        )}
      </div>
      <div className="col-3">
        {loadingProducts ? ( <LoadingBox/>) : errorProducts ? (  <MessageBox variant="danger">{errorProducts}</MessageBox>) : 
        (
          <>
            {products.length === 0 && <MessageBox>No Product Found</MessageBox>}
            <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}