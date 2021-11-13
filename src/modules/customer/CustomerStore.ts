import {computed, observable} from "mobx";

export class CustomerStore {
    @observable menuActive: [number, number] = [0, 0];

    @computed get getMenuActive(): [number, number] {
        return this.menuActive;
    }

    @observable breadcrumbs: {
        title: string,
        link?: string
    }[] = [];

    @computed get getBreadcrumbs(): {
        title: string,
        link?: string
    }[] {
        return this.breadcrumbs;
    }
    @observable titleHelmet:string="";
}

export const store = new CustomerStore();