import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList); //42.list orders
    const { loading,error,orders } = orderList; //42.list orders
    const dispatch = useDispatch(); //42.list orders
    useEffect(() => { //42.list orders
        dispatch(listOrders()); //42.list orders
    }, [dispatch]); //42.list orders
    const deleteHandler = (order) => { //42.list orders
        //delete handler
    };
    return (
        <div>
            <div>
            <h1>Orders</h1>
            {loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
            (
                <table className="table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>USER</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0, 10)}</td>
                        <td>${order.totalPrice.toFixed(2)}</td>
                        <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                        <td>
                        {order.isDelivered? order.deliveredAt.substring(0, 10) : 'No'}
                        </td>
                        <td>
                            <button type="button" className="small" onClick={() => { 
                            props.history.push(`/order/${order._id}`);
                            }}>
                            Details
                            </button>
                            <button type="button" className="small" onClick={() => deleteHandler(order)}>
                                Delete
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            )}
            </div>
        </div>
    )
}