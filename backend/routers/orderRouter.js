import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import { isAdmin, isAuth, isSellerOrAdmin, mailgun, payOrderEmailTemplate, } from "./utils.js";
import User from '../models/userModel.js';
import Product from '../models/productModel.js';

const orderRouter = express.Router();

//orderRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //42.list orders
orderRouter.get('/',isAuth,isSellerOrAdmin,expressAsyncHandler(async (req, res) => { //49.Implement Seller View
    //const orders = await Order.find({}).populate('user', 'name');
    const seller = req.query.seller || ''; //49.Implement Seller View
    const sellerFilter = seller ? { seller } : {}; //49.Implement Seller View
    const orders = await Order.find({ ...sellerFilter }).populate('user','name'); //49.Implement Seller View
    res.send(orders);
  })
);

orderRouter.get('/summary',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //61.Create dashboard screen
    const orders = await Order.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: '$totalPrice' },
        },
      },
    ]);
    const users = await User.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          sales: { $sum: '$totalPrice' },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          cout: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  })
);

orderRouter.post('/', isAuth, expressAsyncHandler(async(req,res) => {
    if(req.body.orderItems.length === 0){
        res.status(400).sen({message: 'Cart is empty'});
    }
    else {
        const order = new Order({
            seller: req.body.orderItems[0].seller, //49.Implement Seller View
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id,
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'New Order Created', order:createdOrder});
    }
}));

orderRouter.get('/mine',isAuth,expressAsyncHandler(async (req, res) => { // 32.Display Orders History
  const orders = await Order.find({ user: req.user._id });
  res.send(orders);})
);

orderRouter.get('/:id',isAuth,expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put('/:id/pay'),isAuth,expressAsyncHandler(async (req,res) => {
  // 31.burda order işlemi yapılınca olan kullanılacak değerlerin tanımlamaları yapıldı
  //const order = await Order.findById(req.params.id);
  const order = await Order.findById(req.params.id).populate( 'user', 'email name'); //60.Email order receipt
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };
    const updatedOrder = await order.save();
    mailgun().messages().send( //60.Email order receipt
      {
        from: 'Amazon <amazon@mg.yourdomain.com>', //60.Email order receipt
        to: `${order.user.name} <${order.user.email}>`, //60.Email order receipt
        subject: `New order ${order._id}`, //60.Email order receipt
        html: payOrderEmailTemplate(order), //60.Email order receipt
      },
      (error, body) => { //60.Email order receipt
        if (error) { //60.Email order receipt
          console.log(error); //60.Email order receipt
        } else {
          console.log(body); //60.Email order receipt
        }
      }
    );
    res.send({message: 'Order Paid', order: updatedOrder});
  } else {
    res.status(404).send({message: 'Order Not Found'});
  }
});

orderRouter.delete('/:id', isAuth , isAdmin, expressAsyncHandler(async(req,res) => { //43.delete orders
  const order = await Order.findById(req.params.id);
  if(order){
    const deleteOrder = await order.remove();
    res.send({message: 'Order Deleted', order:deleteOrder});
  } else {
    res.status(404).send({message:'Order Not Found'});
  }
}));

orderRouter.put('/:id/deliver'),isAuth,expressAsyncHandler(async (req,res) => { //44.deliver order
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.send({message: 'Order Delivered', order: updatedOrder});
  } else {
    res.status(404).send({message: 'Order Not Found'});
  }
});


export default orderRouter;