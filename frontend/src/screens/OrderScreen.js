import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
  // 30.PayPal Button ekleme dersi ve 31.Pay Order
  const orderId = props.match.params.id;
  const [sdkReady,setSdkReady] = useState(false); // 30.PayPal Button ekleme dersi
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin); //44.Deliver order
  const { userInfo } = userSignin; //44.Deliver order
  
  const orderPay = useSelector((state) => state.orderPay); // 31.Pay Order
  const { loading: loadingPay, error: errorPay, success: successPay } = orderPay; // 31.Pay Order
  const orderDeliver = useSelector((state) => state.orderPay); // 44.deliver order
  const { loading: loadingDeliver, error: errorDeliver, success: successDeliver } = orderDeliver; // 44.deliver order
  const dispatch = useDispatch();
  useEffect(() => { 
    const addPayPalScript = async () => { // 30.PayPal Button ekleme dersi
      const {data} = await axios.get('/api/config/paypal'); // 30.PayPal Button ekleme dersi
      const script = document.createElement('script'); // 30.PayPal Button ekleme dersi
      script.type='text/javascript'; // 30.PayPal Button ekleme dersi
      script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;// 30.PayPal Button ekleme dersi
      script.async = true; // 30.PayPal Button ekleme dersi
      script.onload = () => { // 30.PayPal Button ekleme dersi
        setSdkReady(true); // 30.PayPal Button ekleme dersi
      };
      document.body.appendChild(script);// 30.PayPal Button ekleme dersi
    };
    /*if(!order){ 30.PayPal Button ekleme dersi */
    //if(!order || successPay || (order && order._id !== orderId)){ // 31.Pay Order
      if(!order || successPay || successDeliver || (order && order._id !== orderId)){ //44.deliver order
      dispatch({type: ORDER_PAY_RESET}); // 31.Pay Order
      dispatch({type: ORDER_DELIVER_RESET}); //44.deliver order
      dispatch(detailsOrder(orderId)); // 30.PayPal Button ekleme dersi
    } else{ // 30.PayPal Button ekleme dersi
      if(!order.isPaid){ // 30.PayPal Button ekleme dersi
        if(!window.paypal){ // 30.PayPal Button ekleme dersi
          addPayPalScript(); // 30.PayPal Button ekleme dersi
        } else{ // 30.PayPal Button ekleme dersi
          setSdkReady(true); // 30.PayPal Button ekleme dersi
        }
      }
    }
  /* }, [dispatch, order,orderId,sdkReady]); 30.PayPal Button ekleme dersi */
  //}, [dispatch, order,orderId,sdkReady,successPay]); // 31.Pay Order
    }, [dispatch, order,orderId,sdkReady,successPay,successDeliver]); //44.Deliver order
  /* const successPaymentHandler = () => {}; // 30.PayPal Button ekleme dersi */
  const successPaymentHandler = (paymentResult) => { // 31.Pay Order
    dispatch(payOrder(order,paymentResult)); // 31.Pay Order
  };
  const deliverHandler = () => { //44.Deliver order
    dispatch(deliverOrder(order._id)); //44.Deliver order
  };
  return loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : (
    <div>
      <h1>Order {order._id}</h1>
      <div className="row top">
        <div className="col-2">
          <ul>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order.shippingAddress.fullName} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{' '}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </div>
                      </div>
                    </li>
                  ))}
                  {loadingDeliver && <LoadingBox/>}
                  {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                  {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                    <li>
                      <button type="button" className="primary block" onClick={deliverHandler}>Deliver Order</button>
                    </li>
                  )}
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  <div>${order.itemsPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>
                  <div>${order.shippingPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>${order.taxPrice.toFixed(2)}</div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>${order.totalPrice.toFixed(2)}</strong>
                  </div>
                </div>
              </li>
              {/*30.PayPal Button ekleme dersi*/}
                {!order.isPaid && ( 
                  <li>
                    {!sdkReady ? 
                    (
                      <LoadingBox/> ) : (
                    /* <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} /> //30.PayPal Button ekleme dersi */
                    <>
                      {errorPay && (
                      <MessageBox variant="danger">{errorPay}</MessageBox>)}
                      {loadingPay && <LoadingBox></LoadingBox>}
                      
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      ></PayPalButton>
                    </>   
                    )}
                  </li>
                )}
              {/*-----------------------------*/}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}