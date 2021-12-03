import React, {Component, lazy} from 'react';
import "./App.scss";
import {BrowserRouter as Router} from "react-router-dom"
import {observer} from "mobx-react";
import StorageService from "./common/service/StorageService";
import {v4 as uuidv4} from 'uuid';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Redirect from "./modules/router/router";
import LoginSignup from "./modules/authen/LoginSignUp/components/index";
import {LoginStore} from "./modules/authen/LoginSignUp/Store/LoginStore";
import {getUserData} from "./modules/authen/LoginSignUp/Reducers/LoginReducer";
import ActiveForm from "./modules/authen/LoginSignUp/components/ActiveForm";
import {cartStore} from "./modules/cart/CartStore";
import {css} from "@emotion/core";
import ForgetPassComponent from "./modules/authen/forgetPass/components/ForgetPassComponent";

@observer
export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.checkUUID();
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        try {
            if (token) {
                await getUserData();
            }
        } catch (e) {
            localStorage.removeItem("user");
            console.error(e);
        } finally {
        }
    }

    async checkUUID() {
        const uuid: string | null = StorageService.getUUID();
        if (!uuid) {
            const userId: string = uuidv4();
            StorageService.setUUID(userId);
        }
    }

    render() {
        return (
            <div className="jun_shop">
                <Router>
                    <Header/>
                    <div className="wrapper">
                        <div className="container">
                            <Redirect/>
                        </div>
                    </div>
                    <div className="footer" css={footer}>
                        <div className="container d-flex align-items-center justify-content-center">

                        </div>
                    </div>
                    <ForgetPassComponent/>
                    <ActiveForm/>
                    <LoginSignup/>
                </Router>
                <ToastContainer/>
            </div>
        )
    }


}


const Header = lazy(() => import('./modules/header/component/HeaderComponent'));



const footer = css`
  width: 100%;
  height: auto;
  padding: 20px 0;
  margin-top: 16px;
  background-color: #323639;
  .container{
    width: 100%;
    height: 250px;
  }
`