import React, {Component} from 'react';
import {getListOrders} from '../reducer';
import {orderStore} from '../store';
import {PROFILE_CTRL} from "../../CustomerControl";
import OrderParams from "./component/UrlSearch";
import {observer} from "mobx-react";
import {store} from "../../CustomerStore";
import OrderItems from "./OrderItems";

interface IProps {
    history: any
    location: { search: string }
}

@observer
export default class OrderManage extends Component<IProps> {
    constructor(props: any) {
        super(props);
        PROFILE_CTRL.setMenuActive([1, 0]);
        PROFILE_CTRL.setBreadcrumbs([{title: "Đơn hàng của tôi"}])
        store.titleHelmet="Đơn hàng của tôi"
    }

    componentDidMount(): void {
        this.requestAPI().finally(() => window.scrollTo(0, 0));
    }

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<{}>, snapshot?: any): void {
        if (prevProps.location.search !== this.props.location.search) this.requestAPI().finally(() => window.scrollTo(0, 0));
    }

    protected async requestAPI() {
        if (this.props.location.search) {
            const params = new OrderParams(this.props.location.search);
            orderStore.type = params.getType;
            getListOrders(orderStore.type, 0, 10).then();
        }
    }

    render() {
        return (
            <div id="order-manager">
                <div className="card">
                    <div className="card-header">
                        <p className="title">Đơn hàng của tôi</p>
                    </div>
                    <div className="card-body">
                        <OrderItems/>
                    </div>
                </div>
            </div>
        )
    }
}
