import {observable} from "mobx";

class FirebaseStore {
    @observable files: any;
}

export const firebaseStore = new FirebaseStore();