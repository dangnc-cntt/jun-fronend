import React from 'react';
import {Route} from 'react-router-dom';
import HomeComponent from "../home/HomeComponent";
import ProfileComponent from "../customer/CustomerComponent";
import CateProduct from "../cate/CateProduct";



export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={HomeComponent}/>
            <Route path="/customer" component={ProfileComponent}/>
            <Route exact path="/slug::/id:.html" component={CateProduct}/>
        </div>
    )
}
