import Product from "./components/Product";
import data from "./data";
import "./index.css";

function App() {
  return (
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
          <div className="row center">
            {
              data.products.map(product => (
                <Product key={product._id} product={product}/>
              ))
            }
          </div>
      </main>
      <footer className="row center">All right reserved</footer>
  </div>
  );
}

export default App;
