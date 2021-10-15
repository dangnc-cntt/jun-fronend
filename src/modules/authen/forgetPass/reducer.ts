import {forgetPassStore} from "./store";
import {sendChangePass, sendForgetPassword, sendVerifyOtpForgetPass} from "../../../api/auth";
import {toastUtil} from "../../../common/utils/ToastUtil";

export function clearInputTelephone() {
    forgetPassStore.forgetPassError = {phoneError: undefined}
    // document.getElementsByClassName('mess-telephone')[0].innerHTML=""
}

export function clearInputCapcha() {
    forgetPassStore.forgetPassError = {capcha: undefined}
    // document.getElementsByClassName('mess-capcha')[0].innerHTML=""
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
        const filter_phone = /^[0-9-+]+$/;
        const captcha = forgetPassStore.getCapcha
        if (!filter.test(username) && !filter_phone.test(username)) {
            forgetPassStore.forgetPassError = {phoneError: "Vui lòng nhập email hoặc số điện thoại hợp lệ"}

            return false;
        }
        if (!captcha) {
            forgetPassStore.forgetPassError = {capcha: "Vui lòng nhập Capcha"}
            forgetPassStore.buttonLoading = false
            return false;
        }

        const {status, body} = await sendForgetPassword(username, captcha);
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
            // notify.show("Vui lòng nhập mã xác thực",'error')
         
            return false
        }
        const {status, body} = await sendVerifyOtpForgetPass(username, otp);
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
        // notify.show("Vui lòng nhập mật khẩu",'error')
     
        forgetPassStore.buttonLoading = false
        return false
    }
    if (pass.length > 20 || pass.length < 6) {
        forgetPassStore.forgetPassError = {pass: "Mật khẩu phải từ 6 đến 20 kí tự"}
        // notify.show("Mật khẩu phải từ 6 đến 20 kí tự",'error')
     
        forgetPassStore.buttonLoading = false
        return false;
    }
    if (!passConfirm) {
        forgetPassStore.forgetPassError = {passComfirm: "vui lòng xác nhận mật khẩu"}
        // notify.show("Vui lòng xác nhận mật khẩu",'error')
     
        forgetPassStore.buttonLoading = false
        return false
    }
    if (pass !== passConfirm) {
        forgetPassStore.forgetPassError = {passComfirm: "Mật khẩu và mật khẩu xác nhập không giống nhau"}
        // notify.show("Mật khẩu và mật khẩu xác nhận không giống nhau",'error')
     
        forgetPassStore.buttonLoading = false
        return false;
    }

    try {
        const data = {username: username, password: pass, confirmPassword: passConfirm, otp: otp};
        const {status} = await sendChangePass(data);
        if (status > 250) {
            forgetPassStore.buttonLoading = false
        } else {
            // document.getElementsByClassName('mess-forget-pass')[0].innerHTML="Thay đổi mật khẩu thành công"
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
