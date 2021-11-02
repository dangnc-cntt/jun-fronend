import {LoginStore} from '../Store/LoginStore';
import $ from 'jquery';
import {signUpStore} from '../Store/SignUpStore';
import {resendCode} from "./SignUpReducer";
import {eraseCookie} from "../../../../common/utils/Utils";
import {getAccount, sendLogin, sendLogout, sendReActAccRegister} from "../../../../api/auth";
import {toastUtil} from "../../../../common/utils/ToastUtil";

export function setUserNameValue(e: any) {
  LoginStore.username = e.target.value;
  LoginStore.Formerror = undefined
}

export function setPassValue(e: any) {
  LoginStore.password = e.target.value;
  LoginStore.Formerror = undefined
}

export async function Login() {
  let userName: string = LoginStore.getUserName;
  let passWord: string = LoginStore.getPassWord;

  if (userName === "") {
    LoginStore.Formerror = {name: 'Tên đăng nhập không được để trống'};
    return false;
  }
  if (passWord === "") {
    LoginStore.Formerror = {pass: "Mật khẩu không được để trống"};
    return false;
  }
  if (passWord.length > 24 || passWord.length < 6) {
    LoginStore.Formerror = {pass: "Mật khẩu phải từ 6 đến 24 kí tự"};
    return false;
  }

  const formData = {'username': userName, 'password': passWord};

  try {
    LoginStore.buttonLoading = true;
    const {status, body: {message, accessToken, statusCode, refreshToken}} = await sendLogin(formData);
    if (status > 300 && status !== 400) {
      if (status === 401 && statusCode) {
        toastUtil.error(`${message}`);
        if (statusCode === 1001) {
        } else {
          if (statusCode === 1002) {
            await resendActiveAccount();
            await resendCode();
            LoginStore.isShowLoginForm = false;
          } else {
            if (statusCode === 1003) {
            }
          }
        }
      } else {
        LoginStore.Formerror = {message: message};
        LoginStore.buttonLoading = false
      }
    } else {
      if (status === 400) {
        LoginStore.buttonLoading = false;
        LoginStore.isShowLoginForm = false;
        LoginStore.isVerifyForm = true;
      } else {
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken)
        toastUtil.success(`Đăng nhập thành công`);
        LoginStore.buttonLoading = false;
        LoginStore.isShowLoginForm = false;
        $('.header__overlay').hide();
        await getUserData();
      }

    }
  } catch (e) {
    console.error(e);
  } finally {
    LoginStore.buttonLoading = false;
  }
}

export function enterLogin(e: any) {
  if (e.key === 'Enter') {
    Login()
  }
}

export async function getUserData() {
  try {
    const {status, body} = await getAccount();
    if (status > 250) {
      toastUtil.warning('Tài khoản đã đăng nhập ở nơi khác');
      localStorage.removeItem("token");
      window.location.href = '/';
    } else {
      LoginStore.userData = body;
      // getListContact();
    }
  } catch (e) {
    console.error(e);
  }
}


export async function updateFcmToken() {
  // if (messaging && localStorage.getItem('notification-permission') === "1") {
  //   let fcmToken = localStorage.getItem('fcm-token');
  //   if (fcmToken) await sendFcmToken(fcmToken);
  // }
}

export async function resendActiveAccount() {
  LoginStore.isVerifyForm = false
  signUpStore.userName = LoginStore.getUserName
  let userName: string = LoginStore.getUserName;

  let filter: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  let filter_phone: RegExp = /^[0-9-+]+$/;
  var type!: string;
  if (filter.test(userName)) {
    type = "email"
  }
  ;
  if (filter_phone.test(userName)) {
    type = "phone"
  }
  ;
  signUpStore.typeUser = type
}

export async function resendActiveAccountRegister() {
  try {
    LoginStore.isVerifyForm = false
    let userName: string = signUpStore.getUserName;
    await sendReActAccRegister(userName);
    let filter: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let filter_phone: RegExp = /^[0-9-+]+$/;
    let type!: string;
    if (filter.test(userName)) {
      type = "email"
    }
    if (filter_phone.test(userName)) {
      type = "phone"
    }
    signUpStore.typeUser = type
  } catch (e) {
    console.error(e);
  }
}

export async function logOut() {
  try {
    const {status} = await sendLogout(localStorage.getItem('refreshToken') as string);
    if (status < 300) {
      LoginStore.userData = null;
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      if (LoginStore.redirect) {
        window.location.href = "/";
      }
    }
  } catch (e) {
    console.error(e);
  }
}

export function changeTypePasswordInput(status_password: boolean): string {
  if (status_password) return "text"; else return "password";
}
