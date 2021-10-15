import React, {Component} from 'react';
import {LoginStore} from "../Store/LoginStore";
import {enterLogin, Login, setPassValue, setUserNameValue, changeTypePasswordInput} from "../Reducers/LoginReducer";
import {observer} from "mobx-react";
import {Feedback, FormGroup, Input, Validations} from "../../../../common/form";
import {forgetPassStore} from "../../forgetPass/store";
import {signUpStore} from "../Store/SignUpStore";

@observer
export default class FormLogin extends Component {
   protected renderEye = (statusEye: boolean): React.ReactNode => {
      if (statusEye) return <i className="far fa-eye" onClick={() => LoginStore.statusEye = !LoginStore.statusEye}/>; else return <i className="far fa-eye-slash" onClick={() => LoginStore.statusEye = !LoginStore.statusEye}/>;
   }
   handleForgotPassword(){
       forgetPassStore.isShow=true;
       LoginStore.isShowLoginForm=false;
       signUpStore.isSignUpForm=false;
   }

    render() {

        if(LoginStore.getIsShowLoginForm){
            return (
                <div className="form-login w-100">
                    <div id="error" className="pb-2">{LoginStore.Formerror&&LoginStore.Formerror.message}</div>
                    <FormGroup className="phone_number email css_form">
                        <Input type="text" id="username" name="username"
                               validations={[
                                   new Validations(Validations.regexp(/(^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$|^\d{10,10})$/), 'Tài khoản phải là Email hoặc số điện thoại (Sđt gồm 10 số)')
                               ]}
                               onChange={(e)=>{setUserNameValue(e)}} placeholder="Số điện thoại hoặc email"/>
                      {!LoginStore.getIsFormerror&&<Feedback className="error p-0" invalid={"true"}/>}
                        <p id="user" className="error">{LoginStore.getIsFormerror&&LoginStore.getIsFormerror.name}</p>
                    </FormGroup>
                    <div className="password css_form">
                       <div style={{position: "relative"}}>
                          <input type={changeTypePasswordInput(LoginStore.statusEye)} id="password-login" name="password" onChange={(e)=>{setPassValue(e)}} placeholder="Mật khẩu" onKeyDown={(e)=>{enterLogin(e)}}/>
                          <div className={"eye"} style={{
                             position: "absolute",
                             top: "25%",
                             right: "10px"
                          }}>
                             {
                                this.renderEye(LoginStore.statusEye)
                             }
                          </div>
                       </div>

                        <p id="pass" className="error">{LoginStore.getIsFormerror&&LoginStore.getIsFormerror.pass}</p>
                    </div>

                    <a className="forgot_pass text-right" href="#"
                       onClick={()=>this.handleForgotPassword()}>Quên mật khẩu</a>

                    <div className="button_login">
                        {!LoginStore.getButtonLoading ?
                            <button type="button" id="btn_login" name="btn_submit" onClick={()=>Login()}>Đăng nhập ngay</button>:
                            <button type="button" id="btn_login" name="btn_submit"><i className="fa fa-spinner fa-spin"/></button>}
                    </div>
                </div>
            );
        } else return true
    }
}

