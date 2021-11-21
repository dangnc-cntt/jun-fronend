export default class OrderParams extends URLSearchParams {
    constructor(search: string) {
        super(search);
        Object.setPrototypeOf(this, OrderParams.prototype);
    }

    get getType(): 'all' | 'processing' | 'shipping' | 'finished' | 'canceled' | 'payment_wait' {
        const value = (this.get('type') + '').trim();
        if (/^(all|processing|shipping|finished|canceled|payment_wait)$/.test(value))
            return value as any;
        else return 'all';
    }

    get getPage(): number {
        const value = this.get('page');
        return !isNaN(parseInt(value + '')) ? parseInt(value as string) : 0;
    }
}