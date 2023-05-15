import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Products from '../Pages/Products';
import CheckoutPage from '../Pages/CheckoutPage';
import CustomerOrderDetails from '../Pages/CustomerOrderDetails';
import SellerOrderDetails from '../Pages/SellerOrderDetails';
import MyOrders from '../Pages/MyOrders';
import SellerOrder from '../Pages/SellerOrder';

function Routes() {
  return (
    <Switch>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Products } />
      <Route path="/customer/checkout" component={ CheckoutPage } />
      <Route path="/customer/orders/:id" component={ CustomerOrderDetails } />
      <Route path="/customer/orders" component={ MyOrders } />
      <Route path="/seller/orders/:id" component={ SellerOrderDetails } />
      <Route path="/seller/orders" component={ SellerOrder } />
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
}

export default Routes;
