import {getRequest, IApiResponse, putRequest, deleteRequest, postRequest} from "../index";
import {IReqChangePass, IReqLogin, IReqRegister} from "./interfaces/request";
import {IResLogin, IResProfile} from "./interfaces/response";

function sendLogin(params: IReqLogin): Promise<IApiResponse<IResLogin>> {
    return postRequest('v1/auth/login', false, params);
}

function getAccount(): Promise<IApiResponse<IResProfile>> {
    return getRequest("v1/accounts/profile");
}

function sendLogout(refreshToken: string): Promise<IApiResponse<any>> {
    return deleteRequest('v1/auth/logout', true, {refreshToken: refreshToken})
}

function sendRegister(params: IReqRegister): Promise<IApiResponse<any>> {
    return postRequest('v1/auth/register', false, params);
}


function sendVerifyAccount(params: { username: string, code: string }): Promise<IApiResponse<any>> {
    return putRequest('v1/auth/verify', false, params);
}

function sendReSendOtp(username: string): Promise<IApiResponse<any>> {
    return postRequest('v1/auth/resend_code?type=REG', false, {username: username})
}


function sendOtpForgetPass(username: any): Promise<IApiResponse<any>> {
    return postRequest('v1/auth/forgot_password?collection=send_otp', false, {username: username})
}

function sendVerifyOtpForgetPass(data: any): Promise<IApiResponse<any>> {
    return postRequest('v1/auth/forgot_password?collection=check_otp', false, data);
}

function sendChangePass(params: any): Promise<IApiResponse<any>> {
    return putRequest('v1/auth/forgot_password?collection=update_password', false, params);
}

function sendReActAccRegister(username: string): Promise<IApiResponse<any>> {
    return postRequest('v1/auth/resend_code', false, {username: username});
}

export {
    sendLogin,
    getAccount,
    sendLogout,
    sendRegister,
    sendVerifyAccount,
    sendReSendOtp,
    sendOtpForgetPass,
    sendVerifyOtpForgetPass,
    sendChangePass,
    sendReActAccRegister
}
