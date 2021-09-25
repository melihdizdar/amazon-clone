import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter,Link,Route} from 'react-router-dom';
import CartScreen from "./screens/CartScreen";
import { useSelector } from "react-redux";
import SigninScreen from "./screens/SigninScreen";

function App() {
  //Değişkenleri tanımladığımız kod satırı.
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

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
                  <Link to="/signin">Sign In</Link>
              </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}/>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/signin" component={SigninScreen}/>
            <Route path="/" component={HomeScreen} exact/>
          </main>
          <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
