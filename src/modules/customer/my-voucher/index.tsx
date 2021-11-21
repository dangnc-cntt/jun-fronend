import React from "react";
import {observer} from "mobx-react";
import {PROFILE_CTRL} from "../CustomerControl";
import {MY_VOUCHER_CTRL} from "./control";
import {store} from "./control";
import {MyVoucherParams} from "./conponents/UrlSearch";
import ListView from "./conponents/ListView";
import {store as customerStore} from "../CustomerStore";
import "./style.scss"
interface IIndexProps {
    history: { push: (path: string) => any }
    location: {
        search: string
    }
}

@observer
export default class MyVoucher extends React.Component<IIndexProps, any> {
    constructor(props: any) {
        super(props);
        PROFILE_CTRL.setMenuActive([0, 6]);
        PROFILE_CTRL.setBreadcrumbs([{title: 'Ví voucher'}]);
        customerStore.titleHelmet="Ví voucher"
        MY_VOUCHER_CTRL.view = this;
    }

    async componentDidMount() {
        await store.getListVoucher();
        window.scrollTo(0, 0);
    }



    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return <div id="my-voucher-page">
            <div className="card">
                <div className="card-header">
                    <p className="title">Ví voucher</p>
                </div>
                <div className="card-body">
                    {store.listVoucher && store.listVoucher.length > 0 ?
                        <ListView/> :
                        <div className="text-center pt-5 mt-5 pb-5 mb-5 w-100">Không có voucher nào!</div>}
                </div>
            </div>
        </div>;
    }
}
