import * as API from "../../api";
import {IReqOptions} from "../../api";

function getRequest(path: string, isNeedAuthen: boolean = true, options?: IReqOptions): Promise<API.IApiResponse<any>> {
    return API.getRequest(path, isNeedAuthen, options);
}

function postRequest(path: string, params: object, isNeedAuthen: boolean = true, options?: IReqOptions): Promise<API.IApiResponse<any>> {
    return API.postRequest(path, isNeedAuthen, params, options);
}

function putRequest(path: string, params: object, isNeedAuthen: boolean = true, options?: IReqOptions): Promise<API.IApiResponse<any>> {
    return API.putRequest(path, isNeedAuthen, params, options);
}

function deleteRequest(path: string, params: object, isNeedAuthen: boolean = true, options?: IReqOptions): Promise<API.IApiResponse<any>> {
    return API.deleteRequest(path, isNeedAuthen, params, options);
}

function handleHttpUnauthorized() {
    API.handleHttpUnauthorized();
}

export {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    handleHttpUnauthorized,
}

export interface IApiResponse extends API.IApiResponse<any> {
}