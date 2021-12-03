import {forgetPassStore} from "./store";
import {sendChangePass, sendOtpForgetPass, sendVerifyOtpForgetPass} from "../../../api/auth";
import {toastUtil} from "../../../common/utils/ToastUtil";

export function clearInputTelephone() {
    forgetPassStore.forgetPassError = {phoneError: undefined}
}

export function clearInputCapcha() {
    forgetPassStore.forgetPassError = {capcha: undefined}
}

export function clearInputPass() {
    forgetPassStore.forgetPassError = {pass: undefined}
}

export function clearInputPassComfirm() {
    forgetPassStore.forgetPassError = {passComfirm: undefined}
}

export async function forgetPassWord() {
    try {
        forgetPassStore.buttonLoading = true
        setTimeout(() => {
            forgetPassStore.buttonLoading = false
        }, 5000);
        const username: string = forgetPassStore.getUserName
        sessionStorage.setItem('username', username)
        const filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(username)) {
            forgetPassStore.forgetPassError = {phoneError: "Email không hợp lệ!"}
            return false;
        }

        const {status, body} = await sendOtpForgetPass(username);
        if (status > 250) {
            forgetPassStore.forgetPassError = {message: body.message}
            forgetPassStore.buttonLoading = false
        } else {
            forgetPassStore.step = 2
            forgetPassStore.buttonLoading = false
        }
    } catch (e) {
        console.error(e);
    }

}

export function enterStep1(e: any) {
    if (e.key === 'Enter') {
        forgetPassWord()
    }
}

export async function checkOtp() {
    try {
        forgetPassStore.buttonLoading = true
        setTimeout(() => {
            forgetPassStore.buttonLoading = false
        }, 5000);
       
        const otp = forgetPassStore.getOtp
        const username = forgetPassStore.getUserName
        if (!otp) {
            forgetPassStore.forgetPassError = {message: "Vui lòng nhập mã xác thực"};
            return false
        }

        let data = {
            username: username,
            code: otp
        }
        const {status, body} = await sendVerifyOtpForgetPass(data);
        if (status > 250) {
            forgetPassStore.forgetPassError = {message: body.message};
            forgetPassStore.buttonLoading = false
        } else {
            forgetPassStore.step = 3
            forgetPassStore.buttonLoading = false
        }
    } catch (e) {
        console.error(e);
    } finally {
     
    }
}

export function enterCheckOtp(e: any) {
    if (e.key === 'Enter') {
        checkOtp()
    }
}

export async function changePassWord() {
    forgetPassStore.buttonLoading = true
    setTimeout(() => {
        forgetPassStore.buttonLoading = false
    }, 5000);
   
    const pass = forgetPassStore.getPass
    const passConfirm = forgetPassStore.getPassConfirm
    const otp = forgetPassStore.getOtp
    const username = forgetPassStore.getUserName
    if (!pass) {
        forgetPassStore.forgetPassError = {pass: "vui lòng nhập mật khẩu"}
        forgetPassStore.buttonLoading = false
        return false
    }
    if (pass.length > 20 || pass.length < 6) {
        forgetPassStore.forgetPassError = {pass: "Mật khẩu phải từ 6 đến 20 kí tự"}
        forgetPassStore.buttonLoading = false
        return false;
    }
    if (!passConfirm) {
        forgetPassStore.forgetPassError = {passComfirm: "vui lòng xác nhận mật khẩu"}
        forgetPassStore.buttonLoading = false
        return false
    }
    if (pass !== passConfirm) {
        forgetPassStore.forgetPassError = {passComfirm: "Mật khẩu và mật khẩu xác nhập không giống nhau"}
        forgetPassStore.buttonLoading = false
        return false;
    }

    try {
        const data = {username: username, password: pass, confirmedPassword: passConfirm, code: otp};
        const {status} = await sendChangePass(data);
        if (status > 250) {
            forgetPassStore.buttonLoading = false
        } else {
            toastUtil.success("Thay đổi mật khẩu thành công")
            forgetPassStore.step = 1;
            forgetPassStore.userName = ""
            forgetPassStore.isShow = false
            forgetPassStore.buttonLoading = false
        }
    } catch (e) {
        console.error(e)
    } finally {
     
    }
}
