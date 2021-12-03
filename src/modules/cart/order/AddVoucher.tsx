import React, {Component} from 'react';
import {observer} from "mobx-react";
import {orderStore} from "../../customer/orderManage/store";
import $ from 'jquery';
import {css} from "@emotion/core";
import {store} from "../../customer/my-voucher/control";
import {Coupon} from "../../customer/my-voucher/conponents/Coupon";

const wrap = css`width: 100%;
padding: 10px 25px 20px;
background-color: white;
text-align: left;`
const h3 = css`    width: 100%;
height: 50px;
line-height: 50px;
font-size: 22px;
color: #3c4b58;
padding-top: 0 !important;`
const send = css`width: 120px;
color: white;
background-color: #f54b24;`


@observer
class AddVoucher extends Component {

    async componentDidMount() {
        await store.getListVoucher();
    }

    async onSubmit(){

    }

    render() {
        return (
            <div className="modal fade" id="add_voucher">
            <div className="order_management modal-dialog">
                <div className="modal-content">
                    <div className="evaluate_main" css={wrap}>
                        <div className="evaluate_product">
                            <div className="title">
                                <h3 css={h3}>Chọn mã giảm giá</h3>
                            </div>
                            <div className="d-flex">
                                <div className="list-voucher">
                                    {store.listVoucher && store.listVoucher.map((value, index) => <Coupon
                                        key={index}
                                        data={value}
                                    />)}
                                </div>
                            </div>
                            <div className="modal-footer pl-0 pr-0">
                                <button type="button" className="btn btn-outline-secondary">Hủy bỏ</button>
                                <button type="button" className="btn" css={send} onClick={() => this.onSubmit()}>Xác nhận</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
}

export default AddVoucher;