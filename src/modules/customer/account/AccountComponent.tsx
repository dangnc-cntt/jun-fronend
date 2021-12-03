import React from "react";
import {observer} from "mobx-react";
import {AccountStore} from "./AccountStore";
import {ACCOUNT_CTRL} from "./AccountControl";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {sendUpdateProfile} from "../../../api/account";
import {getUserData} from "../../authen/LoginSignUp/Reducers/LoginReducer";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {Button, Feedback, Form, FormGroup, Input, Validations} from "../../../common/form";
import {formatNumberPhone, uploadImage} from "../../../common/utils/Utils";
import {PROFILE_CTRL} from "../CustomerControl";
import {store} from "../CustomerStore";
import {observable} from "mobx";
import {storage} from "../../../common/firebase/firebase";

const REACT_APP_LIMITED_SIZE_UPLOAD: number = (window as any).REACT_APP_LIMITED_SIZE_UPLOAD || 0;

interface IProps {
    onConfirm: (response: { status: number, body: any }) => void;
    onChangeType: (value: 'email' | 'numberPhone' | 'addNumberPhone') => void
}

interface IState {
    avatarImg: any,
    fullName: string,
    email: string,
    numberPhone: string,
    keyForm: number,
    /*Crop Image*/
    keyModal: number,
    fileName: string,
    imageSrc: string,
    fileImageTemp: any,
    /*----- END ----*/
}

@observer
export default class AccountComponent extends React.Component<IProps, IState> {
    public store = new AccountStore();
    private dataRequestUpdateProfile: any;

    public error!: string;

    constructor(props: IProps) {
        super(props);
        PROFILE_CTRL.setMenuActive([0, 0]);
        PROFILE_CTRL.setBreadcrumbs([{title: 'Thông tin cá nhân'}]);
        ACCOUNT_CTRL.setStore(this.store);
        ACCOUNT_CTRL.setView(this);


        this.dataRequestUpdateProfile = {
            avatarUrl: '',
            gender: "MALE",
            fullName: '',
            address: '',
            phoneNumber: '',
        };

        this.state = {
            avatarImg: '/assets/images/avatar_icon.svg',
            fullName: '',
            email: '',
            numberPhone: '',
            keyForm: Math.random(),
            keyModal: Math.random(),
            fileName: '',
            imageSrc: '',
            fileImageTemp: ''
        };
    }

    componentDidMount() {
        store.titleHelmet="Thông tin cá nhân"
        if (!!LoginStore.getUserData) {
            const profile = LoginStore.getUserData as any;
            this.dataRequestUpdateProfile = {
                avatarUrl: profile.avatarUrl ? profile.avatarUrl : '',
                gender: profile.gender ? profile.gender : 'MALE',
                fullName: profile.fullName ? profile.fullName : '',
                address: profile.address ? profile.address : '',
                phoneNumber: profile.phoneNumber ? profile.phoneNumber : ''
            };
            this.setState({
                email: profile.email || '',
                numberPhone: profile.phoneNumber || '',
                fullName: profile.fullName || '',
                keyForm: Math.random(),
                avatarImg: profile.avatarUrl ? profile.avatarUrl : '/assets/images/avatar_icon.svg'
            });
        }
    }

    private async onSubmit(event: any) {
        try {
            event.preventDefault();
            this.dataRequestUpdateProfile.avatarUrl = this.state.avatarImg
            const response = await sendUpdateProfile(this.dataRequestUpdateProfile);
            if (response.status === 200) {
                await getUserData();
                toastUtil.success('Cập nhật thành công');
            }
        } catch (e) {
            console.error(e)
        }
    };

    @observable images: any;
    handleChange = (e: any) => {
        if (e.target.files[0]) {
            this.images = e.target.files[0];
            this.handleUpload()
        }
    }

    handleUpload = () => {
        const uploadTask = storage.ref(`images/${this.images.name}`).put(this.images);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images")
                    .child(this.images.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            avatarImg: url
                        })
                    });
            }
        )
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
                            onChange={(e: any) => this.handleChange(e)}
                            type="file"/></button>
                    </div>
                    <div className="content">
                        <h4>Thiết lập ảnh đại diện</h4>
                        <p>Nếu bạn chưa thiết lập, ảnh đại diện của bạn sẽ được hệ thống mặc định hiển thị.</p>
                        <span>Định dạng JPEG, JPG, PNG)</span>
                    </div>
                </div>
                <div className="form_content_account">
                    <Form onSubmit={(e: any) => this.onSubmit(e)}>
                        <FormGroup className="name">
                            <label>Họ và tên</label>
                            <div className="d-flex align-items-center">
                                <Input type="text" className="border"
                                       onChange={(e: any) => this.dataRequestUpdateProfile.fullName = e.currentTarget.value}
                                       validations={[
                                           new Validations(Validations.minLength(6), 'Tên phải có tối thiểu 6 ký tự'),
                                           new Validations(Validations.maxLength(50), 'Tên có tối đa 50 ký tự')
                                       ]}
                                       defaultValue={this.state.fullName}/>
                                <Feedback invalid={"true"}/>
                            </div>
                        </FormGroup>
                        <div className="phone">
                            <label>Số điện thoại</label>
                            <div className="d-flex align-items-center" key={formatNumberPhone(this.state.numberPhone)}>
                                <input type="text"  className="border" onChange={(e: any) => this.dataRequestUpdateProfile.phoneNumber = e.currentTarget.value}
                                       defaultValue={formatNumberPhone(this.state.numberPhone)}/>
                            </div>
                        </div>
                        <div className="email">
                            <label>Email</label>
                            <div className="d-flex align-items-center" key={this.state.email}>
                                <input type="text" defaultValue={this.state.email} className="border"
                                       disabled={true}/>
                            </div>
                        </div>
                        <div className="email">
                            <label>Address</label>
                            <div className="d-flex align-items-center" key={this.dataRequestUpdateProfile.address}>
                                <input type="text" defaultValue={this.dataRequestUpdateProfile.address} className="border"
                                       onChange={(e: any) => this.dataRequestUpdateProfile.address = e.currentTarget.value} />
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
                        <Button className="btn update" type={"submit"}>Lưu Lại</Button>
                    </Form>
                </div>
            </div>
        </div>;
    }
}
