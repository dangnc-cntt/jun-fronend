import {computed, observable} from "mobx";

export class AccountStore {
    @observable _NumberPhone!: string;

    set NumberPhone(value: string) {
        this._NumberPhone = value
    }

    @computed get NumberPhone(): string {
        return this._NumberPhone
    }

    @observable _messageError!: string;

    set messageError(value: string) {
        this._messageError = value
    }

    @computed get messageError(): string {
        return this._messageError
    }
}