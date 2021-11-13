import React, {useState} from 'react';
import {Feedback, Form, FormGroup, Input, Validations} from "../../../../common/form";
import $ from "jquery";
import {ACCOUNT_CTRL} from "../AccountControl";
import {toastUtil} from "../../../../common/utils/ToastUtil";
import {LoginStore} from "../../../authen/LoginSignUp/Store/LoginStore";
import {sendUpdatePhoneNumber} from "../../../../api/account";

const dataRequestUpdateNumberPhone: { phoneNumber: string, otp: string } = {otp: '', phoneNumber: ''};

const DELAY_SEND_OTP_TIME: number = (window as any).DELAY_SEND_OTP_TIME || 0;

export const UpdateNumberPhone: React.FC<any> = () => {
    const [disabledReSendOTP, setDisabledReSendOTP] = useState(false);

    const onSubmit = async () => {
        try {
            const {phoneNumber, otp} = dataRequestUpdateNumberPhone;
            const response = await sendUpdatePhoneNumber(phoneNumber, otp);
            const profile = LoginStore.getUserData as any;
            if (response.status === 200) {
                ACCOUNT_CTRL.getView && ACCOUNT_CTRL.getView.setState({numberPhone: dataRequestUpdateNumberPhone.phoneNumber});
                toastUtil.success('Số điện thoại mới đã được áp dụng');
                //an popup
                $('.confirm_otp').modal('hide');
                profile.user.phoneNumber = dataRequestUpdateNumberPhone.phoneNumber;
            } else if (response.body.message && typeof response.body.message === "string") {
                ACCOUNT_CTRL.getStore && (ACCOUNT_CTRL.getStore.messageError = response.body.message);
            }
        } catch (e) {
            console.error(e)
        }
    };

    const handlerCallbackSendOTP = (success: boolean) => {
        if (success === true) {
            $('#add_phone').modal('hide');
            $('#confirm_otp').modal('show');
            setDisabledReSendOTP(true);
            ACCOUNT_CTRL.getStore && (ACCOUNT_CTRL.getStore.NumberPhone = dataRequestUpdateNumberPhone.phoneNumber);
            setTimeout(() => setDisabledReSendOTP(false), DELAY_SEND_OTP_TIME * 1000);
        }
    };

    const onChangePhoneNumber = (event: any, key: 'phoneNumber') => {
        let value = event.currentTarget.value.toString();
        value = value.replace(/[^0-9]/g, "");
        event.currentTarget.value = value;
        dataRequestUpdateNumberPhone[key] = value;
    };

    const onChangeOtp = async (event: any, key: 'otp') => {
        let value = event.currentTarget.value.toString();
        value = value.replace(/[^0-9]/g, "");
        event.currentTarget.value = value;
        dataRequestUpdateNumberPhone[key] = value;
        if (value.length === 6) {
            await onSubmit();
        }
    };

    return (
        <div>
            {/*---------modal add phone number-----------*/}
            <div className="modal fade" id="add_phone" role="dialog" aria-labelledby="exampleModalCenterTitle"
                 aria-hidden="true">
                <Form
                    onSubmit={() => ACCOUNT_CTRL.SendOtp(dataRequestUpdateNumberPhone.phoneNumber, success => handlerCallbackSendOTP(success))}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Thêm số điện thoại</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p className="text">
                                    <span>Để tài khoản của bạn được bảo mật và bảo vệ, vui lòng nhập chính xác số điện thoại của bạn. Chozoi sẽ được gửi mã xác minh đến số điện thoại của bạn</span>
                                </p>
                                <FormGroup className="add-phone-number">
                                    <label>Số điện thoại:</label>
                                    <Input type="text"
                                           onChange={(e: any) => onChangePhoneNumber(e, "phoneNumber")}
                                           validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập số điện thoại của bạn'),
                                               new Validations(Validations.regexp(/^\d{10}$/), "Số điện thoại gồm 10 chữ số")]}
                                           placeholder="Vui lòng nhập số điện thoại của bạn"/>
                                    <Feedback invalid={"true"}/>
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary confirm_sdt">Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
            {/*---------modal confirm otp-----------*/}
            <div className="modal fade confirm_otp" id="confirm_otp" role="dialog"
                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <Form>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Mã xác minh</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FormGroup className="confirm w-100">
                                    <label>Mã xác minh vừa được Chozoi gửi đến số
                                        *******{dataRequestUpdateNumberPhone.phoneNumber.slice(7, 10)}. Vui lòng nhập
                                        vào ô dưới đây</label>
                                    <Input type="text" className="w-100" onChange={(e: any) => onChangeOtp(e, "otp")}
                                           validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập mã OTP'),
                                               new Validations(Validations.regexp(/^\d{6}$/), "Mã OTP gồm 6 chữ số")]}/>
                                    <Feedback invalid={"true"}/>
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="bt-close" data-dismiss="modal" aria-label="Close">Hủy
                                    bỏ
                                </button>
                                <button type="button" disabled={disabledReSendOTP}
                                        onClick={() => ACCOUNT_CTRL.SendOtp(dataRequestUpdateNumberPhone.phoneNumber, success => handlerCallbackSendOTP(success))}
                                        className="btn btn-primary confirm_otp">Gửi lại
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};
