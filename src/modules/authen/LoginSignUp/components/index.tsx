import React, {Component} from 'react';
import {LoginStore} from "../Store/LoginStore";
import {signUpStore} from "../Store/SignUpStore";
import '../style.scss';
import FromLogin from './FormLogin';
import FormSignUp from './FormSignUp';
import {observer} from "mobx-react";

@observer
export default class Index extends Component {
    handleHideForm() {
        LoginStore.isShowLoginForm = false;
        signUpStore.isSignUpForm = false
    }

    handleClickSignUp() {
        LoginStore.isShowLoginForm = false;
        signUpStore.isSignUpForm = true
    }

    handleClickLogin() {

        LoginStore.isShowLoginForm = true;
        signUpStore.isSignUpForm = false

    }

    render() {
        LoginStore.username = "";
        LoginStore.password = "";

        if (LoginStore.getIsShowLoginForm || signUpStore.getIsShowSignUpForm) {
            return (
                <div id="login_signUp" className="login_signUp">
                    <div className="d-flex justify-content-center align-items-center w-100" style={{height: `1000px`}}>
                        <div className="form_login_signUp">
                            <div className="tab_login_signUp d-flex">
                                <div onClick={() => this.handleClickLogin()}
                                     className={`login ${LoginStore.getIsShowLoginForm ? 'active' : ''} d-flex justify-content-center align-items-center`}>
                                    <a href="#">Đăng nhập</a>
                                </div>
                                <div onClick={() => this.handleClickSignUp()}
                                     className={`signUp ${signUpStore.getIsShowSignUpForm ? 'active' : ''} d-flex justify-content-center align-items-center`}>
                                    <a href="#">Đăng ký</a>
                                </div>
                            </div>
                            <div className="title">
                                <h3>Chào mừng bạn đến <span>Jun Shop</span>!</h3>
                            </div>
                            <div className="form">
                                <FromLogin/>
                                <FormSignUp/>
                            </div>
                        </div>
                    </div>
                    <div className="hide-form-wrap" onClick={() => this.handleHideForm()}/>
                </div>
            );
        }
        return true
    }
}
