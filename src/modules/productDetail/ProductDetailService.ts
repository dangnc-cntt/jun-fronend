import {getRequest, IApiResponse} from "../../common/helpers/RequestHelper";

class ProductDetailService{
    public getProductDetail(id: number): Promise<IApiResponse>{
        return getRequest(``)
    }
}

export const productDetailService = new ProductDetailService();