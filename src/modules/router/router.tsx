import React from 'react';
import {Route} from 'react-router-dom';
import HomeComponent from "../home/HomeComponent";
import ProfileComponent from "../customer/CustomerComponent";


export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={HomeComponent}/>
            <Route path="/customer" component={ProfileComponent}/>
        </div>
    )
}
