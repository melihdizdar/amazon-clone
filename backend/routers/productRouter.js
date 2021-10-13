import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAuth , isAdmin , isSellerOrAdmin  } from './utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) =>{
    //Products listelenmesi için kullanılan kod satırı
    //const products = await Product.find({});
    const name = req.query.name || ''; //53.Create Search Box and Search Screen
    const category = req.query.category || ''; //54.Add Category Sidebar and Filter
    const nameFilter = name ? { name: { $regex:name , $options:'i' } } : {}; //53.Create Search Box and Search Screen
    const seller = req.query.seller || ''; //49.Implement Seller View
    const sellerFilter = seller ? { seller } : {}; //49.Implement Seller View
    const categoryFilter = category ? { category } : {}; //54.Add Category Sidebar and Filter
    //const products = await Product.find({ ...sellerFilter }); //49.Implement Seller View
    //const products = await Product.find({ ...sellerFilter }).populate('seller','seller.name seller.logo'); //50.Create Seller Page
    //const products = await Product.find({ ...sellerFilter,...nameFilter }).populate('seller','seller.name seller.logo');  //53.Create Search Box and Search Screen
    const products = await Product.find({ ...sellerFilter,...nameFilter,...categoryFilter }).populate('seller','seller.name seller.logo');; //54.Add Category Sidebar and Filter
    res.send(products);
}));

productRouter.get('/categories', expressAsyncHandler(async (req,res) => { //54.Add Category Sidebar and Filter
  const categories = await Product.find().distinct('category'); //54.Add Category Sidebar and Filter
  //Yukarıdaki kodun amacı categories'i tanımlarken productlarda "category" kelimesini bulmaya yarayan kod.
  res.send(categories); //54.Add Category Sidebar and Filter
}));

productRouter.get('/seed',expressAsyncHandler(async(req,res) =>{
    //Products seedinin yollanması için gereken kod satırı
    //await Product.remove({});
    const createdProducts = await Product.insertMany(data.products);
    res.send({createdProducts});
}));

productRouter.get('/:id',expressAsyncHandler(async(req,res) =>{
    //Products List seedinin yollanması için gereken kod satırı
    //const product = await Product.findById(req.params.id);
    const product = await Product.findById(req.params.id).populate('seller','seller.name seller.logo seller.rating seller.numReviews'); //50.Create Seller Page
    if(product){
        res.send(product);
    }
    else{
        res.status(404).send({message: 'Product Not Found'});
    }
}))

//productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req,res) => { //37.create product
productRouter.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler(async(req,res) => {  //49.Implement Seller View
    const product = new Product({
        name:'sample name' + Date.now(),
        seller: req.user._id, //49.Implement Seller View
        image: '/images/p1.jpg',
        price: 0,
        category:'sample category',
        brand:'sample brand',
        coutInStock:0,
        rating:0,
        numReviews:0,
        description: 'sample description',
    });
    const createdProduct = await product.save();
    res.send({message:'Product Created', product: createdProduct});
}));

//productRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //39.update product
productRouter.put('/:id',isAuth,isSellerOrAdmin,expressAsyncHandler(async (req, res) => { //49.Implement Seller View
      const productId = req.params.id;
      const product = await Product.findById(productId);
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.category = req.body.category;
        product.brand = req.body.brand;
        product.coutInStock = req.body.coutInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        res.send({ message: 'Product Updated', product: updatedProduct });
      } else {
        res.status(404).send({ message: 'Product Not Found' });
      }
    })
  );

productRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //41.delete product
    const product = await Product.findById(req.params.id);
    if (product) {
      const deleteProduct = await product.remove();
      res.send({ message: 'Product Deleted', product: deleteProduct });
    } else {
      res.status(404).send({ message: 'Product Not Found' });
    }
  })
);
export default productRouter;