import React from 'react';
import {Route} from 'react-router-dom';
import HomeComponent from "../home/HomeComponent";



export default function Redirect() {
    return (
        <div>
            <Route exact path="/" component={HomeComponent}/>
        </div>
    )
}
