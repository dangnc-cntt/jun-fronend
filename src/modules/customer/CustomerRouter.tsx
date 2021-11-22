import {Route, Switch} from "react-router-dom";
import React, {lazy} from "react";
import OrderDetail from "../cart/order/OrderDetail";

const ProfileAccount = lazy(() => import("./account/AccountComponent"));
const ChangePassword = lazy(() => import("./change-password/ChangePasswordComponent"));
const MyVoucher = lazy(() => import("./my-voucher/index"));
const OrderManage = lazy(() => import("./orderManage/orderManage/index"));

export const CustomerRouter = () => {
    return (
        <Switch>
            <Route exact path="/customer/account" component={ProfileAccount}/>
            <Route exact path="/customer/change-password" component={ChangePassword}/>
            <Route exact path="/customer/voucher" component={MyVoucher}/>
            <Route exact path="/customer/order/manage" component={OrderManage}/>
            <Route exact path="/customer/order/manage/code/:id" component={OrderDetail}/>
        </Switch>
    );
};
