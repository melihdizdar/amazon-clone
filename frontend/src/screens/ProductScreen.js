import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { createReview, detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

export default function ProductScreen(props) {
    //Kullanılan fonksiyonların tanımlandığı kod satırları
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading,error,product} = productDetails;
    const userSignin = useSelector((state) => state.userSignin); //56.Rate and Review Products
    const { userInfo } = userSignin; //56.Rate and Review Products

    const productReviewCreate = useSelector((state) => state.productReviewCreate); //56.Rate and Review Products
    const {loading:loadingReviewCreate,error:errorReviewCreate,success:successReviewCreate} = productReviewCreate; //56.Rate and Review Products

    const [rating, setRating] = useState(0); //56.Rate and Review Products
    const [comment, setComment] = useState(''); //56.Rate and Review Products
    
    useEffect(() => {
        if(successReviewCreate){ //56.Rate and Review Products
            window.alert('Review Submitted Successfully'); //56.Rate and Review Products
            setRating(''); //56.Rate and Review Products
            setComment(''); //56.Rate and Review Products
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET}); //56.Rate and Review Products
        }
        dispatch(detailsProduct(productId));
    },[dispatch,productId,successReviewCreate]); //56.Rate and Review Products
    //},[dispatch,productId]);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
    const submitHandler = (e) => { //56.Rate and Review Products
        e.preventDefault(); //56.Rate and Review Products
        if(comment && rating) { //56.Rate and Review Products
            dispatch(createReview(productId, {rating,comment,name: userInfo.name})); //56.Rate and Review Products
        } else {
            alert('Please enter comment and rating'); //56.Rate and Review Products
        }
    }
    return (
        <div>
            {loading? <LoadingBox/> //Yükleme ekranın loading komutunda gösterileceğinin belirlendiği yer.
            :
            error? (<MessageBox variant="danger">{error}</MessageBox>
            ):(
                //Başarısız ekranın error komutunda gösterileceğinin belirlendiği yer.
        <div>
            <Link to="/">Back to result</Link>
            <div className="row top">
                <div className="col-2">
                    <img className="large" src={product.image} alt={product.name}/>
                    {/*ürünün resminin çekildiği satır.*/}
                </div>
                <div className="col-1">
                    <ul> {/*Product sayfasında seller bilgilerinin bulunduğu kısım*/}
                        <li>
                            <h1>{product.name}</h1> {/*ürünün adının çekildiği satır.*/}
                        </li>
                        <li>
                            <Rating rating={product.rating} numReviews={product.numReviews}/>
                            {/*ürünün ratinginin ve review kısmının çekildiği satır.*/}
                        </li>
                        <li>
                            Price : ${product.price} {/*ürünün fiyatının çekildiği satır.*/}
                        </li>
                        <li>Description:
                            <p>{product.description}</p> {/*ürünün açıklamasının çekildiği satır.*/}
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                Seller{' '}
                                <h2>
                                <Link to={`/seller/${product.seller._id}`}>
                                    {product.seller.seller.name}
                                </Link>
                                </h2>
                                <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews} ></Rating>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                    {/*ürünün fiyatının çekildiği satır.*/}
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.coutInStock > 0?(<span className="success">In Stock</span>):
                                        (<span className="danger">Unavailable</span>)}
                                        {/*ürünün coutinstock kısmı 0 dan büyük değil ise unavailable olarak gösterildiği satır.*/}
                                    </div>
                                </div>
                            </li>
                            {
                                //ürününü coutinstock kısmı 0'dan büyük ise aşağıdaki kod satırını uygula
                                product.coutInStock > 0 && (
                                <>
                                <li>
                                    <div className="row">
                                        <div>Qty</div>
                                        <div>
                                            <select value={qty} onChange={e => setQty(e.target.value)}>
                                                {/*coutinstock'da belirtildiği sayıya kadar 1 artırarak ulaş*/}
                                                {
                                                    [...Array(product.coutInStock).keys()].map((x) => (
                                                        <option key={x+1} value={x+1} > {x+1}</option>
                                                    )
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <button onClick={addToCartHandler} className="primary block">Add to Cart</button>
                                    {/*buttona basıldığı zaman addToCardHandler kısmına yönlendir.*/}
                                </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
            <div> {/*56.Rate and Review Products*/}
                <h2 id="reviews">Reviews</h2>
                {product.reviews.length === 0 && (
                <MessageBox>There is no review</MessageBox>
                )}
                <ul>
                {product.reviews.map((review) => (
                    <li key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating rating={review.rating} caption=" "></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                    </li>
                ))}
                <li>
                    {userInfo ? (
                    <form className="form" onSubmit={submitHandler}>
                        <div>
                            <h2>Write a customer review</h2>
                        </div>
                        <div>
                            <label htmlFor="rating">Rating</label>
                            <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
                                <option value="">Select...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fair</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very good</option>
                                <option value="5">5- Excelent</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="comment">Comment</label>
                            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                        </div>
                        <div>
                            <label />
                            <button className="primary" type="submit">Submit</button>
                        </div>
                        <div>
                            {loadingReviewCreate && <LoadingBox/>}
                            {errorReviewCreate && (<MessageBox variant="danger">{errorReviewCreate}</MessageBox>)}
                        </div>
                    </form>
                    ) : (
                    <MessageBox>Please <Link to="/signin">Sign In</Link> to write a review</MessageBox>
                    )}
                </li>
                </ul>
          </div>
        </div>    
            )} 
        </div>
    )
}
