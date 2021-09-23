import React from 'react'

export default function Rating(props) {
    const{rating, numReviews} = props;
    return (
        <div className="rating">
            {/*girilen rating verilerine göre fa-starların nasıl gözükeceğinin belirlendiği yer*/}
            <span>
                <i className={rating >=1?'fa fa-star': rating >=0.5?'fa fa-star-half':'fa fa-star-half-o'}></i>
            </span>
            <span>
                <i className={rating >=2?'fa fa-star': rating >=1.5?'fa fa-star-half':'fa fa-star-half-o'}></i>
            </span>
            <span>
                <i className={rating >=3?'fa fa-star': rating >=2.5?'fa fa-star-half':'fa fa-star-half-o'}></i>
            </span>
            <span>
                <i className={rating >=4?'fa fa-star': rating >=3.5?'fa fa-star-half':'fa fa-star-half-o'}></i>
            </span>
            <span>
                <i className={rating >=5?'fa fa-star': rating >=4.5?'fa fa-star-half':'fa fa-star-half-o'}></i>
            </span>
            <span>
                {/*Ürünün numReview kısmının çekildiği yer*/}
                {numReviews + ' reviews'}
            </span>
        </div>
    )
}
