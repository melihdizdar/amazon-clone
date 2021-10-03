import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    //token oluşturma
    return jwt.sign(
    {
        //tokende hangi bilgilerin bulunacağı belirlendi
        _id: user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        isSeller: user.isSeller, //49.Implement Seller View
    }, 
        process.env.JWT_SECRET || 'somethingsecret', //.env JWT_SECRET=somethingsecret
        {
            expiresIn: '30d', //tokenin bekleme süresi 30 dakika
        }
    );
};

export const isAuth = (req,res,next) => {
    const authorization = req.headers.authorization;
    if(authorization){
        const token = authorization.slice(7,authorization.length); // Bearer XXXXXX
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err,decode) => {
          if(err){
              res.status(401).send({message:'Invalid Token'});
          } else{
              req.user = decode;
              next();
          }
        })
    } else{
        res.status(401).send({message:'No Token'});
    }
}

export const isAdmin = (req,res,next) => { //35.create admin view
    if(req.user && req.user.isAdmin){
        next();
    } else {
        res.status(401).send({message:'Invalid Admin Token'});
    }
}

export const isSeller = (req,res,next) => { //49.Implement Seller View
    if(req.user && req.user.isSeller){
        next();
    } else {
        res.status(401).send({message:'Invalid Seller Token'});
    }
}

export const isSellerOrAdmin = (req,res,next) => { //49.Implement Seller View
    if(req.user && (req.user.isSeller || req.user.isAdmin)){
        next();
    } else {
        res.status(401).send({message:'Invalid Admin/Seller Token'});
    }
}