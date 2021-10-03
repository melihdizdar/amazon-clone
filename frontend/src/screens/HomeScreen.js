import React, { useEffect} from 'react'
import Product from "../components/Product";
import MessageBox from '../components/MessageBox';
import LoadingBox from '../components/LoadingBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

export default function HomeScreen() {
  /*kullanılan fonksiyonların tanımları yapılır.*/
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const {loading,error,products} = productList;

  useEffect(() =>{
    //dispatch(listProducts());
    dispatch(listProducts({})); //49.Implement Seller View
  }, [dispatch]);
    return (
        <div>
          {loading? <LoadingBox/> //Yükleme ekranın loading komutunda gösterileceğinin belirlendiği yer.
          :
          error? <MessageBox variant="danger">{error}</MessageBox>
          //Başarısız ekranın error komutunda gösterileceğinin belirlendiği yer.
          :<div className="row center">
            {/* Ürünlerin idye göre listelendiği kod satırı*/}
              {products.map(product => (
                <Product key={product._id} product={product}/>
              ))}
            </div>
          } 
        </div>
    )
}
