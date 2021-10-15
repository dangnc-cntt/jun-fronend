import {postRequest, IApiResponse, getRequest} from "../../common/helpers/RequestHelper";
import StorageService from "../../common/service/StorageService";

class AccountService {
    public login(username: string, password: string): Promise<IApiResponse> {
        return postRequest(`/v1/auth/login`, {username, password});
    }

    public logOut(): Promise<IApiResponse> {
        return postRequest('/v1/auth/logout', {refreshToken: StorageService.getRefreshToken()});
    }

    public getProfile(): Promise<IApiResponse> {
        return getRequest(`/v1/users/profile`)
    }
}

export const accountService = new AccountService();
