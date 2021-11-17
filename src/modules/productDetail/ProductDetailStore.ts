import {observable} from "mobx";
import {productDetailService} from "./ProductDetailService";
import {toastUtil} from "../../common/utils/ToastUtil";
import StorageService from "../../common/service/StorageService";

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
    @observable amount: number = 0;
    @observable imagesActive: number = 0;
    @observable productDetail: IProduct = {
        "id": 4,
        "code": "023",
        "name": "Sản phẩm bán chạy nhất tháng",
        "imageUrls": [
            "https://firebasestorage.googleapis.com/v0/b/jun-shop-1eabc.appspot.com/o/images%2Fbanner_header.jpg?alt=media&token=f3785cfb-a030-4ed9-832c-0c0bbcef4d2d",
            "https://firebasestorage.googleapis.com/v0/b/jun-shop-1eabc.appspot.com/o/images%2Flogo_in.png?alt=media&token=7f932371-3c18-4ec5-a7cf-4e2fba569a13"
        ],
        "description": "Sản phẩm bán chạy nhất tháng",
        "state": "ACTIVE",
        "categoryId": 1,
        "isHot": false,
        "costPrice": 23.0,
        "price": 0.0,
        "discount": 3.0,
        "star": 0.0,
        "createdBy": 2,
        "optionList": [
            {
                createdAt: "",
                updatedAt: '',
                "id": 2,
                "color": {
                    "id": 1,
                    "name": "Vàng"
                },
                isActive: false,
                "productId": 4,
                "size": {
                    "id": 3,
                    "name": "M"
                },
                "amount": 0
            },
            {
                createdAt: "",
                updatedAt: '',
                "id": 3,
                "color": {
                    "id": 2,
                    "name": "Đỏ"
                },
                isActive: false,
                "productId": 4,
                "size": {
                    "id": 3,
                    "name": "M"
                },
                "amount": 10
            }
        ]
    }

    async getProductDetail(id: any){
        this.isLoading = true;
        const result = await productDetailService.getProductDetail(id)
        this.isLoading = false;
        if(result.status === 200){
            this.productDetail = result.body
        }
    }

    async addToCart( optionId: any){
        if(!optionId){
            toastUtil.warning("Vui lòng chọn phân loại sản phẩm")
            return false
        }
        this.isLoadingButton = true;
        const result = await productDetailService.addToCart(productDetailStore.productDetail.id, optionId);
        this.isLoadingButton = false;
        if(result.status === 200){
            toastUtil.success('Thêm sản phẩm thành công')
        }
    }


}

export const productDetailStore = new ProductDetailStore();