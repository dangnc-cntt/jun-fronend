import {observable} from "mobx";
import {getRequest} from "../../common/helpers/RequestHelper";


export enum ISortType {
    asc = "asc",
    desc = "desc"
}

class CategoryStore{
    @observable isLoading: boolean = false;
    @observable isLoadingBt: boolean = false;
    @observable page: number = 0;
    @observable getVote: number = 0;
    @observable minPrice: number = 0;
    @observable maxPrice: number = 0;
    @observable getMinPrice: number = 0;
    @observable getMaxPrice: number = 0;
    @observable sortPrice: number = 0;
    @observable sortType: string = '';
    @observable totalPages: number = 0;
    @observable listCate: any[] = [];
    @observable listCateProduct: any[] = [];

    async getCate(){
        try {
            const result = await getRequest(`v1/categories`);
            if(result.status === 200){
                this.listCate = result.body;
            }
        }catch (e) {
            return true
        }
    }

    async getProductCate(id: any){
        try {
            const result = await getRequest(`v1/products?categoryId=${id}&page=0&size=30${this.sortType ? `&sortType=${this.sortType}` : ''}`);
            if(result.status === 200){
                this.listCateProduct = result.body.data;
                this.totalPages = result.body.metadata.totalPages;
            }
        }catch (e) {
            return true
        }
    }
}

export const categoryStore = new CategoryStore();