import {getRequest, IApiResponse, postRequest} from "../../common/helpers/RequestHelper";


class ProductDetailService{
    public getProductDetail(id: number): Promise<IApiResponse>{
        return getRequest(`v1/products/${id}`)
    }

    public reviewProduct(productId: number): Promise<IApiResponse>{
        return getRequest(`v1/reviews/${productId}`)
    }
}

export const productDetailService = new ProductDetailService();