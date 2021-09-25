import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from './utils.js';

const userRouter = express.Router();

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
                token: generateToken(user),
            });
            return;
        }
        res.status(401).send({message: 'Invalid email or password'}); //başarısız olursa verilecek mesaj
    }
}));

export default userRouter;