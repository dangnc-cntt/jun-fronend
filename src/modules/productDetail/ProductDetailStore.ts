import {observable} from "mobx";
import {productDetailService} from "./ProductDetailService";

class ProductDetailStore{
    @observable isLoading: boolean = false;
    @observable productDetail: any

    async getProductDetail(id: any){
        this.isLoading = true;
        const result = await productDetailService.getProductDetail(id)
        this.isLoading = false;
        if(result.status === 200){
            this.productDetail = result.body
        }
    }
}

export const productDetailStore = new ProductDetailStore();