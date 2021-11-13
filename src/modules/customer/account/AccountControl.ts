import AccountComponent from "../account/AccountComponent";
import {AccountStore} from "./AccountStore";
import {sendOtpVerify} from "../../../api/account";
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

    public async SendOtp(phone_number: string, callback: (success: boolean) => any) {
        try {
            const response = await sendOtpVerify(phone_number);
            if (response.status === 200) {
                toastUtil.warning(`Mã xác thực đã được gửi tới "${phone_number}"`);
                callback(true);
                return;
            }
            callback(false);
        } catch (e) {
            console.error(e)
        }
    }
}

export const ACCOUNT_CTRL = new AccountControl();
