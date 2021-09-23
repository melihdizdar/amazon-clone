import "./index.css";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter,Route} from 'react-router-dom';
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <BrowserRouter>
        <div className="grid-container">
          <header className="row">
              <div>
                  <a className="brand" href="/">amazon</a>
              </div>
              <div>
                  <a href="/cart">Cart</a>
                  <a href="/signin">Sign In</a>
              </div>
          </header>
          <main>
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}/>
            <Route path="/" component={HomeScreen} exact/>
          </main>
          <footer className="row center">All right reserved</footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
