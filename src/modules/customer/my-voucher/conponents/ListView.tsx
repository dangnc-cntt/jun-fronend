import React from "react";
import {observer} from "mobx-react";
import {store} from "../control";
import {Coupon} from "./Coupon";

@observer
export default class ListView extends React.Component<any, any> {
  render(): React.ReactElement {
    return <div className="list-voucher">
      {store.listVoucher.map((value, index) => <Coupon
        key={index}
        data={value}
      />)}
    </div>;
  }
}
