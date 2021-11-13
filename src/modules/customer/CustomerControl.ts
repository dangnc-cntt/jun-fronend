import CustomerComponent from "./CustomerComponent";
import {CustomerStore} from "./CustomerStore";

export class CustomerControl {
    public view: CustomerComponent = null as any;
    public store: CustomerStore = null as any;

    public setView(_view: CustomerComponent) {
        this.view = _view;
    }

    public setStore(_store: CustomerStore) {
        this.store = _store;
    }

    /*---- GETTER - SETTER ----*/

    public get getStore(): CustomerStore | undefined {
        return this.store;
    }

    /*---- END GETTER SETTER ----*/

    public setMenuActive(value: [number, number]) {
        this.store && (this.store.menuActive = value);
    }

    public setBreadcrumbs(value: { title: string, link?: string }[]) {
        this.store && (this.store.breadcrumbs = value);
    }
}

export const PROFILE_CTRL = new CustomerControl();