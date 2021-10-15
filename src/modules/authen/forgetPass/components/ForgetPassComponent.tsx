import React, {Component} from 'react';
import {observer} from "mobx-react";
import {forgetPassStore} from "../store";
import '../forgetPassStyle.scss';
import {Feedback, FormGroup, Input, Validations} from "../../../../common/form";
import ReCAPTCHA from "react-google-recaptcha";
import {
    clearInputTelephone,
    enterStep1,
    forgetPassWord,
    clearInputCapcha,
    checkOtp,
    clearInputPass,
    changePassWord,
    clearInputPassComfirm
} from "../reducer";
import {LoginStore} from "../../LoginSignUp/Store/LoginStore";

@observer
export default class ForgetPassComponent extends Component {
    onChange(value: any) {
        forgetPassStore.capcha = value;
        clearInputCapcha()
    }

    render() {
        if (forgetPassStore.getIsShow) {
            if (forgetPassStore.getStep === 1) {
                return (
                    <div className="forget_pass">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Quên mật khẩu</h5>
                                    <button type="button" className="close"
                                            onClick={() => forgetPassStore.isShow = false}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <FormGroup className="confirm w-100">
                                        <label>Vui lòng nhập email hoặc số điện thoại của bạn đã đăng ký trên
                                            Chozoi!</label>
                                        <p id="error"
                                           className="error">{forgetPassStore.getFormError && forgetPassStore.getFormError.message}</p>
                                        <input type="text" name="usernameForgetPass" defaultValue=""
                                               placeholder="Điền số điện thoại / Email" onChange={(e) => {
                                            forgetPassStore.userName = e.target.value;
                                            clearInputTelephone()
                                        }} onKeyDown={(e) => {
                                            enterStep1(e)
                                        }}/>
                                        <p className="error pb-2">{forgetPassStore.getFormError && forgetPassStore.getFormError.phoneError}</p>
                                        <ReCAPTCHA sitekey={(window as any).GOOGLE_RECAPTCHA_CLIENT}
                                                   onChange={this.onChange}/>
                                        <p className="error">{forgetPassStore.getFormError && forgetPassStore.getFormError.capcha}</p>
                                    </FormGroup>
                                </div>
                                <div className="modal-footer">
                                    <button className="Back step-1" onClick={() => {
                                        forgetPassStore.isShow = false;
                                        LoginStore.isShowLoginForm = true
                                    }}>Trở lại
                                    </button>
                                    {forgetPassStore.getButtonLoading === false ?
                                        <button className="Next step-1" onClick={() => forgetPassWord()}>Tiếp
                                            tục</button> :
                                        <button className="Next step-1"><i className="fa fa-spinner fa-spin"/></button>}
                                </div>
                            </div>
                        </div>

                        <div className="hide-form-wrap" onClick={() => forgetPassStore.isShow = false}/>
                    </div>
                );
            }
            if (forgetPassStore.getStep === 2) {
                return (
                    <div className="step_2">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Nhập mã OTP</h5>
                                    <button type="button" className="close"
                                            onClick={() => forgetPassStore.isShow = false}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <FormGroup className="confirm w-100">
                                        <label>Nhập mã xác nhận đã được gửi về mail hoặc SDT</label>
                                        <p className="error pb-2">{forgetPassStore.getFormError && forgetPassStore.getFormError.message}</p>
                                        <Input type="text" placeholder="Nhập mã xác nhận" name="otp"
                                               validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập mã OTP'),
                                                   new Validations(Validations.regexp(/^\d{6}$/), "Mã OTP gồm 6 chữ số")]}
                                               onChange={(e) => {
                                                   forgetPassStore.otp = e.target.value;
                                                   clearInputPass()
                                               }}/>
                                        <Feedback invalid={"true"}/>
                                    </FormGroup>
                                </div>
                                <div className="modal-footer">
                                    <button className="Back step-1" onClick={() => {
                                        forgetPassStore.step = 1;
                                        forgetPassStore.userName = ""
                                    }}>Trở lại
                                    </button>
                                    {forgetPassStore.getButtonLoading === false ?
                                        <button className="Next step-1" onClick={() => checkOtp()}>Tiếp tục</button> :
                                        <button className="Next step-1"><i className="fa fa-spinner fa-spin"/></button>}
                                </div>
                            </div>
                        </div>

                        <div className="hide-form-wrap" onClick={() => forgetPassStore.isShow = false}/>
                    </div>
                );
            }
            if (forgetPassStore.getStep === 3) {
                return (
                    <div className="step_3">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Tạo mật khẩu mới</h5>
                                    <button type="button" className="close"
                                            onClick={() => forgetPassStore.isShow = false}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <FormGroup className="confirm w-100">
                                        <input type="password" onChange={(e) => {
                                            forgetPassStore.passWord = e.target.value;
                                            clearInputPass()
                                        }} placeholder="Nhập mật khẩu mới"/><br/>
                                        <div
                                            className="error">{forgetPassStore.getFormError && forgetPassStore.getFormError.pass}</div>
                                        <input type="password" placeholder="Xác nhận mật khẩu" onChange={(e) => {
                                            forgetPassStore.passConfirm = e.target.value;
                                            clearInputPassComfirm()
                                        }}/><br/>
                                        <div
                                            className='error'>{forgetPassStore.getFormError && forgetPassStore.getFormError.passComfirm}</div>
                                        <div className="mess-forget-pass"/>

                                    </FormGroup>
                                </div>
                                <div className="modal-footer">
                                    <button className="Back step-1" onClick={() => {
                                        forgetPassStore.step = 1;
                                        forgetPassStore.isShow = false
                                    }}>Hủy
                                    </button>
                                    {forgetPassStore.getButtonLoading === false ?
                                        <button className="Next step-1" onClick={() => changePassWord()}>Tiếp
                                            tục</button> :
                                        <button className="Next step-1"><i className="fa fa-spinner fa-spin"/></button>}
                                </div>
                            </div>
                        </div>

                        <div className="hide-form-wrap" onClick={() => forgetPassStore.isShow = false}/>
                    </div>
                );
            }
        }
        return true
    }
}
