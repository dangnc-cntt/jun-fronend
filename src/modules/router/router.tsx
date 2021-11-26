import React from 'react';
import {Route} from 'react-router-dom';
import HomeComponent from "../home/HomeComponent";
import ProfileComponent from "../customer/CustomerComponent";
import CateProduct from "../cate/CateProduct";
import ProductDetail from "../productDetail/ProductDetail";
import Cart from "../cart/Cart";
import Order from "../cart/order/Order";
import PaymentSuccess from "../cart/order/PaymentSuccess";
import ProductHotAll from "../home/components/ProductHotAll";



export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={HomeComponent}/>
            <Route exact path="/product-hot" component={ProductHotAll}/>
            <Route path="/customer" component={ProfileComponent}/>
            <Route exact path="/category-product/:slug/:id.html" component={CateProduct}/>
            <Route exact path="/:slug/:id.html" component={ProductDetail}/>
            <Route exact path="/cart" component={Cart}/>
            <Route exact path="/checkout" component={Order}/>
            <Route exact path="/payment" component={PaymentSuccess}/>
        </div>
    )
}
