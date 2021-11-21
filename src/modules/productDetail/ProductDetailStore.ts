import {observable} from "mobx";
import {productDetailService} from "./ProductDetailService";
import {toastUtil} from "../../common/utils/ToastUtil";
import StorageService from "../../common/service/StorageService";
import {cartService} from "../cart/CartService";

interface IProduct{
    "id": number,
    "code":  string,
    "name": string,
    "imageUrls": string[],
    "description": string,
    "state": string,
    "categoryId": number,
    "isHot": boolean,
    "costPrice": number,
    "price": number,
    "discount": number,
    "star": number,
    "createdBy": number,
    "optionList": {
        "createdAt": any,
        "updatedAt": any,
        "id": number,
        "isActive": boolean
        "color": {
            "id": number,
            "name": string
        },
        "productId": number,
        "size": {
            "id": number,
            "name": string
        },
        "amount": number
    }[]
}

class ProductDetailStore{
    @observable isLoading: boolean = false;
    @observable isLoadingButton: boolean = false;
    @observable quantity: number = 1;
    @observable amount: number = -1;
    @observable imagesActive: number = 0;
    @observable productDetail?: IProduct;

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