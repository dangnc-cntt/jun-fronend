import {observable} from "mobx";
import {getRequest} from "../../common/helpers/RequestHelper";

class HomeStore{
    @observable page: number = 0;
    @observable totalPages: number = 0;
    @observable isLoading: boolean = false;
    @observable isLoadingBt: boolean = false;
    @observable listProductAll: any[] = [];
    @observable listProductHot: any[] = [];


    async getProductAll(){
        try {
            const result = await getRequest(`v1/products?page=${this.page}&size=30`);
            if(result.status === 200){
                this.listProductAll = result.body.data;
                this.totalPages = result.body.metadata.totalPages;
            }
        }catch (e) {
            return true
        }
    }

    async getProductCate(id: number){
        try {
            const result = await getRequest(`v1/products?categoryId=${id}&page=0&size=12`);
            if(result.status === 200){
                this.listProductHot = result.body.data;
            }
        }catch (e) {
            return true
        }
    }

    async getProductHot(){
        try {
            const result = await getRequest(`v1/products?isHot=true&page=0&size=12`);
            if(result.status === 200){
                this.listProductHot = result.body.data;
            }
        }catch (e) {
            return true
        }
    }
}

export const homeStore = new HomeStore();