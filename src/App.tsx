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

@observer
export default class App extends Component {

    constructor(props: any) {
        super(props);
        this.checkUUID();
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem("user");
        try {
            if (user) {
                LoginStore.userData = JSON.parse(user) || null;
                if (token) getUserData().then(() => localStorage.setItem("user", JSON.stringify(LoginStore.getUserData)));
            } else if (token) {
                await getUserData();
                localStorage.setItem("user", JSON.stringify(LoginStore.getUserData));
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
            <div>
                <Router>
                    <Header/>
                    <div className="container">
                        <Redirect/>
                    </div>
                    <ActiveForm/>
                    <LoginSignup/>
                </Router>
                <ToastContainer/>
            </div>
        )
    }


}


const Header = lazy(() => import('./modules/header/component/HeaderComponent'));