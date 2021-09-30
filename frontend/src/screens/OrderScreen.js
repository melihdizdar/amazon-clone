import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderScreen(props) {
  const orderId = props.match.params.id;
  const [sdkReady,setSdkReady] = useState(false); // 30.PayPal Button ekleme dersi
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
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
    if(!order){ // 30.PayPal Button ekleme dersi
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
  }, [dispatch, order,orderId,sdkReady]); // 30.PayPal Button ekleme dersi
  const successPaymentHandler = () => { // 30.PayPal Button ekleme dersi
    // TODO: dispatch pay order
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
                      <LoadingBox/> ) : ( <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
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