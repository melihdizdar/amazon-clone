import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import { detailsProduct, updateProduct } from '../actions/productActions';
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

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
    const productUpdate = useSelector((state) => state.productUpdate); //39.update product
    const {loading: loadingUpdate,error: errorUpdate,success: successUpdate,} = productUpdate; //39.update product
    const dispatch = useDispatch(); //38.build product edit screen
    useEffect(() => { //38.build product edit screen
        //if(!product || (product._id !== productId)) { //38.build product edit screen
        if (successUpdate) {
            props.history.push('/productlist'); //39.update product
        }
        if (!product || product._id !== productId || successUpdate) { //39.update product
            dispatch({ type: PRODUCT_UPDATE_RESET }); //39.update product
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
    }, [product, dispatch, productId, successUpdate, props.history]); //39.update product
    //}, [product,dispatch,productId]); //38.build product edit screen
    const submitHandler = (e) => { //38.build product edit screen
        e.preventDefault(); //38.build product edit screen
        dispatch(updateProduct({_id: productId,name,price,image,category,brand,coutInStock,description,})); //39.update product
    };
    const [loadingUpload, setLoadingUpload] = useState(false); //40.upload product image
    const [errorUpload, setErrorUpload] = useState(''); //40.upload product image
  
    const userSignin = useSelector((state) => state.userSignin); //40.upload product image
    const { userInfo } = userSignin; //40.upload product image
    const uploadFileHandler = async (e) => { //40.upload product image
      const file = e.target.files[0]; //40.upload product image
      const bodyFormData = new FormData(); //40.upload product image
      bodyFormData.append('image', file); //40.upload product image
      setLoadingUpload(true); //40.upload product image
      try {
        const { data } = await axios.post('/api/uploads', bodyFormData, { //40.upload product image
          headers: { //40.upload product image
            'Content-Type': 'multipart/form-data', //40.upload product image
            Authorization: `Bearer ${userInfo.token}`, //40.upload product image
          },
        });
        setImage(data); //40.upload product image
        setLoadingUpload(false); //40.upload product image
      } catch (error) { //40.upload product image
        setErrorUpload(error.message); //40.upload product image
        setLoadingUpload(false); //40.upload product image
      }
    };
    return (
        <div>
            <form className="form" onSubmit={submitHandler}>
                <div>
                <h1>Edit Product {productId}</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
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
                            <label htmlFor="imageFile">Image File</label>
                            <input type="file" id="imageFile" label="Choose Image" onChange={uploadFileHandler}></input>
                            {loadingUpload && <LoadingBox></LoadingBox>}{errorUpload && (
                            <MessageBox variant="danger">{errorUpload}</MessageBox>)}
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
