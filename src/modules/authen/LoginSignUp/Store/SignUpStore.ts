import {computed, observable} from 'mobx';

class SignUpStore {
    @observable public isSignUpForm: boolean = false;
    @observable public isLoading: boolean = false;
    @observable public userName: string = "";
    @observable public email: string = "";
    @observable public passWord: string = "";
    @observable public codeRef: string = "";
    @observable public pasWordConFirm: string = "";
    @observable public typeUser: string = '';
    @observable public Otp!: number;
    @observable public refCode: string = "";
    @observable public errorRefCode: string = "";
    @observable public isShowRefCode: boolean = false;

    @computed get getIsShowSignUpForm() {
        return this.isSignUpForm;
    }

    @observable public fullName: string = '';

    @computed get getFullName() {
        return this.fullName
    }

    @computed get getUserName() {
        return this.userName
    }

    @computed get getPassWord() {
        return this.passWord
    }

    @computed get getPassWordConFirm() {
        return this.pasWordConFirm
    }


    @computed get getOtp() {
        return this.Otp
    }

    @observable public buttonLoading: boolean = false

    @computed get getButtonLoading() {
        return this.buttonLoading
    }

    @observable public capCha?: string

    @computed get getCapCha() {
        return this.capCha
    }

    @observable public timeSpam: number = (window as any).DELAY_SEND_OTP_TIME

    @computed get getTimeSpam() {
        return this.timeSpam
    }

    @observable public isSpam: boolean = false;

    @computed get getIsSpam() {
        return this.isSpam
    }

    @observable public linkPolicy?: string

    @computed get getLinkPolicy() {
        return this.linkPolicy
    }

    @observable public errorSignUp?: {
        names?: string
        userName?: string
        pass?: string
        passConFirm?: string
        email?: string
        message?: string
    }

    @computed get getIsErrorSingUp() {
        return this.errorSignUp
    }
}

export const signUpStore = new SignUpStore();