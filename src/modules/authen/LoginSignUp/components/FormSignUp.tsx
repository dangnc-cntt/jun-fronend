import React, {Component} from 'react';
import {signUpStore} from "../Store/SignUpStore";
import {clearInputName, signUp, setPassConFirm, setPassValueSignUp, setEmail} from "../Reducers/SignUpReducer";
import {observer} from "mobx-react";


@observer
export default class FormSignUp extends Component {




    render() {

        if(signUpStore.getIsShowSignUpForm){
            return (
                <div className="form_signUp w-100">
                    <div id="error" className='pb-1'>{signUpStore.errorSignUp&&signUpStore.errorSignUp.message}</div>
                    <div className="name css_form">
                        <input type="text" onChange={(e:any)=>{signUpStore.fullName=e.target.value;clearInputName()}} placeholder="Họ và tên"/>
                        <span className="error">{signUpStore.getIsErrorSingUp&&signUpStore.getIsErrorSingUp.names}</span>
                    </div>
                    <div className="phone_number_or_email css_form">
                        <input  onChange={(e:any)=>{signUpStore.userName=e.target.value}} placeholder="Username"/>
                        <span className="error">{signUpStore.getIsErrorSingUp&&signUpStore.getIsErrorSingUp.userName}</span>
                    </div>
                    <div className="password css_form">
                        <input type="password" placeholder="Mật khẩu" onChange={(e)=>{setPassValueSignUp(e)}}/>
                        <span className="error">{signUpStore.getIsErrorSingUp&&signUpStore.getIsErrorSingUp.pass}</span>
                    </div>
                    <div className="confirm_pass css_form">
                        <input type="password" placeholder="Xác nhận mật khẩu" onChange={(e)=>setPassConFirm(e)}/>
                        <span className="error">{signUpStore.getIsErrorSingUp&&signUpStore.getIsErrorSingUp.passConFirm}</span>
                    </div>
                    <div className="phone_number_or_email css_form">
                        <input onChange={(e:any)=>{setEmail(e)}} placeholder="Email"/>
                        <span className="error">{signUpStore.getIsErrorSingUp&&signUpStore.getIsErrorSingUp.userName}</span>
                    </div>
                    <div className="text">
                        <p>Bằng việc đăng ký, bạn đồng ý với mọi <span>
                            <a target="_blank" href={signUpStore.getLinkPolicy?signUpStore.getLinkPolicy:''}>Quy chế hoạt động</a>
                        </span> của Jun shop!</p>
                    </div>
                    <div className="bt_signUp mb-5">
                        {!signUpStore.getButtonLoading?
                            <button type="button" onClick={()=>signUp()}>Tạo tài khoản</button>:<button type="button"><i className="fa fa-spinner fa-spin"/></button>}
                    </div>
                </div>
            );
        }else return true
    }
}
