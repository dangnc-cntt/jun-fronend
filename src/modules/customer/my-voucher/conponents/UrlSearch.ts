export class MyVoucherParams extends URLSearchParams {
    constructor(search: string) {
        super(search);
        Object.setPrototypeOf(this, MyVoucherParams.prototype);
    }
    get getPage(): number {
        const value = this.get('page');
        return !isNaN(parseInt(value + '')) ? parseInt(value as string) : 0;
    }
}