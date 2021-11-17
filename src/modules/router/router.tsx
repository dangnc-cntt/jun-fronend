import React from 'react';
import {Route} from 'react-router-dom';
import HomeComponent from "../home/HomeComponent";
import ProfileComponent from "../customer/CustomerComponent";
import CateProduct from "../cate/CateProduct";
import ProductDetail from "../productDetail/ProductDetail";



export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={HomeComponent}/>
            <Route path="/customer" component={ProfileComponent}/>
            <Route exact path="/category-product/:slug/:id.html" component={CateProduct}/>
            <Route exact path="/:slug/:id.html" component={ProductDetail}/>
        </div>
    )
}
