import {observable} from "mobx";

class HeaderStore {
    @observable countAuction: number = 0;
    @observable isShowCate:boolean=false
    @observable idLanding:number=0
}

export const headerStore = new HeaderStore();