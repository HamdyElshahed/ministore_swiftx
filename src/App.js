import './assets/style/style.css';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import { CategoryPage } from './pages/categorypage';
import { ProductPage } from './pages/productpage';
import { CartPage } from './pages/cartpage';
import { Navbar } from './components/navbar';
function App() {
  return (
  <div className="p" >
    <Router>
      <Navbar/> 
      <Switch>
        <Route exact path="/" render={props=> <CategoryPage name={"all"} /> }/>
        <Route exact path="/clothes" render={props=> <CategoryPage name={"clothes"} /> }/>
        <Route exact path="/tech" render={props=> <CategoryPage name={"tech"} /> }/>
        <Route exact path="/product/:id" component={ProductPage} />
        <Route exact path="/cart" component={CartPage} />
      </Switch>
    </Router>
  </div>
  );
}

export default App;
