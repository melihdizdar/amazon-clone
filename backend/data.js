import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'Melih',
            email:'admin@example.com',
            password: bcrypt.hashSync('admin123',8),
            isAdmin:true,
        },
        {
            name:'Ahmet',
            email:'user@example.com',
            password: bcrypt.hashSync('user123',8),
            isAdmin:false,
        }
    ],
    products:[
       {
           _id:'1',
           name:'Nike Slim Shirt',
           category:'Shirts',
           image:'/images/p1.jpg',
           price:120,
           coutInStock:10,
           brand:'Nike',
           rating:4.5,
           numReviews:10,
           description:'high quality product',
       },
       {
        _id:'2',
        name:'Adidas Slim Shirt',
        category:'Shirts',
        image:'/images/p2.jpg',
        price:100,
        coutInStock:20,
        brand:'Adidas',
        rating:4.0,
        numReviews:15,
        description:'high quality product',
    },
    {
        _id:'3',
        name:'Lacoste Free Shirt',
        category:'Shirts',
        image:'/images/p3.jpg',
        price:220,
        coutInStock:0,
        brand:'Lacoste',
        rating:4.8,
        numReviews:17,
        description:'high quality product',
    },
    {
        _id:'4',
        name:'Nike Slim Pant',
        category:'Pants',
        image:'/images/p4.jpg',
        price:78,
        coutInStock:15,
        brand:'Nike',
        rating:4.5,
        numReviews:14,
        description:'high quality product',
    },
    {
        _id:'5',
        name:'Puma Slim Pant',
        category:'Pants',
        image:'/images/p5.jpg',
        price:65,
        coutInStock:5,
        brand:'Puma',
        rating:4.5,
        numReviews:10,
        description:'high quality product',
    },
    {
        _id:'6',
        name:'Adidas Slim Pant',
        category:'Pants',
        image:'/images/p6.jpg',
        price:139,
        coutInStock:12,
        brand:'Adidas',
        rating:4.5,
        numReviews:15,
        description:'high quality product',
    },
    ]
}

export default data;