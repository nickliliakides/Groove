import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './hoc/layout';
import Auth from './hoc/auth';
import Home from './components/Home';
import RegisterLogin from './components/Register_Login/index';
import Register from './components/Register_Login/register';
import Shop from './components/Shop/index';
import Dashboard from './components/User/index';
import AddProduct from './components/User/Admin/addProduct';
import ManageCategories from './components/User/Admin/manageCategories';
import ProductPage from './components/Product/index';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/updateProfile';
import ManageSite from './components/User/Admin/manageSite';


const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/user/dashboard" exact component={Auth(Dashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />
        <Route path="/register_login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/product/:id" exact component={Auth(ProductPage, null)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />       
      </Switch>
    </Layout>
  );
}

export default Routes;
