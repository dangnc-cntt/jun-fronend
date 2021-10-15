import React, {Component} from 'react';
import {observer} from "mobx-react";
import "./HomStyle.scss"

@observer
class HomeComponent extends Component {



    render() {
        return (
            <div className="home">
               <div className="banner d-flex align-items-center justify-content-center">
                   <p>It's Banner</p>
               </div>
            </div>
        );
    }
}

export default HomeComponent;