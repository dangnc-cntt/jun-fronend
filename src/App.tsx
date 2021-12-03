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
import {getUserData} from "./modules/authen/LoginSignUp/Reducers/LoginReducer";
import ActiveForm from "./modules/authen/LoginSignUp/components/ActiveForm";
import {css} from "@emotion/core";
import ForgetPassComponent from "./modules/authen/forgetPass/components/ForgetPassComponent";
import {signUpStore} from "./modules/authen/LoginSignUp/Store/SignUpStore";
import {LoginStore} from "./modules/authen/LoginSignUp/Store/LoginStore";

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

    handleClickSignup() {
        LoginStore.isShowLoginForm = false;
        signUpStore.isSignUpForm = true
    }

    render() {
        return (
            <div className="jun_shop">
                <Router>
                    <Header/>
                    <div className="wrapper" style={{minHeight: 600}}>
                        <div className="container">
                            <Redirect/>
                        </div>
                    </div>
                    <div className="footer" css={footer}>
                        <div className="container d-flex justify-content-between pt-5">
                            <div>
                                <p className="text-white">Số điện thoại: 0383630495</p>
                                <p className="text-white">Đia chỉ: 200 Nguyễn Khang</p>
                                <p className="text-white">Jun Shop thời trang thỏa sức mua sắm</p>
                            </div>
                            <div className="text-right">
                                <p className="text-white">Đăng ký ngay để nhận thêm ưu đãi từ Jun shop</p>
                                <button onClick={() => this.handleClickSignup()}>Đăng ký</button>
                            </div>
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

  .container {
    width: 100%;
    height: 180px;
    button{
      width: 100px;
      height: 40px;
      color: white;
      border: none;
      font-size: 14px;
      border-radius: 4px;
      background-color: #f44b24;
    }
  }
`