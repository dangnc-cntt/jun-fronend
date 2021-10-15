import humps from 'humps';
import axios, {Method} from "axios";
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import $ from 'jquery'
import StorageService from "../service/StorageService";
import HttpStatusCode from "../constants/HttpErrorCode";
import Constants from "../constants/Constants";
import {toastUtil} from "../utils/ToastUtil";

export interface IApiResponse {
    readonly status: number;
    readonly body: any;
}

export interface IBodyError {
    readonly errorCode: number;
    readonly message: string
}

// @ts-ignore
const refreshAuthLogic = failedRequest => axios.post(Constants.API_URL + '/v1/auth/refreshToken', {'refreshToken': StorageService.getRefreshToken()}).then(tokenRefreshResponse => {
    StorageService.setToken(tokenRefreshResponse.data.refreshToken);
    failedRequest.response.config.headers[Constants.TOKEN_NAME] = tokenRefreshResponse.data.refreshToken;
    return Promise.resolve();

}).catch(function (error) {
    StorageService.removeToken();
    StorageService.removeRefreshToken()
    window.location.href = "/"
    return Promise.reject();
});

export async function getRequest(path: string): Promise<IApiResponse> {
    var newHeaders: any = {'Content-Type': 'application/json'};

    if (StorageService.isTokenExits()) {
        newHeaders[Constants.TOKEN_NAME] = StorageService.getToken();
        createAuthRefreshInterceptor(axios, refreshAuthLogic, {
            pauseInstanceWhileRefreshing: true
        });
    }

    return await axios.get(Constants.API_URL + path, {headers: newHeaders})
        .then(
            (response) => {

                const apiResponse: IApiResponse = {
                    status: response.status,
                    body: humps.camelizeKeys(response.data),
                };
                return apiResponse;
            },
            (error) => {
                // StorageService.removeToken();
                if (error.response && error.response.status === HttpStatusCode.UNAUTHORIZED || error.response.data.message == "Invalid authentication 4") {
                    toastUtil.error('Token expire');
                    // StorageService.removeToken();
                    // window.location.href = "/"
                }

                let bodyError: IBodyError;
                try {
                    bodyError = {
                        errorCode: error.response.data.errorCode,
                        message: error.response.data.message
                    }
                } catch (e) {
                    bodyError = {
                        errorCode: HttpStatusCode.UNKNOW_ERROR,
                        message: "Unknow error, please try again later"
                    }
                }

                const apiResponse: IApiResponse = {
                    status: error.response.status,
                    body: bodyError
                };
                return apiResponse;
            }
        );
}

export async function postRequest(path: string, params: object): Promise<IApiResponse> {
    return apiCall(path, "POST", params);
}

export function apiCall(path: string, _method: Method = "POST", _params: object): Promise<IApiResponse> {
    var newHeaders: any = {'Content-Type': 'application/json'};

    if (StorageService.isTokenExits()) {
        newHeaders[Constants.TOKEN_NAME] = StorageService.getToken();
        createAuthRefreshInterceptor(axios, refreshAuthLogic, {
            pauseInstanceWhileRefreshing: true
        });
    }

    return new Promise<IApiResponse>((resolve) => {
        axios({
            data: JSON.stringify(_params),
            headers: newHeaders,
            method: _method,
            url: Constants.API_URL + path
        })
            .then(function (response) {
                resolve({
                    status: response.status,
                    body: humps.camelizeKeys(response.data),
                });
            })
            .catch(function (error) {
            if (error.response && error.response.status === HttpStatusCode.UNAUTHORIZED || error.response.data.message == "Invalid authentication 4") {
                toastUtil.error('Token expire');
                // StorageService.removeToken();
                // window.location.href = "/"
            }

            let bodyError: IBodyError;
            try {
                if (error.response && error.response.status === HttpStatusCode.INTERNAL_SERVER_ERROR) {
                    bodyError = {
                        errorCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
                        message: "Internal server error, please try again later"
                    }
                } else {
                    bodyError = {
                        errorCode: error.response.data.errorCode,
                        message: error.response.data.message
                    }
                }

            } catch (e) {
                bodyError = {
                    errorCode: HttpStatusCode.UNKNOW_ERROR,
                    message: "Unknow error, please try again later"
                }
            }

            const apiResponse: IApiResponse = {
                status: error.response.status,
                body: bodyError
            };

            resolve(apiResponse);
        });

    });
}

export async function putRequest(path: string, params: object): Promise<IApiResponse> {
    return apiCall(path, "PUT", params);
}

export async function deleteRequest(path: string, params: object): Promise<IApiResponse> {

    return apiCall(path, "DELETE", params);
}

export async function exportData(path: string, name: string): Promise<any> {
    var newHeaders: any = {'Content-Type': 'text/html'};

    if (StorageService.isTokenExits()) {
        newHeaders[Constants.TOKEN_NAME] = StorageService.getToken();
        createAuthRefreshInterceptor(axios, refreshAuthLogic, {
            pauseInstanceWhileRefreshing: true
        });
    }

    return await axios.get(Constants.API_URL + path, {headers: newHeaders, responseType: "blob"})
        .then(
            (response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', `${name}.xlsx`)
                document.body.appendChild(link)
                link.click();
                $('#close_add').trigger('click')
                toastUtil.success('Successful data export');
            },
            (error) => {
                toastUtil.error(error.response.data.message)
            }
        );
}