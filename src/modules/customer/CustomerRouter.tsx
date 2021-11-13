import {Route, Switch, Redirect} from "react-router-dom";
import React, {lazy} from "react";

const ProfileAccount = lazy(() => import("./account/AccountComponent"));
const ChangePassword = lazy(() => import("./change-password/ChangePasswordComponent"));

export const CustomerRouter = () => {
    return (
        <Switch>
            <Route exact path="/customer/account" component={ProfileAccount}/>
            <Route exact path="/customer/change-password" component={ChangePassword}/>
        </Switch>
    );
};
