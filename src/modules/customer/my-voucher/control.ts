import MyVoucher from "./index";
import {Store} from "./store";

class Control {
  public view: MyVoucher = null as any;
  public store: Store = new Store();

  handleShowPopupVoucherRule(rule: string) {
    this.store.voucherRule = rule;
  }
}

export const MY_VOUCHER_CTRL = new Control();
export const store = MY_VOUCHER_CTRL.store;
