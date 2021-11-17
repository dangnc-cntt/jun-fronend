import {getRequest, IApiResponse, postRequest} from "../../common/helpers/RequestHelper";


class ProductDetailService{
    public getProductDetail(id: number): Promise<IApiResponse>{
        return getRequest(`v1/products/${id}`)
    }

    public addToCart(id: number, optionId: number): Promise<IApiResponse>{
        return postRequest(`v1/cart`, {id, optionId})
    }
}

export const productDetailService = new ProductDetailService();