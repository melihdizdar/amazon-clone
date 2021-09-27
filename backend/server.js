import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';

dotenv.config(); //token

const app = express();

app.use(express.json()); //token
app.use(express.urlencoded({extended:true})); //token

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon',{
    //mongodb bağlantı kod satırı
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.use('/api/users', userRouter);
// api/users linkini userRouter'a bağladık
app.use('/api/products', productRouter);
// api/products linkini productRouter'a bağladık
app.use('/api/orders', orderRouter);
// api/orders linkini orderRoter'a bağladık

app.get('/',(req,res) => {
    res.send('Server is ready');
    {/*npm start dedikten sonra http://localhost:5000 linkine girdiğin zaman backendin açıldığına dair gelecek yazı */}
});

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
});
// mongodb'deki çeşitli hataların error mesajlarını gidermek için yazılan kod satırı

const port = process.env.PORT || 5000;
app.listen(5000,() =>{
    console.log(`Serve at http://localhost:${port}`);
    {/*npm start dedikten sonra terminal'de yazacak mesaj */}
});