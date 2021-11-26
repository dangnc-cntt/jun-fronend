import React from "react";
import {observer} from "mobx-react";
import {PROFILE_CTRL} from "../CustomerControl";
import {Form, FormGroup, Input, Feedback, Validations} from "../../../common/form";
import {IReqChangePass} from "../../../api/account/interfaces/request";
import {sendChangePass} from "../../../api/account";
import {store} from "../CustomerStore";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";

interface IChangePasswordComponentState {
    showOldPassword: boolean
    showNewPassword: boolean
    showReNewPassword: boolean
    disabledGetOTP: boolean
    disabledSubmit: boolean
    countDown: number

    keyForm: number
    keyNewPassword: number
}

const DEFINED_COUNTDOWN = 15;
const DEFINED_REQUEST_TIMEOUT = 30;

@observer
export default class ChangePasswordComponent extends React.Component<any, IChangePasswordComponentState> {
    public NewPasswordRef = React.createRef<Input>();
    public ReNewPasswordRef = React.createRef<Input>();
    public request_body_data_new_password?: IReqChangePass;
    public requested_otp: boolean = false;

    state = {
        showOldPassword: false,
        showNewPassword: false,
        showReNewPassword: false,
        disabledGetOTP: false,
        disabledSubmit: false,
        countDown: DEFINED_COUNTDOWN,

        keyForm: Date.now(),
        keyNewPassword: Date.now()
    };

    constructor(props: any) {
        super(props);
        this.initRequestBodyDataChangePassword();
        PROFILE_CTRL.setMenuActive([0, 1]);
        PROFILE_CTRL.setBreadcrumbs([{title: 'Thay đổi mật khẩu'}]);
        store.titleHelmet="Thay đổi mật khẩu"
    }

    private initRequestBodyDataChangePassword() {
        this.request_body_data_new_password = {
            username: LoginStore.getUserData ? LoginStore.getUserData.username : '',
            oldPassword: '',
            newPassword: '',
            confirmedPassword: ''
        };
    }

    protected handlerInputOnChange(event: any, type: 'OLD_PASSWORD' | 'NEW_PASSWORD' | 'RE_NEW_PASSWORD') {
        switch (type) {
            case "OLD_PASSWORD":
                (this.request_body_data_new_password as IReqChangePass).oldPassword = event.currentTarget.value;
                break;
            case "NEW_PASSWORD":
                (this.request_body_data_new_password as IReqChangePass).newPassword = event.currentTarget.value;
                this.getReNewPasswordRef && this.getReNewPasswordRef.validate((this.request_body_data_new_password as IReqChangePass).confirmedPassword);
                break;
            case "RE_NEW_PASSWORD":
                (this.request_body_data_new_password as IReqChangePass).confirmedPassword = event.currentTarget.value;
                break;
        }
    }


    protected async handlerOnSubmit(event: any) {
        try {
            this.setState({disabledSubmit: true});
            setTimeout(() => this.state.disabledSubmit && this.setState({disabledSubmit: false}), DEFINED_REQUEST_TIMEOUT * 1000);
            const response = await sendChangePass(this.request_body_data_new_password as IReqChangePass);
            if (response.status === 200) {
                toastUtil.success('Mật khẩu đã được thay đổi!');
                this.initRequestBodyDataChangePassword();
                this.setState({disabledSubmit: false, keyForm: Date.now()});
            }
            response.status !== 200 && this.setState({disabledSubmit: false});
        } catch (e) {
            console.error(e);
        }
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div id="change-password-page">
            <div className="">
                <div className="card-header">
                    <p className="title">Thay đổi mật khẩu</p>
                </div>
                <div className="card-body">
                    <Form onSubmit={(e: any) => this.handlerOnSubmit(e)} key={this.state.keyForm}>
                        <FormGroup className="form-group">
                            <label>Mật khẩu hiện tại</label>
                            <Input className="form-control"
                                   onChange={e => this.handlerInputOnChange(e, "OLD_PASSWORD")}
                                   type={this.state.showOldPassword ? 'text' : 'password'}
                            />
                            <i className={`fal fa-eye${this.state.showOldPassword ? '' : '-slash'}`}
                               onClick={() => this.setState({showOldPassword: !this.state.showOldPassword})}
                            />
                            <Feedback invalid={"true"}/>
                        </FormGroup>

                        <FormGroup className="form-group" key={this.state.keyNewPassword}>
                            <label>Mật khẩu mới</label>
                            <Input className="form-control"
                                   ref={this.NewPasswordRef}
                                   defaultValue={this.request_body_data_new_password ? this.request_body_data_new_password.newPassword : ''}
                                   onChange={e => this.handlerInputOnChange(e, "NEW_PASSWORD")}
                                   validations={[new Validations(Validations.minLength(6), 'Mật khẩu tối thiểu 6 kí tự.')]}
                                   type={this.state.showNewPassword ? 'text' : 'password'}
                            />
                            <i className={`fal fa-eye${this.state.showNewPassword ? '' : '-slash'}`}
                               onClick={() => this.setState({showNewPassword: !this.state.showNewPassword})}
                            />
                            <Feedback invalid={"true"}/>
                        </FormGroup>

                        <FormGroup className="form-group">
                            <label>Xác nhận mật khẩu</label>
                            <Input className="form-control"
                                   ref={this.ReNewPasswordRef}
                                   onChange={e => this.handlerInputOnChange(e, "RE_NEW_PASSWORD")}
                                   validations={[
                                       new Validations(Validations.minLength(6), 'Mật khẩu tối thiểu 6 kí tự.'),
                                       new Validations(Validations.compare(this, 'getNewPasswordRef'), 'Xác nhận mật khẩu không khớp')
                                   ]}
                                   type={this.state.showReNewPassword ? 'text' : 'password'}
                            />
                            <i className={`fal fa-eye${this.state.showReNewPassword ? '' : '-slash'}`}
                               onClick={() => this.setState({showReNewPassword: !this.state.showReNewPassword})}
                            />
                            <Feedback invalid={"true"}/>
                        </FormGroup>


                        <div className="form-group">
                            <button className="btn btn-primary"
                                    disabled={this.state.disabledSubmit}
                                    type={"submit"}>Lưu lại
                            </button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    }

    get getNewPasswordRef() {
        return this.NewPasswordRef.current;
    }

    get getReNewPasswordRef() {
        return this.ReNewPasswordRef.current;
    }
}
