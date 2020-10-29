import React from 'react';
import './App.css';
import Header from './component/Header/Header'
import Shop from './component/shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  
} from "react-router-dom";
import Order from './component/order/Order';
import Manage from './component/manage/Manage';
import NotFound from './component/notfound/NotFound';
import ProductDetails from './component/productDetails/ProductDetails';
import Shipment from './component/Shipment/Shipment';
import LogIn from './component/LogIn/LogIn';
import { createContext } from 'react';
import { useState } from 'react';
import PrivateRoute from './component/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {
  const [logInUser, setLogInUser] = useState({});
  return (
    <userContext.Provider value ={[logInUser, setLogInUser]} >
      
   
   <Router>
   <Header></Header>
     <Switch>
       <Route path="/shop">
         <Shop></Shop>
 </Route>
 <Route path="/order">
 <Order></Order>
 </Route>
 <PrivateRoute path="/manage">
<Manage></Manage>
 </PrivateRoute>
 <PrivateRoute path="/shipment">
<Shipment></Shipment>
 </PrivateRoute>
 <Route path="/login">
<LogIn></LogIn>
 </Route>
 <Route exact path="/">
<Shop></Shop>
 </Route>
<Route path="/product/:productKey">
<ProductDetails></ProductDetails>
</Route>
<Route path="*">
<NotFound></NotFound>
</Route>

     </Switch>
   </Router>
   </userContext.Provider>
  );
}

export default App;
