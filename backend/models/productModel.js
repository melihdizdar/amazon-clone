import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({ //56.Rate and Review Products
    name: {type:String, required:true}, //56.Rate and Review Products
    comment: {type:String, required:true}, //56.Rate and Review Products
    rating: {type:Number, required:true}, //56.Rate and Review Products
},{
    timestamps:true, //56.Rate and Review Products
})
//backend/data.js'deki products dizisindeki verilerin tanımlanması için kullanılan kod satırı.

const productSchema = new mongoose.Schema({
    name: {type:String,required:true,unique:true},
    seller: { type: mongoose.Schema.Types.ObjectID, ref: 'User' }, //49.Implement Seller View
    image: {type:String,required:true},
    brand: {type:String,required:true},
    category: {type:String,required:true},
    description: {type:String,required:true},
    price: {type:Number,required:true},
    coutInStock: {type:Number,required:true},
    rating: {type:Number,required:true},
    numReviews: {type:Number,required:true},
    reviews:[reviewSchema], //56.Rate and Review Products
},{
    timestamps:true,
})

const Product = mongoose.model('Product', productSchema);

export default Product;