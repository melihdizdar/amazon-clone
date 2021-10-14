import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';
import { prices, ratings } from '../utils';

export default function SearchScreen(props) {
  //const { name = 'all' } = useParams(); //53.Create Search Box and Search Screen,
  //const { name = 'all', category='all' } = useParams(); //54.Add Category Sidebar and Filter
  //const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest',} = useParams(); //55.Sort and filter product
  const { name = 'all', category = 'all', min = 0, max = 0, rating = 0, order = 'newest',pageNumber = 1,} = useParams(); //59.Implement Pagination
  const dispatch = useDispatch(); //53.Create Search Box and Search Screen
  const productList = useSelector((state) => state.productList); //53.Create Search Box and Search Screen
  //const { loading, error, products } = productList; //53.Create Search Box and Search Screen
  const { loading, error, products, page, pages } = productList; //59.Implement Pagination
  const productCategoryList = useSelector((state) => state.productCategoryList); //54.Add Category Sidebar and Filter
  const { loading:loadingCategories, error:errorCategories, categories } = productCategoryList; //54.Add Category Sidebar and Filter
  useEffect(() => { //53.Create Search Box and Search Screen
    //dispatch(listProducts({ name: name !== 'all' ? name : '' })); //53.Create Search Box and Search Screen
    //dispatch(listProducts({name: name !== 'all' ? name : '',category: category !== 'all' ? category : '',})); //54.Add Category Sidebar and Filter
    //dispatch(listProducts({name: name !== 'all' ? name : '',category: category !== 'all' ? category : '', min, max, rating, order,})); //55.Sort and filter product
    dispatch(listProducts({pageNumber,name: name !== 'all' ? name : '',category: category !== 'all' ? category : '', min, max, rating, order,})); //59.Implement Pagination
  }, [category, dispatch, max, min, name, order, rating, pageNumber]); //59.Implement Pagination
  //}, [category, dispatch, max, min, name, order, rating]); //55.Sort and filter product
  //}, [category, dispatch, name]); //54.Add Category Sidebar and Filter
  //}, [dispatch, name]); //53.Create Search Box and Search Screen
  const getFilterUrl = (filter) =>  { //54.Add Category Sidebar and Filter
    const filterPage = filter.page || pageNumber; //59.Implement Pagination
    const filterCategory = filter.category || category; //54.Add Category Sidebar and Filter
    const filterName = filter.name || name; //54.Add Category Sidebar and Filter
    const filterRating = filter.rating || rating; //55.Sort and filter product
    const sortOrder = filter.order || order; //55.Sort and filter product
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min; //55.Sort and filter product
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max; //55.Sort and filter product
    return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}/pageNumber/${filterPage}`; //59.Implement Pagination
    //return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`; //55.Sort and filter product
    //return `/search/category/${filterCategory}/name/${filterName}`; //54.Add Category Sidebar and Filter
  }
  return (
    <div>
      <div className="row">
        {loading ? (<LoadingBox></LoadingBox>) 
        : error ? ( <MessageBox variant="danger">{error}</MessageBox>) : 
        (
          <div>{products.length} Results</div>
        )}
          <div>
            Sort by{' '}
            <select value={order} onChange={(e) => { props.history.push(getFilterUrl({ order: e.target.value }));}}>
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
              <option value="toprated">Avg. Customer Reviews</option>
            </select>
          </div>
      </div>
      <div className="row top">
        <div className="col-1">
          <h3>Department</h3>
          <div>
            {loadingCategories ? (<LoadingBox></LoadingBox>) : errorCategories ? ( <MessageBox variant="danger">{errorCategories}</MessageBox>) : 
              (
                <ul>
                  <li>
                    <Link className={'all' === category ? 'active' : ''} to={getFilterUrl({ category: 'all' })}>Any</Link>
                  </li>
                  {categories.map((c) => (
                    <li key={c}>
                      <Link className={c === category ? 'active' : ''} to={getFilterUrl({ category: c })}>{c}</Link>
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
          <div>
            <h3>Price</h3>
            <ul>
              {prices.map((p) => (
                <li key={p.name}>
                  <Link to={getFilterUrl({ min: p.min, max: p.max })} className={`${p.min}-${p.max}` === `${min}-${max}` ? 'active' : '' }>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link to={getFilterUrl({ rating: r.rating })} className={`${r.rating}` === `${rating}` ? 'active' : ''}>
                    <Rating caption={' & up'} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-3">
          {loading ? (
            <LoadingBox></LoadingBox>) : error ? (  <MessageBox variant="danger">{error}</MessageBox>) : 
            (
                <>
                    {products.length === 0 && (
                        <MessageBox>No Product Found</MessageBox>
                    )}
                    <div className="row center">
                        {products.map((product) => (
                        <Product key={product._id} product={product}></Product>
                        ))}
                    </div>
                    <div className="row center pagination"> {/*59.Implement Pagination*/}
                      {[...Array(pages).keys()].map((x) => (
                        <Link className={x + 1 === page ? 'active' : ''} key={x + 1} to={getFilterUrl({ page: x + 1 })}>{x + 1}</Link>
                      ))}
                    </div>
                </>
            )}
        </div>
      </div>
    </div>
  );
}