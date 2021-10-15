import {computed, observable} from 'mobx';
import {IResContact, IResProfile} from "../../../../api/auth/interfaces/response";

export interface IApiResponse {
    readonly name: string | number;
    readonly avatarUrl: string;
    user: { id: number, email: string }
}

class Store {
    @observable public isShowLoginForm = false;
    @observable statusEye: boolean = false;
    @observable public username = "";
    @observable public password = "";
    @observable public redirect: boolean = true;
    @observable public userData: null | IResProfile = null;
    @observable public isManageShow: boolean = false;
    @observable public contacts?: IResContact[];

    @computed get getIsShowLoginForm() {
        return this.isShowLoginForm;
    }

    @computed get getUserName() {
        return this.username;
    }

    @computed get getPassWord() {
        return this.password;
    }

    @computed get getUserData() {
        return this.userData;
    }

    @computed get getContactsData() {
        return this.contacts;
    }

    @observable public buttonLoading: boolean = false;

    @computed get getButtonLoading() {
        return this.buttonLoading
    }

    @observable public isVerifyForm: boolean = false;

    @computed get getIsVerifyForm() {
        return this.isVerifyForm
    }

    @observable public Formerror?: {
        name?: string,
        pass?: string,
        message?: string,
    };

    @computed get getIsFormerror() {
        return this.Formerror
    }
}

export const LoginStore = new Store();
