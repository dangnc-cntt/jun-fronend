import React from "react";
import {observer} from "mobx-react";
import {UpdateNumberPhone} from './components/UpdatePhoneNumber';
import {UpdateEmail} from './components/UpdateEmail';
import {AccountStore} from "./AccountStore";
import {ACCOUNT_CTRL} from "./AccountControl";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {sendUpdateProfile} from "../../../api/account";
import {getUserData} from "../../authen/LoginSignUp/Reducers/LoginReducer";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {Button, Feedback, Form, FormGroup, Input, Select, Validations} from "../../../common/form";
import {formatNumberPhone, uploadImage} from "../../../common/utils/Utils";
import {PROFILE_CTRL} from "../CustomerControl";
import {store} from "../CustomerStore";

const REACT_APP_LIMITED_SIZE_UPLOAD: number = (window as any).REACT_APP_LIMITED_SIZE_UPLOAD || 0;

interface IProps {
    onConfirm: (response: { status: number, body: any }) => void;
    onChangeType: (value: 'email' | 'numberPhone' | 'addNumberPhone') => void
}

interface IState {
    avatarImg: string,
    email: string,
    name: string,
    numberPhone: string,
    keyForm: number,
    enablePassport: boolean,
    /*Crop Image*/
    keyModal: number,
    demension: number,
    fileName: string,
    imageSrc: string,
    fileImageTemp: any,
    /*----- END ----*/
}

@observer
export default class AccountComponent extends React.Component<IProps, IState> {
    public store = new AccountStore();
    private dataRequestUpdateProfile: any;
    public is_valid_birthday: boolean = false;

    public error!: string;

    constructor(props: IProps) {
        super(props);
        PROFILE_CTRL.setMenuActive([0, 0]);
        PROFILE_CTRL.setBreadcrumbs([{title: 'Thông tin cá nhân'}]);
        ACCOUNT_CTRL.setStore(this.store);
        ACCOUNT_CTRL.setView(this);


        this.dataRequestUpdateProfile = {
            avatarUrl: '',
            birthDay: '1970-01-01',
            gender: "MALE",
            name: '',
            enablePassport: (LoginStore.getUserData as any).enablePassport
        };
        this.state = {
            avatarImg: '/assets/images/avatar_icon.svg',
            email: '',
            name: '',
            numberPhone: '',
            keyForm: Math.random(),
            keyModal: Math.random(),
            demension: 200,
            fileName: '',
            imageSrc: '',
            fileImageTemp: '',
            enablePassport: (LoginStore.getUserData as any).enablePassport
        };
        this.uploadLocalImage = this.uploadLocalImage.bind(this);
    }

    componentDidMount() {
        store.titleHelmet="Thông tin cá nhân"
        if (!!LoginStore.getUserData) {
            const profile = LoginStore.getUserData as any;
            this.dataRequestUpdateProfile = {
                avatarUrl: profile.avatarUrl ? profile.avatarUrl : '',
                birthDay: profile.birthDay ? profile.birthDay.toString().substr(0, 10) : '1970-01-01',
                gender: profile.gender ? profile.gender : 'MALE',
                name: profile.name ? profile.name : '',
                enablePassport: (LoginStore.getUserData as any).enablePassport
            };
            this.setState({
                email: profile.user.email || '',
                numberPhone: profile.user.phoneNumber || '',
                name: profile.name || '',
                keyForm: Math.random(),
                avatarImg: profile.avatarUrl ? profile.avatarUrl : '/assets/icons/profile/avatar_icon.svg',
                enablePassport: (LoginStore.getUserData as any).enablePassport
            });
        }
    }

    private async onSubmit(event: any) {
        try {
            event.preventDefault();
            if (this.state.fileImageTemp) {
                this.dataRequestUpdateProfile.avatarUrl = await uploadImage(this.state.fileImageTemp, 'uploadProfile') || '';
            }
            this.dataRequestUpdateProfile.enablePassport = this.state.enablePassport;
            const response = await sendUpdateProfile(this.dataRequestUpdateProfile);
            if (response.status === 200) {
                await getUserData();
                toastUtil.success('Cập nhật thành công');
                // window.location.reload();
            }
        } catch (e) {
            console.error(e)
        }
    };

    private verifyDimensionImage(file: any): Promise<{ image: any, width: number, height: number }> {
        return new Promise(resolve => {
            const fr = new FileReader();
            fr.onload = () => {
                const img = new Image();
                img.onload = () => {
                    resolve({image: img, width: img.width, height: img.height});
                };
                typeof fr.result === "string" && (img.src = fr.result);
            };
            fr.readAsDataURL(file);
        });
    }

    protected async uploadLocalImage(files: any[]) {
        if (files.length > 0) {
            const data = await this.verifyDimensionImage(files[0]);
            if (data.width === data.height) {
                this.setState({
                    avatarImg: data.image.src,
                    fileImageTemp: files
                });
            } else {
                toastUtil.warning('Vui lòng chọn ảnh vuông');
            }
        }
    };

    private handlerOnChangeBirthday(event: any, key: 'year' | 'month' | 'day') {
        let year = 0;
        let month = 0;
        let day = 0;
        switch (key) {
            case "year":
                day = parseInt(this.dataRequestUpdateProfile.birthDay.substr(8, 2));
                month = parseInt(this.dataRequestUpdateProfile.birthDay.substr(6, 2));
                this.dataRequestUpdateProfile.birthDay = this.dataRequestUpdateProfile.birthDay.replace(/^\d{4}/, event.currentTarget.value);
                break;
            case "month":
                day = parseInt(this.dataRequestUpdateProfile.birthDay.substr(8, 2));
                year = parseInt(this.dataRequestUpdateProfile.birthDay.substr(0, 4));
                this.dataRequestUpdateProfile.birthDay = this.dataRequestUpdateProfile.birthDay.replace(/\d{2}(?=-\d{2}$)/, event.currentTarget.value);
                break;
            case "day":
                month = parseInt(this.dataRequestUpdateProfile.birthDay.substr(6, 2));
                year = parseInt(this.dataRequestUpdateProfile.birthDay.substr(0, 4));
                this.dataRequestUpdateProfile.birthDay = this.dataRequestUpdateProfile.birthDay.replace(/\d{2}$/, event.currentTarget.value);
                break;
        }
        year = parseInt(this.dataRequestUpdateProfile.birthDay.substr(0, 4));
        month = parseInt(this.dataRequestUpdateProfile.birthDay.substr(6, 2));
        day = parseInt(this.dataRequestUpdateProfile.birthDay.substr(8, 2));

        this.is_valid_birthday = this.isValidDate(event, year, month, day);
    }

    private isValidDate(e: any, year: number, month: number, day: number): boolean {
        const date = new Date();
        date.setFullYear(year, month - 1, day);
        if ((date.getFullYear() === year) && (date.getMonth() === month - 1) && (date.getDate() === day)) {
            return true;
        } else {
            toastUtil.error('Nhập sai định dạng ngày tháng');
            return false;
        }

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div className="container" id="profiles-account-page">
            <div className="title m-0 border-bottom">
                <h3 className="p-0">Thông tin cá nhân</h3>
            </div>
            <div className="account_information_content d-flex" key={this.state.keyForm}>
                <div className="account_left">
                    <div className="image text-center">
                        <img src={this.state.avatarImg} alt=""/>
                    </div>
                    <div className="w-100 text-center">
                        <button className="btn change-avatar border">+ Thêm ảnh<input
                            accept={"image/jpeg, image/jpg, image/png"}
                            onChange={(e: any) => this.uploadLocalImage(e.currentTarget.files)}
                            type="file"/></button>
                    </div>
                    <div className="content">
                        <h4>Thiết lập ảnh đại diện</h4>
                        <p>Nếu bạn chưa thiết lập, ảnh đại diện của bạn sẽ được hệ thống mặc định hiển thị.</p>
                        <span>(<span>{`Tối đa ${REACT_APP_LIMITED_SIZE_UPLOAD}MB`}</span>. Định dạng JPEG, JPG, PNG)</span>
                    </div>
                </div>
                <div className="form_content_account">
                    <Form onSubmit={(e: any) => this.onSubmit(e)}>
                        <FormGroup className="name">
                            <label>Họ và tên</label>
                            <div className="d-flex align-items-center">
                                <Input type="text" className="border"
                                       onChange={(e: any) => this.dataRequestUpdateProfile.name = e.currentTarget.value}
                                       validations={[
                                           new Validations(Validations.minLength(6), 'Tên phải có tối thiểu 6 ký tự'),
                                           new Validations(Validations.maxLength(50), 'Tên có tối đa 50 ký tự')
                                       ]}
                                       defaultValue={this.state.name}/>
                                <Feedback invalid={"true"}/>
                            </div>
                        </FormGroup>
                        <div className="phone">
                            <label>Số điện thoại</label>
                            <div className="d-flex align-items-center" key={formatNumberPhone(this.state.numberPhone)}>
                                {this.state.numberPhone ? <input type="text" disabled={true} className="border"
                                                                 defaultValue={formatNumberPhone(this.state.numberPhone)}/> :
                                    <button type="button" className="bt_add_phone add_phone border"
                                            data-toggle="modal"
                                            data-target="#add_phone">
                                        <i className="fal fa-plus text-center"/> Thêm số điện thoại của bạn
                                    </button>}
                            </div>
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <div className="d-flex align-items-center" key={this.state.email}>
                                <input type="text" defaultValue={this.state.email} className="border"
                                       disabled={true}/>
                            </div>
                        </div>
                        <div className="gender">
                            <label>Giới tính</label>
                            <div className="d-flex align-items-center">
                                <input type="radio" className="nam" name="gender"
                                       onClick={() => this.dataRequestUpdateProfile.gender = "MALE"}
                                       defaultChecked={this.dataRequestUpdateProfile.gender === "MALE"}/>
                                <span>Nam</span>
                                <input name="gender"
                                       defaultChecked={this.dataRequestUpdateProfile.gender === "FEMALE"}
                                       onClick={() => this.dataRequestUpdateProfile.gender = "FEMALE"}
                                       type="radio" className="nu"/> <span>Nữ</span>
                            </div>

                        </div>
                        <div className="birthday">
                            <label>Ngày sinh</label>
                            <div className="d-flex justify-content-between">
                                <Select
                                    onChange={(e: any) => this.handlerOnChangeBirthday(e, "day")}
                                    defaultValue={this.dataRequestUpdateProfile.birthDay.substr(8, 2)}>
                                    {Array.from(Array(31), ((v, k) => k + 1 < 10 ? '0' + (k + 1) : k + 1)).map((value: number | string, index: number) =>
                                        <option key={index} value={value.toString()}>{value}</option>)}
                                </Select>
                                <Select
                                    onChange={(e: any) => this.handlerOnChangeBirthday(e, "month")}
                                    defaultValue={this.dataRequestUpdateProfile.birthDay.substr(5, 2)}>
                                    {Array.from(Array(12), ((v, k) => k + 1 < 10 ? '0' + (k + 1) : k + 1)).map((value: number | string, index: number) =>
                                        <option key={index}
                                                value={value.toString()}>Tháng {value.toString().replace(/^0/, "")}</option>)}
                                </Select>
                                <Select defaultValue={this.dataRequestUpdateProfile.birthDay.substr(0, 4)}
                                        onChange={(e: any) => this.handlerOnChangeBirthday(e, "year")}
                                >
                                    {Array.from(Array(new Date().getFullYear() - 1969), ((v, k) => k + 1970)).map((value: number | string, index: number) =>
                                        <option key={index} value={value.toString()}>{value}</option>)}
                                </Select>
                            </div>
                        </div>
                        <Button className="btn update" type={"submit"}>Lưu Lại</Button>
                    </Form>
                </div>
                <UpdateNumberPhone/>
                <UpdateEmail/>
            </div>
        </div>;
    }
}
