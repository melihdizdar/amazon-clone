import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    //token oluşturma
    return jwt.sign(
    {
        //tokende hangi bilgilerin bulunacağı belirlendi
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin
    }, 
        process.env.JWT_SECRET || 'somethingsecret', //.env JWT_SECRET=somethingsecret
        {
            expiresIn: '30d', //tokenin bekleme süresi 30 dakika
        }
    );
};