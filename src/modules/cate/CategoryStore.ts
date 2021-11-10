import {observable} from "mobx";
import {getRequest} from "../../common/helpers/RequestHelper";

class CategoryStore{
    @observable listCate: any[] = [];

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
}

export const categoryStore = new CategoryStore();