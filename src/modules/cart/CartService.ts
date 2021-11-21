import {getRequest, IApiResponse, postRequest, putRequest} from "../../api";


class CartService{

    public getCart(): Promise<IApiResponse<any>>{
        return getRequest(`v1/cart`)
    }

    public addToCart(id: number, optionId: number, amount: any):  Promise<IApiResponse<any>>{
        return postRequest(`v1/cart`, true,{id, optionId, amount})
    }

    public deleteCart(data: any[]): Promise<IApiResponse<any>>{
        return putRequest(`v1/cart`, true, data)
    }

}

export const cartService = new CartService();