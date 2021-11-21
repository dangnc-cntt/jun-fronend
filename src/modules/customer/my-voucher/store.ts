import {observable} from "mobx";
import {getRequest} from "../../../api";

export class Store {
  @observable listVoucher: any[] = [];

  @observable voucherRule?: string;

  async getListVoucher() {
    const result = await getRequest(`v1/vouchers`, true);
    if(result.status === 200){
      this.listVoucher = result.body;
    }
  }
}
