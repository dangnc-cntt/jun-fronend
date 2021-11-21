import {observable} from "mobx";

class OrderStore{
    @observable listPayment: any[] = [
        {
            code: 'ACB',
            isActive: false,
            imageUrl: "/assets/images/acb.jpg"
        },
        {
            code: 'AGRIBANK',
            isActive: false,
            imageUrl: "/assets/images/agribank.jpg"
        },
        {
            code: 'BIDV',
            isActive: false,
            imageUrl: "/assets/images/bidv.jpg"
        },
        {
            code: 'NCB',
            isActive: false,
            imageUrl: "/assets/images/ncb.jpg"
        },
        {
            code: 'MBBANK',
            imageUrl: "/assets/images/mbbank.jpg"
        },
        {
            code: 'TECHCOMBANK',
            imageUrl: "/assets/images/techcombank.jpg"
        },
        {
            code: 'VPBANK',
            imageUrl: "/assets/images/vpBank.jpg"
        },
        {
            code: 'JCB',
            imageUrl: "/assets/images/JCB.jpg"
        },
        {
            code: 'UPI',
            imageUrl: "/assets/images/upi.jpg"
        },
        {
            code: 'MASTERCARD',
            imageUrl: "/assets/images/masterCard.jpg"
        },
        {
            code: 'VIETCOMBANK',
            imageUrl: "/assets/images/vietcombank.jpg"
        }
    ];

    @observable voucherInfo: any = {
        id: -1,
        discount: 0,
    }
    @observable requestOrder: any = {
        state: '',
        voucherId: '',
        note: '',
        paymentMethod: '',
        bankCode: '',
        total: 0,
        products: []
    };

}

export const orderStore = new OrderStore();