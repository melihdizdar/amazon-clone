import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name:'Melih',
            email:'admin@example.com',
            password: bcrypt.hashSync('admin123',8),
            isAdmin:true,
            isSeller:true, //58.Bugfix runnig locally without issue
            seller: {
                name: 'Puma', //58.Bugfix runnig locally without issue
                logo: '/images/logo1.png', //58.Bugfix runnig locally without issue
                description: 'best seller', //58.Bugfix runnig locally without issue
                rating: 4.5, //58.Bugfix runnig locally without issue
                numReviews: 120, //58.Bugfix runnig locally without issue
                },
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