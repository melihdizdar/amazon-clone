import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function ProductEditScreen(props) {
    const productId = props.match.params.id; //38.build product edit screen
    const [name,setName] = useState(''); //38.build product edit screen
    const [price,setPrice] = useState(''); //38.build product edit screen
    const [image,setImage] = useState(''); //38.build product edit screen
    const [category,setCategory] = useState(''); //38.build product edit screen
    const [coutInStock,setCoutInStock] = useState(''); //38.build product edit screen
    const [brand,setBrand] = useState(''); //38.build product edit screen
    const [description,setDescription] = useState(''); //38.build product edit screen

    const productDetails = useSelector((state) => state.productDetails); //38.build product edit screen
    const { loading,error,product } = productDetails; //38.build product edit screen
    const dispatch = useDispatch(); //38.build product edit screen
    useEffect(() => { //38.build product edit screen
        if(!product || (product._id !== productId)) { //38.build product edit screen
            dispatch(detailsProduct(productId)); //38.build product edit screen    
        } else {
            setName(product.name); //38.build product edit screen
            setPrice(product.price); //38.build product edit screen
            setImage(product.image); //38.build product edit screen
            setCategory(product.category); //38.build product edit screen
            setCoutInStock(product.coutInStock); //38.build product edit screen
            setBrand(product.brand); //38.build product edit screen
            setDescription(product.description); //38.build product edit screen
        }
    }, [product,dispatch,productId]); //38.build product edit screen
    const submitHandler = (e) => { //38.build product edit screen
        e.preventDefault(); //38.build product edit screen
        // dispatch update product
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                <h1>Edit Product {productId}</h1>
                </div>
                {loading ? (<LoadingBox/>) : error ? (<MessageBox variant="danger">{error}</MessageBox>) : 
                (
                    <>
                        <div>
                            <label htmlFor="name">Name</label>
                            <input id="name" type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="price">Price</label>
                            <input id="price" type="text" placeholder="Enter price" value={price} onChange={(e) => setPrice(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="image">Image</label>
                            <input id="image" type="text" placeholder="Enter image" value={image} onChange={(e) => setImage(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="category">Category</label>
                            <input id="category" type="text" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="brand">Brand</label>
                            <input id="brand" type="text" placeholder="Enter brand" value={brand} onChange={(e) => setBrand(e.target.value)} ></input>
                        </div>
                        <div>
                            <label htmlFor="coutInStock">Count In Stock</label>
                            <input id="coutInStock" type="text" placeholder="Enter countInStock" value={coutInStock} onChange={(e) => setCoutInStock(e.target.value)}></input>
                        </div>
                        <div>
                            <label htmlFor="description">Description</label>
                            <textarea id="description" rows="3" type="text" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label></label>
                            <button className="primary" type="submit">Update</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    )
}
