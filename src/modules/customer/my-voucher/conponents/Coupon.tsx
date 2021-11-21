import React from "react";
import {getLocalDateTime, numberWithCommas} from "../../../../common/utils/Utils";

interface ICouponProps {
  data: any
}

export const Coupon: React.FC<ICouponProps> = (props: ICouponProps) => {


  return (<div className="coupon">
    <div className="coupon-box">
      <div className="colum">
        <div className="bg">
          <div className="title">Voucher {props.data.name}</div>
          <div className="d-flex justify-content-between align-items-center">
            <ol>
              <li><p>Giảm {numberWithCommas(props.data.discount)} ₫</p></li>
            </ol>
            <p>Hsd {getLocalDateTime(props.data.expiryDate, 'dd/mm/yyyy')}</p>
          </div>
        </div>
      </div>
      <div className="colum-1">
        <div>
          <label>Nhập mã</label>
          <p className="value text-center">{props.data.code.toUpperCase()}</p>
        </div>
      </div>
    </div>
  </div>);
};
