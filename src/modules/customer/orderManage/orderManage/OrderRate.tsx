import React, {Component} from 'react'
import {css} from '@emotion/core';
import {observer} from 'mobx-react';
import 'react-rater/lib/react-rater.css'
import OrderRateItem from "./component/OrderRateItem";
import * as Sentry from "@sentry/browser";
import {toastUtil} from "../../../../common/utils/ToastUtil";
import {orderStore} from "../store";
import {observable} from "mobx";
import {postRequest} from "../../../../api";
import $ from 'jquery'

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
const action = css`    padding: 20px 0 10px;`
const send = css`width: 130px;
color: white;
background-color: #f54b24;`
const cancel = css`height: 35px;
font-size: 14px;
border-radius: 5px;
border: solid 1px #f54b24;
color: #f54b24;
width: 87px;
background-color: #ffefcd;
margin-right: 20px;`

@observer
export default class OrderRate extends Component {
    asyncReviewPromise: Promise<any>[] = [];
    rateItemArrRef: React.RefObject<OrderRateItem>[] = [];
    @observable dataRequest: any = {
        star: 5,
        productId: orderStore.detailProduct.id,
        content: '',
    }

   async onSubmit(){

        const result = await postRequest(`v1/reviews`, true, this.dataRequest);
        if(result.status === 200){
            toastUtil.success('Đánh giá thành công')
            $('#modal-rating').trigger('click')
            this.dataRequest = {
                star: 5,
                productId: orderStore.detailProduct.id,
                content: '',
            }
        }
    }

    render() {
        try {
            if (orderStore.detailProduct) {
                this.rateItemArrRef = [];
                this.rateItemArrRef.push(React.createRef<OrderRateItem>())
                return (<div className="modal fade" id="modal-rating">
                    <div className="order_management modal-dialog ">
                        <div className="modal-content">
                            <div className="evaluate_main" css={wrap}>
                                <div className="evaluate_product">
                                    <div className="title">
                                        <h3 css={h3}>Đánh giá sản phẩm</h3>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="d-flex">
                                            {orderStore.detailProduct.imageUrls ? <img src={orderStore.detailProduct.imageUrls[0]} alt={orderStore.detailProduct.name}
                                                                        style={{width: "80px", height: '80px'}}/> : ''}
                                            <div className="d-flex flex-column pl-2">
                                                <p style={{color: 'black'}}>{orderStore.detailProduct.name}</p>
                                            </div>
                                        </div>
                                        <ul style={{listStyle: 'none', paddingLeft: 0}} className="d-flex">
                                            {[...Array(5)].map((value, index) =>
                                                <li key={index} onClick={() => this.dataRequest.star = (index + 1) as any}>
                                                    <i style={{color: index < this.dataRequest.star ? '#FAC917' : "#d2d2d2"}} className="fas fa-star"/>
                                                </li>)}
                                        </ul>
                                    </div>
                                    <textarea
                                        style={{resize: 'none', marginTop: '4px'}}
                                        value={this.dataRequest.content}
                                        onChange={e => this.dataRequest.content = e.currentTarget.value}
                                        rows={5} className="form-control"/>
                                    <div className="send_reviews text-right" css={action}>
                                        <button className="btn d-inline-flex align-items-center  button_later" css={cancel}
                                                data-dismiss="modal">Để sau
                                        </button>
                                        <button className="btn d-inline-block button_reviews" onClick={() => this.onSubmit()} css={send}>Gửi đánh giá
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            } else return null;
        } catch (e) {
            console.error(e);
            Sentry.captureException(e);
            return null;
        }
    }
}
