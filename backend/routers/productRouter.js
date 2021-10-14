import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import User from '../models/userModel.js'; //58.Bugfix runnig locally without issue
import { isAuth , isAdmin , isSellerOrAdmin  } from './utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req,res) =>{
    //Products listelenmesi için kullanılan kod satırı
    //const products = await Product.find({});
    const pageSize = 3; //59.Implement Pagination
    const page = Number(req.query.pageNumber) || 1; //59.Implement Pagination
    const name = req.query.name || ''; //53.Create Search Box and Search Screen
    const category = req.query.category || ''; //54.Add Category Sidebar and Filter
    const nameFilter = name ? { name: { $regex:name , $options:'i' } } : {}; //53.Create Search Box and Search Screen
    const seller = req.query.seller || ''; //49.Implement Seller View
    const order = req.query.order || ''; //55.Sort and filter product
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min) : 0; //55.Sort and filter product
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max) : 0; //55.Sort and filter product
    const rating = req.query.rating && Number(req.query.rating) !== 0 ? Number(req.query.rating) : 0; //55.Sort and filter product

    const sellerFilter = seller ? { seller } : {}; //49.Implement Seller View
    const categoryFilter = category ? { category } : {}; //54.Add Category Sidebar and Filter
    const priceFilter = min && max ? { price: { $gte: min, $lte: max } } : {}; //55.Sort and filter product
    const ratingFilter = rating ? { rating: { $gte: rating } } : {}; //55.Sort and filter product
    const sortOrder = order === 'lowest' ? { price: 1 } : order === 'highest' ? { price: -1 } : order === 'toprated' ? { rating: -1 } : { _id: -1 }; //55.Sort and filter product
    const count = await Product.count({...sellerFilter,...nameFilter,...categoryFilter,...priceFilter,...ratingFilter,}); //59.Implement Pagination
    //const products = await Product.find({ ...sellerFilter }); //49.Implement Seller View
    //const products = await Product.find({ ...sellerFilter }).populate('seller','seller.name seller.logo'); //50.Create Seller Page
    //const products = await Product.find({ ...sellerFilter,...nameFilter }).populate('seller','seller.name seller.logo');  //53.Create Search Box and Search Screen
    //const products = await Product.find({ ...sellerFilter,...nameFilter,...categoryFilter }).populate('seller','seller.name seller.logo'); //54.Add Category Sidebar and Filter
    //const products = await Product.find({ ...sellerFilter,...nameFilter,...categoryFilter,...priceFilter,...ratingFilter, }).populate('seller','seller.name seller.logo').sort(sortOrder); //55.Sort and filter product
    const products = await Product.find({ ...sellerFilter,...nameFilter,...categoryFilter,...priceFilter,...ratingFilter, }).populate('seller','seller.name seller.logo').sort(sortOrder).skip(pageSize * (page - 1)).limit(pageSize); //59.Implement Pagination
    res.send({ products, page, pages: Math.ceil(count / pageSize) }); //59.Implement Pagination
    //res.send(products);
}));

productRouter.get('/categories', expressAsyncHandler(async (req,res) => { //54.Add Category Sidebar and Filter
  const categories = await Product.find().distinct('category'); //54.Add Category Sidebar and Filter
  //Yukarıdaki kodun amacı categories'i tanımlarken productlarda "category" kelimesini bulmaya yarayan kod.
  res.send(categories); //54.Add Category Sidebar and Filter
}));

productRouter.get('/seed',expressAsyncHandler(async(req,res) =>{
    //Products seedinin yollanması için gereken kod satırı
    //await Product.remove({});//
    //const createdProducts = await Product.insertMany(data.products);
    //res.send({createdProducts});
    const seller = await User.findOne({ isSeller: true }); //58.Bugfix runnig locally without issue
    if (seller) { //58.Bugfix runnig locally without issue
      const products = data.products.map((product) => ({...product,seller: seller._id,})); //58.Bugfix runnig locally without issue
      const createdProducts = await Product.insertMany(products); //58.Bugfix runnig locally without issue
      res.send({ createdProducts }); //58.Bugfix runnig locally without issue
    } else {
      res.status(500).send({ message: 'No seller found. first run /api/users/seed' }); //58.Bugfix runnig locally without issue
    }
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

productRouter.post('/:id/reviews',isAuth,expressAsyncHandler(async (req, res) => { //56.Rate and Review Products
    const productId = req.params.id; //56.Rate and Review Products
    const product = await Product.findById(productId); //56.Rate and Review Products
    if (product) { //56.Rate and Review Products
      if(product.reviews.find(x => x.name === req.user.name)){ //56.Rate and Review Products
        return res.status(400).send({message: 'You already submitted a review'}); //56.Rate and Review Products
      }
      const review = { //56.Rate and Review Products
        name: req.user.name, //56.Rate and Review Products
        rating:Number(req.body.rating), //56.Rate and Review Products
        comment:req.body.comment, //56.Rate and Review Products
      }; //56.Rate and Review Products
      product.reviews.push(review); //56.Rate and Review Products
      product.numReviews = product.reviews.length; //56.Rate and Review Products
      product.rating = product.reviews.reduce((a,c) => c.rating + a, 0) / product.reviews.length; //56.Rate and Review Products
      const updatedProduct = await product.save(); //56.Rate and Review Products
      res.status(201).send({ message: 'Review Created', review: updatedProduct.reviews[product.reviews.length - 1] }); //56.Rate and Review Products
    } else {
      res.status(404).send({ message: 'Product Not Found' }); //56.Rate and Review Products
    }
  })
);

export default productRouter;