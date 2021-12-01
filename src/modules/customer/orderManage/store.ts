import {observable} from "mobx";



class Order {
    @observable public listOrders: any[] = []
    @observable public page: number = 1;
    @observable public code: any = '';
    @observable public orderDetail?: any
    @observable public detailProduct: any;
    @observable public listImage: any[] = []
    @observable type: 'all' | 'processing' | 'shipping' | 'finished' | 'canceled' | 'payment_wait' = "all";
    @observable metadata: {total: number, totalPages: number} = {
        total: 0,
        totalPages: 0
    };

}

export const orderStore = new Order();
