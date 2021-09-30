import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter,Link,Route} from 'react-router-dom';
import CartScreen from "./screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";
import { signout } from "./actions/userActions";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingAddressScreen from "./screens/ShippingAddressScreen";
import PaymentMethodScreen from "./screens/PaymentMethodScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

function App() {
  //Değişkenleri tanımladığımız kod satırı.
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () =>{
    dispatch(signout());
  }

  return (
    <BrowserRouter>
        <div className="grid-container">
          <header className="row">
              <div>
                  <Link className="brand" to="/">amazon</Link>
              </div>
              <div>
                {/*Sepetin içindeki ürünlerin sayısı 0'dan büyük ise badge oluştur.*/}
                  <Link to="/cart">Cart {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}</Link>
                  <Link>
                    {userInfo ? (
                      <div className="dropdown">
                        {/*navbar'daki üye isminin silinip cart'ın gelme olayı*/}
                        <Link to="#">
                          {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                        </Link>
                        <ul className="dropdown-content">
                          <li>
                            <Link to="/orderhistory">Order History</Link> {/*32.Ders Display Orders History*/}
                          </li>
                          <li>
                            <Link to="#signout" onClick={signoutHandler}>
                              Sign Out
                            </Link>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <Link to="/signin">Sign In</Link>
                    )}
                  </Link> 
              </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <Route path="/shipping" component={ShippingAddressScreen}/>
            <Route path="/payment" component={PaymentMethodScreen}/>
            <Route path="/placeorder" component={PlaceOrderScreen}/>
            <Route path="/order/:id" component={OrderScreen}/>
            <Route path="/orderhistory" component={OrderHistoryScreen}/>
            <Route path="/" component={HomeScreen} exact/>
          </main>
          <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
