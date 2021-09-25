import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) =>{
    //Products listelenmesi için kullanılan kod satırı
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed',expressAsyncHandler(async(req,res) =>{
    //Products seedinin yollanması için gereken kod satırı
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));

productRouter.get('/:id',expressAsyncHandler(async(req,res) =>{
    //Products List seedinin yollanması için gereken kod satırı
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found'});
    }
}))

export default productRouter;