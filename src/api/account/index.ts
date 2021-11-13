import {IApiResponse, getRequest, putRequest, postRequest} from "../index";
import {IReqUpdateProfile, IReqChangePass} from "./interfaces/request";

function sendUpdateEmail(email: string): Promise<IApiResponse<any>> {
    return putRequest('v1/users/_me/email', true, {email: email});
}

function sendUpdatePhoneNumber(phoneNumber: string, otp: string): Promise<IApiResponse<any>> {
    return putRequest('v1/users/_me/phone_number', true, {phoneNumber: phoneNumber, otp: otp});
}

function sendUpdateProfile(params: IReqUpdateProfile): Promise<IApiResponse<any>> {
    return putRequest('v1/users/_me', true, params);
}

function sendOtpVerify(phoneNumber: string): Promise<IApiResponse<any>> {
    return postRequest('v1/users/_me/phone_number_code', true, {phoneNumber: phoneNumber});
}

function sendUpdatePassword(params: IReqChangePass) {
    return putRequest('v1/auth/forgot_password?collection=update_password', true, params);
}

function sendCodeChangePass(): Promise<IApiResponse<any>> {
    return getRequest('v1/auth/forgot_password?collection=check_otp');
}

export {
    sendUpdateEmail,
    sendUpdatePhoneNumber,
    sendUpdateProfile,
    sendOtpVerify,
    sendUpdatePassword,
    sendCodeChangePass
}
