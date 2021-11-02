import {signUpStore} from '../Store/SignUpStore'
import {LoginStore} from "../Store/LoginStore";
import {sendRegister, sendVerifyAccount, sendReSendOtp} from "../../../../api/auth";
import {toastUtil} from "../../../../common/utils/ToastUtil";

export function setEmail(e: any) {
    signUpStore.email = e.target.value;
    signUpStore.errorSignUp = {email: undefined}
}

export function clearInputName() {
    signUpStore.errorSignUp = {names: undefined}
}

export function setPassValueSignUp(e: any) {
    signUpStore.passWord = e.target.value
    signUpStore.errorSignUp = {pass: undefined}
}

export function setPassConFirm(e: any) {
    signUpStore.pasWordConFirm = e.target.value
    signUpStore.errorSignUp = {passConFirm: undefined}
}

export async function resendCode() {
    try {
        signUpStore.buttonLoading = true
        const x = setInterval(() => {
            if (signUpStore.getTimeSpam !== 0) {
                signUpStore.timeSpam = signUpStore.getTimeSpam - 1
            } else {
                signUpStore.isSpam = false;
                signUpStore.timeSpam = (window as any).DELAY_SEND_OTP_TIME
                clearInterval(x)
            }

        }, 1000)
        let userName: string = signUpStore.getUserName;
        const {status} = await sendReSendOtp(userName);
        if (status < 300) {
            toastUtil.success('Mã xác nhận đã được gửi ')
        }
        setTimeout(() => {
            signUpStore.buttonLoading = false
        }, 5000);
    } catch (e) {
        console.error(e);
    }
}

export async function signUp() {
    let userName: string = signUpStore.getUserName;
    let passWord: string = signUpStore.getPassWord;
    let email: string = signUpStore.email;
    let passWordConfirm: string = signUpStore.getPassWordConFirm;
    let filter: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var type!: string;
    const fullName = signUpStore.getFullName;

    if (!fullName) {
        signUpStore.errorSignUp = {names: "Vui lòng nhập tên hiển thị"};
        signUpStore.buttonLoading = false;
        return false;
    }
    if (fullName.length < 6 || fullName.length > 50) {
        signUpStore.errorSignUp = {names: "Tên hiển thị phải từ 6 đến 50 kí tự"};
        signUpStore.buttonLoading = false;
        return false;
    }
    if (!filter.test(email)) {
        signUpStore.errorSignUp = {userName: "Vui lòng nhập email hợp lệ"};
        signUpStore.buttonLoading = false;
        return false;
    }
    if (passWord == null || passWord == "") {
        signUpStore.errorSignUp = {pass: "Mật khẩu không được bỏ trống"};
        signUpStore.buttonLoading = false;
        return false;
    }
    if (filter.test(email)) {
        type = "email"
    }

    if (passWord.length > 20 || passWord.length < 6) {
        signUpStore.errorSignUp = {pass: "Mật khẩu phải từ 6 đến 20 kí tự"};
        signUpStore.buttonLoading = false;
        return false;
    }
    if (passWord != passWordConfirm) {
        signUpStore.errorSignUp = {passConFirm: "Mật khẩu và mật khẩu xác nhận không giống nhau"};
        signUpStore.buttonLoading = false;
        return false;
    }

    let data: object = {
        'username': userName,
        'password': passWord,
        'confirmPassword': passWordConfirm,
        'email': email,
        "fullName": fullName,
    };

    try {
        signUpStore.buttonLoading = true;
        const {status, body} = await sendRegister(data as any);
        signUpStore.buttonLoading = false;
        if (status > 250) {
            signUpStore.errorSignUp = {message: body.message};
        } else {
            signUpStore.isSignUpForm = false;
            signUpStore.typeUser = type;
            console.log(signUpStore.typeUser)
        }
    } catch (e) {
        console.error(e);
    }
}

export function getOtp(e: any) {
    const otp: number = e.target.value;
    signUpStore.Otp = otp
}

export async function checkOtp() {
    try {
        signUpStore.buttonLoading = true;
        const username: string = signUpStore.getUserName;
        const otp: number = signUpStore.getOtp;
        const data = {username: username, code: otp + ''};
        const {status} = await sendVerifyAccount(data);
        if (status < 300) {
            toastUtil.success('Tạo tài khoản thành công');
            LoginStore.isShowLoginForm = true;
            signUpStore.typeUser = '';
            signUpStore.codeRef = '';
        }
        setTimeout(() => {
            signUpStore.buttonLoading = false
        }, 5000);
    } catch (e) {
        console.error(e);
    }
}

