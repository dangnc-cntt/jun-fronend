import React, {Component} from 'react';
import {signUpStore} from '../Store/SignUpStore';
import {getOtp, resendCode, checkOtp} from '../Reducers/SignUpReducer';
import {observer} from "mobx-react";
import {Feedback, FormGroup, Input, Validations} from "../../../../common/form";
import '../style.scss';

const DELAY_SEND_OTP_TIME: number = (window as any).DELAY_SEND_OTP_TIME || 0;

@observer
export default class ActiveForm extends Component<any, { disabledOtp: boolean, count: number}> {
    private countdown: any;

    constructor(props: any) {
        super(props);
        this.state = {
            disabledOtp: false,
            count: DELAY_SEND_OTP_TIME
        };
    }

    componentDidMount(){

    }

    private countDown() {
        let count = this.state.count - 1;
        this.countdown = setInterval(() => {
            this.setState({count: count});
            count -= 1;
            if (count === 0) {
                clearInterval(this.countdown);
                this.setState({disabledOtp: false, count: DELAY_SEND_OTP_TIME});
            }
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.countdown);
    }

    private async sendCode(){
        this.setState({disabledOtp: true, count: DELAY_SEND_OTP_TIME});
        this.countDown();
       await resendCode()
    }


    render() {
        if(signUpStore.typeUser === "email"){
            return (
                <div className="confirm_otp_signUp">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Mã xác minh</h5>
                                <button type="button" className="close"
                                        onClick={() => (signUpStore.typeUser = '')}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FormGroup className="confirm w-100">
                                    <label>Mã xác minh vừa được Jun shop gửi
                                        đến email {signUpStore.getUserName}. Vui lòng nhập
                                        vào ô dưới đây</label>
                                    <Input type="text" className="w-100" onChange={(e) => {
                                        getOtp(e)
                                    }}
                                           validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập mã OTP'),
                                               new Validations(Validations.regexp(/^\d{6}$/), "Mã OTP gồm 6 chữ số")]}/>
                                    <Feedback invalid={"true"}/>
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button className="btn"  onClick={() => this.sendCode()}
                                        disabled={this.state.disabledOtp}>
                                    {!this.state.disabledOtp ? 'Gửi mã' : `${this.state.count}s`}</button>


                                {!signUpStore.getButtonLoading && signUpStore.getOtp ?
                                    <button className="btn" onClick={() => {checkOtp()}}>Tiếp tục</button> :
                                    <button className="btn " disabled={true}><i
                                        className="fas fa-spinner fa-spin"/></button>}
                            </div>
                        </div>
                    </div>

                    <div className="hide-form-wrap" style={{zIndex: 1030}} onClick={() => signUpStore.typeUser = ''}/>
                </div>
            );
        }else return true

    }
}
