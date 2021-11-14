import AccountComponent from "../account/AccountComponent";
import {AccountStore} from "./AccountStore";
import {toastUtil} from "../../../common/utils/ToastUtil";

class AccountControl {
    private view?: AccountComponent;
    private store?: AccountStore;

    public setView(_view: AccountComponent) {
        this.view = _view;
    }

    public setStore(_store: AccountStore) {
        this.store = _store;
    }

    public get getView(): AccountComponent | undefined {
        return this.view;
    }

    public get getStore(): AccountStore | undefined {
        return this.store;
    }

}

export const ACCOUNT_CTRL = new AccountControl();
