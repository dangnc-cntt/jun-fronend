import Axios, {AxiosError, Method} from "axios";
import humps from "humps";
import $ from "jquery";
import * as Sentry from "@sentry/browser";
import {LoginStore} from "../modules/authen/LoginSignUp/Store/LoginStore";
import {toastUtil} from "../common/utils/ToastUtil";

export interface IApiResponse<T> {
  status: number
  body: T
}

export interface IMetadata {
  page: number,
  size: number,
  total: number,
  totalPage: number
}

export interface IMetaData {
  page: number,
  size: number,
  total: number,
  totalPages: number
}

export interface IReqOptions {
  enableNotify?: boolean
  ignoreErrorMessage?: string
}

const baseURL: string = (window as any).API_DOMAIN;
const TOKEN_NAME: string = "x-jun-token";

function getRequest(url: string, isToken: boolean = true, options?: IReqOptions): Promise<IApiResponse<any>> {
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  if (isToken) headers[TOKEN_NAME] = localStorage.getItem('token') || "";
  return new Promise<any>(resolve => {
    Axios.get(
      baseURL + url,
      isToken ? {headers: headers} : undefined
    )
      .then(next => {
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status
        })
      })
      .catch(error => {
        try {
          resolve({
            status: error.response.status,
            body: humps.camelizeKeys(error.response.data)
          });
          handleRequestError(error, options);
        } catch (e) {
          resolve({
            status: 500,
            body: e
          });
        }
      });
  });
}

function apiCall(url: string, method: Method, isToken: boolean = true, data?: { [key: string]: any }, options?: IReqOptions): Promise<IApiResponse<any>> {
  const headers: { [key: string]: string } = {};
  headers['Content-Type'] = 'application/json';
  if (isToken) headers[TOKEN_NAME] = localStorage.getItem('token') || "";
  return new Promise<any>(resolve => {
    Axios(
      {
        url: baseURL + url,
        method: method,
        headers: headers,
        data: data ? JSON.stringify(data) : undefined
      }
    )
      .then(next => {
        resolve({
          body: humps.camelizeKeys(next.data),
          status: next.status
        })
      })
      .catch(error => {
        try {
          resolve({
            status: error.response.status,
            body: humps.camelizeKeys(error.response.data)
          });
          handleRequestError(error, options);
        } catch (e) {
          resolve({
            status: 500,
            body: e
          });
        }
      });
  });
}

function postRequest(url: string, isToken: boolean = true, data?: { [key: string]: any }, options?: IReqOptions): Promise<IApiResponse<any>> {
  return apiCall(url, "POST", isToken, data, options);
}

function putRequest(url: string, isToken: boolean = true, data?: { [key: string]: any }, options?: IReqOptions) {
  return apiCall(url, "PUT", isToken, data, options);
}

function deleteRequest(url: string, isToken: boolean = true, data?: { [key: string]: any }, options?: IReqOptions) {
  return apiCall(url, "DELETE", isToken, data, options);
}

function sendUploadImage(files: File, path: 'uploadProfile' | 'uploadProduct' | 'uploadCover'): Promise<string> {
  const headers: { [key: string]: string } = {};
  headers[TOKEN_NAME] = localStorage.getItem('token') || "";
  const data = new FormData();
  data.append('file', files as File);
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `${baseURL}/v1/users/storage/${path}`,
      data: data,
      headers: headers,
      enctype: 'multipart/form-data',
      type: 'POST',
      processData: false,
      contentType: false,
      success: function (data) {
        resolve(data.url);
      },
      error: function (error) {
        reject(error);
      }
    });
  })
}

function handleRequestError(error: AxiosError, options?: IReqOptions) {
  try {

    const enableNotify = options && options.enableNotify !== undefined ? options.enableNotify : true;
    const ignoreErrorMessage: string | undefined = options ? options.ignoreErrorMessage : undefined;

    if (error.response) {
      const {status, data} = error.response;
      if (status === 401) {
        handleHttpUnauthorized();
      }

      let message = data.error ? data.error.details : data.message;
      if (typeof message === "string") {
        if (enableNotify && message !== ignoreErrorMessage) {
          const regx = new RegExp(/^(invalid authen|an invalid response|an unexpected|query did)/i);
          if (regx.test(message)) message = "Không nhận được phản hồi từ máy chủ, vui lòng kiểm tra đường truyền.";
          toastUtil.error(message);
        }
      } //
      else {
        Sentry.captureException(error);
        if (enableNotify) {
          toastUtil.error("Không nhận được phản hồi từ máy chủ, vui lòng kiểm tra đường truyền.");
        }
      }
    } //
    else if (enableNotify) {
      toastUtil.error("Không nhận được phản hồi từ máy chủ, vui lòng kiểm tra đường truyền.");
    }
  } catch (e) {
    console.error(e);
    toastUtil.error("Không nhận được phản hồi từ máy chủ, vui lòng kiểm tra đường truyền.");
  }
}

function handleHttpUnauthorized() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  LoginStore.userData = null;
  LoginStore.contacts = undefined;
  // if (messaging) {
  //   const fcm_token: string = localStorage.getItem('fcm-token') || '';
  //   fcm_token && messaging.deleteToken(fcm_token);
  // }
}

export {
  getRequest,
  postRequest,
  putRequest,
  deleteRequest,
  sendUploadImage,
  handleRequestError,
  handleHttpUnauthorized
}
