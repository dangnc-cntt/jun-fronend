import {observable} from "mobx";
import {productDetailService} from "./ProductDetailService";

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
    @observable quantity: number = 1;
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
            // this.productDetail = result.body
        }
    }
}

export const productDetailStore = new ProductDetailStore();