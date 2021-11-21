import {IApiResponse, getRequest, putRequest} from "../index";
import {IReqUpdateProfile, IReqChangePass} from "./interfaces/request";
import {LoginStore} from "../../modules/authen/LoginSignUp/Store/LoginStore";


function sendUpdateProfile(params: IReqUpdateProfile): Promise<IApiResponse<any>> {
    return putRequest('v1/accounts', true, params);
}


function sendUpdatePassword(params: IReqChangePass) {
    return putRequest('v1/auth/forgot_password?collection=update_password', true, params);
}

function sendChangePass(params: any): Promise<IApiResponse<any>> {
    return putRequest('v1/accounts/change_password?collection=update_password', true, params);
}


export {
    sendUpdateProfile,
    sendUpdatePassword,
    sendChangePass
}
