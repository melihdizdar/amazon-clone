import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product(props) {
    const {product} = props;
    return (
        <div>
            <div key={product._id} className="card">
              <Link to={`/product/${product._id}`}>
                  <img className="medium" src={product.image}alt="product"/>
                  {/*ürünün resiminin çekildiği satır.*/}
              </Link>
              <div className="card-body">
                  <Link to={`/product/${product._id}`}>
                      <h2>{product.name}</h2>
                      {/*ürünün adının çekildiği satır.*/}
                  </Link>
                  <Rating rating={product.rating} numReviews={product.numReviews}/>
                  {/*ürünün reytinginin çekildiği satır.*/}
                  <div className="row">
                    <div className="price">${product.price}</div>
                    {/*ürünün fiyatının çekildiği satır.*/}
                    <div>
                        <Link to={`/seller/${product.seller._id}`}>
                          {product.seller.seller.name}
                        </Link>
                    </div>
                  </div>
              </div>
            </div>
        </div>
    )
}
