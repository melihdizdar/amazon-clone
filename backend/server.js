import http from 'http'; //62.Implement Live Chat 
import { Server } from 'socket.io'; //62.Implement Live Chat 
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config(); //token

const app = express();

app.use(express.json()); //token
app.use(express.urlencoded({extended:true})); //token

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/amazon',{
    //mongodb bağlantı kod satırı
    useUnifiedTopology: true,
    useNewUrlParser: true
});
app.use('/api/uploads', uploadRouter); //40.upload product image
app.use('/api/users', userRouter);
// api/users linkini userRouter'a bağladık
app.use('/api/products', productRouter);
// api/products linkini productRouter'a bağladık
app.use('/api/orders', orderRouter);
// api/orders linkini orderRoter'a bağladık
app.get('/api/config/paypal', (req,res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
    // 30.PayPal Button ekleme dersi -> 'sb' = sandbox
});
app.get('/api/config/google', (req, res) => {
    res.send(process.env.GOOGLE_API_KEY || '');//57.Choose Address on google map
});
const __dirname = path.resolve(); //40.upload product image
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))); //40.upload product image
//app.get('/',(req,res) => {
    //res.send('Server is ready');
    {/*npm start dedikten sonra http://localhost:5000 linkine girdiğin zaman backendin açıldığına dair gelecek yazı */}
//});

app.use((err,req,res,next) =>{
    res.status(500).send({message:err.message});
});
// mongodb'deki çeşitli hataların error mesajlarını gidermek için yazılan kod satırı

const port = process.env.PORT || 5000;

const httpServer = http.Server(app); //62.Implement Live Chat 
const io = new Server(httpServer, { cors: { origin: '*' } }); //62.Implement Live Chat 
const users = []; //62.Implement Live Chat 

io.on('connection', (socket) => { console.log('connection', socket.id); socket.on('disconnect', () => { //62.Implement Live Chat 
    const user = users.find((x) => x.socketId === socket.id); //62.Implement Live Chat 
    if (user) { //62.Implement Live Chat 
      user.online = false; //62.Implement Live Chat 
      console.log('Offline', user.name); //62.Implement Live Chat 
      const admin = users.find((x) => x.isAdmin && x.online); //62.Implement Live Chat 
      if (admin) { //62.Implement Live Chat 
        io.to(admin.socketId).emit('updateUser', user); //62.Implement Live Chat 
      }
    }
  });
  socket.on('onLogin', (user) => { //62.Implement Live Chat 
    const updatedUser = { ...user, online: true, socketId: socket.id, messages: [],}; //62.Implement Live Chat 
    const existUser = users.find((x) => x._id === updatedUser._id); //62.Implement Live Chat 
    if (existUser) {
      existUser.socketId = socket.id; //62.Implement Live Chat 
      existUser.online = true; //62.Implement Live Chat 
    } else {
      users.push(updatedUser); //62.Implement Live Chat 
    }
    console.log('Online', user.name); //62.Implement Live Chat 
    const admin = users.find((x) => x.isAdmin && x.online); //62.Implement Live Chat 
    if (admin) {
      io.to(admin.socketId).emit('updateUser', updatedUser); //62.Implement Live Chat 
    }
    if (updatedUser.isAdmin) {
      io.to(updatedUser.socketId).emit('listUsers', users); //62.Implement Live Chat 
    }
  });

  socket.on('onUserSelected', (user) => { //62.Implement Live Chat 
    const admin = users.find((x) => x.isAdmin && x.online); //62.Implement Live Chat 
    if (admin) { //62.Implement Live Chat 
      const existUser = users.find((x) => x._id === user._id); //62.Implement Live Chat 
      io.to(admin.socketId).emit('selectUser', existUser); //62.Implement Live Chat 
    }
  });

  socket.on('onMessage', (message) => { //62.Implement Live Chat 
    if (message.isAdmin) { //62.Implement Live Chat 
      const user = users.find((x) => x._id === message._id && x.online); //62.Implement Live Chat 
      if (user) { //62.Implement Live Chat 
        io.to(user.socketId).emit('message', message); //62.Implement Live Chat 
        user.messages.push(message); //62.Implement Live Chat 
      }
    } else {
      const admin = users.find((x) => x.isAdmin && x.online); //62.Implement Live Chat 
      if (admin) { //62.Implement Live Chat 
        io.to(admin.socketId).emit('message', message); //62.Implement Live Chat 
        const user = users.find((x) => x._id === message._id && x.online); //62.Implement Live Chat 
        user.messages.push(message); //62.Implement Live Chat 
      } else {
        io.to(socket.id).emit('message', { //62.Implement Live Chat 
          name: 'Admin', //62.Implement Live Chat 
          body: 'Sorry. I am not online right now', //62.Implement Live Chat 
        });
      }
    }
  });
});

httpServer.listen(port, () => { //62.Implement Live Chat 
  console.log(`Serve at http://localhost:${port}`); //62.Implement Live Chat 
});

//app.listen(5000,() =>{
    //console.log(`Serve at http://localhost:${port}`);
    {/*npm start dedikten sonra terminal'de yazacak mesaj */}
//});