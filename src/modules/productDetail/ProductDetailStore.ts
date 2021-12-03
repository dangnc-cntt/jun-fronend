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
    @observable page: number = 0;
    @observable totalPages: number = 0;
    @observable imagesActive: number = 0;
    @observable productDetail?: IProduct;
    @observable listReview: any[] = [];

    async getProductDetail(id: any){
        this.isLoading = true;
        const result = await productDetailService.getProductDetail(id)
        this.isLoading = false;
        if(result.status === 200){
            this.productDetail = result.body;
            this.getReviewProduct(result.body.id)
        }
    }

    async getReviewProduct(id: any){
        const result = await productDetailService.reviewProduct(id)
        if(result.status === 200){
            this.listReview = result.body.data;
            this.totalPages = result.body.metadata.totalPages;
        }
    }

}

export const productDetailStore = new ProductDetailStore();