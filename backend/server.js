import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products/:id', (req,res) =>{
    {/*Ürünlerin detaylarının backend'e bağlandığını gösteren kod satırı*/}
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: 'Product not Found'});
    }
});

app.get('/api/products',(req,res) => {
    res.send(data.products);
    {/*Ürünlerin listelenmesinin backend'e bağlandığını gösteren kod satırı*/}
});

app.get('/',(req,res) => {
    res.send('Server is ready');
    {/*npm start dedikten sonra http://localhost:5000 linkine girdiğin zaman backendin açıldığına dair gelecek yazı */}
});
const port = process.env.PORT || 5000;
app.listen(5000,() =>{
    console.log(`Serve at http://localhost:${port}`);
    {/*npm start dedikten sonra terminal'de yazacak mesaj */}
});