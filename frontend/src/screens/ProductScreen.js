import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { Link } from 'react-router-dom';
import { detailsProduct } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';

export default function ProductScreen(props) {
    //Kullanılan fonksiyonların tanımlandığı kod satırları
    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const [qty, setQty] = useState(1);
    const productDetails = useSelector((state) => state.productDetails);
    const {loading,error,product} = productDetails;
    
    useEffect(() => {
        dispatch(detailsProduct(productId));
    },[dispatch,productId]);
    const addToCartHandler = () =>{
        props.history.push(`/cart/${productId}?qty=${qty}`);
    };
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
                            Seller{' '}
                            <h2>
                            <Link to={`/seller/${product.seller._id}`}>
                                {product.seller.seller.name}
                            </Link>
                            </h2>
                            <Rating rating={product.seller.seller.rating} numReviews={product.seller.seller.numReviews} ></Rating>
                        </li>
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
        </div>    
            )} 
        </div>

    )
}
