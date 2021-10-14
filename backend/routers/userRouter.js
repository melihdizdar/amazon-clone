import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken, isAdmin, isAuth } from './utils.js';

const userRouter = express.Router();

userRouter.get('/top-sellers',expressAsyncHandler(async (req, res) => { //51.Add Top Seller Carousel
    const topSellers = await User.find({ isSeller: true }) .sort({ 'seller.rating': -1 }) .limit(3); //51.Add Top Seller Carousel
    res.send(topSellers); //51.Add Top Seller Carousel
  })
);

userRouter.get('/seed', expressAsyncHandler(async(req,res) =>{
    //Kullanıcıların seedinin yollanması için gereken kod satırı
    //await User.remove({});
    const createdUsers = await User.insertMany(data.users);
    res.send({createdUsers});
}));

userRouter.post('/signin', expressAsyncHandler(async (req,res) =>{
    const user = await User.findOne({email: req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password, user.password)){
            res.send({
                //email girişinde doğrulanacak kişi bilgileri
                _id:user._id,
                name: user.name,
                email : user.email,
                isAdmin: user.isAdmin,
                isSeller: user.isSeller, //49.Implement Seller View
                token: generateToken(user),
            });
            return;
        }
        res.status(401).send({message: 'Invalid email or password'}); //başarısız olursa verilecek mesaj
    }
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
      const user = new User({name: req.body.name,email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
      });
      const createdUser = await user.save();
      res.send({
        //kayıt işleminde doğrulanacak kişi bilgileri
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        isSeller: user.isSeller, //49.Implement Seller View
        token: generateToken(createdUser),
      });
    })
  );

userRouter.get('/:id', expressAsyncHandler(async(req,res) => { // 33.display user profile
  const user = await User.findById(req.params.id);
  if(user) {
    res.send(user);
  } else {
    res.status(404).send({message: 'User Not Found'});
  }
}));

userRouter.put('/profile',isAuth,expressAsyncHandler(async (req, res) => { //34.Update user profile
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
    if (user.isSeller) { //49.Implement Seller View
      user.seller.name = req.body.sellerName || user.seller.name; //49.Implement Seller View
      user.seller.logo = req.body.sellerLogo || user.seller.logo; //49.Implement Seller View
      user.seller.description = req.body.sellerDescription || user.seller.description; //49.Implement Seller View
    }
    if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        isSeller: user.isSeller, //49.Implement Seller View
        token: generateToken(updatedUser),
      });
    }
  })
);

userRouter.get('/',isAuth,isAdmin,expressAsyncHandler(async(req,res) => { //46.list users
  const users = await User.find({});
  res.send(users);
}));

userRouter.delete('/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //47.delete user
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'admin@example.com') {
        res.status(400).send({ message: 'Can Not Delete Admin User' });
        return;
      }
      const deleteUser = await user.remove();
      res.send({ message: 'User Deleted', user: deleteUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put('/:id',isAuth,isAdmin,expressAsyncHandler(async (req, res) => { //48.Edit Users
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isSeller = Boolean(req.body.isSeller); //58.Bugfix runnig locally without issue
      user.isAdmin = Boolean(req.body.isAdmin); //58.Bugfix runnig locally without issue
      //user.isSeller = req.body.isSeller === user.isSeller ? user.isSeller : req.body.isSeller;
      //user.isAdmin = req.body.isAdmin === user.isAdmin ? user.isAdmin : req.body.isAdmin;
      //user.isSeller = req.body.isSeller || user.isSeller; => check buttonlar güncellendikten sonra tekrardan değiştirilemiyor
      //user.isAdmin = req.body.isAdmin || user.isAdmin; => check buttonlar güncellendikten sonra tekrardan değiştirilemiyor
      const updatedUser = await user.save();
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;