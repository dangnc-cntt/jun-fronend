import React, {Component} from 'react'
import {css} from '@emotion/core';
import {observer} from 'mobx-react';
import 'react-rater/lib/react-rater.css'
import OrderRateItem from "./component/OrderRateItem";
import $ from "jquery";
import {postRequest} from "../../../../common/service/BaseService";
import {LoginStore} from "../../../authen/LoginSignUp/Store/LoginStore";
import * as Sentry from "@sentry/browser";
import {IResProfile} from "../../../../api/auth/interfaces/response";
import {uploadImage} from "../../../../common/utils/Utils";
import {toastUtil} from "../../../../common/utils/ToastUtil";
import {orderStore} from "../store";

const wrap = css`width: 100%;
padding: 10px 25px 20px;
background-color: white;
box-shadow: 0 0 5px 2px #adaab1;
text-align: left;`
const h3 = css`    width: 100%;
height: 50px;
line-height: 50px;
font-size: 22px;
color: #3c4b58;padding-top: 0px !important;`
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

    async handlerOnReview(item: any, rating: number, text: string, images?: { file: File, src?: string }[]) {
        this.asyncReviewPromise.push(new Promise<any>(async (resolve, reject) => {
            let imageSrc: string[] = [];
            if (images) {
                const async_upload: Promise<string>[] = [];
                images.map(image => async_upload.push(new Promise<string>((resolve1, reject1) => {
                    uploadImage({0: image.file}, "uploadCover")
                        .then(next => resolve1(image.src = next))
                        .catch(e => reject1(e));
                })));
                await Promise.all(async_upload)
                    .then(next => imageSrc = next)
                    .catch(e => reject(e));
            }
            postRequest(`v1/reviews`, {
                name: null,
                userId: (LoginStore.getUserData as IResProfile).id,
                productId: item.productId,
                orderLineId: item.id,
                rating: rating,
                text: text,
                images: imageSrc.length ? imageSrc : null
            }, true).then(response => {
                if (response.status === 200) resolve(item);
                else reject(response.body);
            }).catch(e => reject(e));
        }));
    }

    handlerOnReviewAll() {
        this.rateItemArrRef.map(value => {
            if (value.current) value.current.handlerOnReview();
            return value;
        });
        Promise.all(this.asyncReviewPromise)
            .then((next: any[]) => {
                toastUtil.success('Đánh giá thành công');
                $('div.modal#modal-rating').modal('hide');
            })
            .catch(e => {
                console.error(e);
                toastUtil.error(e.message || 'Thao tác thực hiện không thành công');
            })
    }

    componentWillUnmount() {
        $('div.modal#modal-rating').modal('hide');
    }

    render() {
        try {
            const {orderDetail} = orderStore;
            if (orderDetail) {
                this.rateItemArrRef = [];
                this.rateItemArrRef.push(React.createRef<OrderRateItem>())
                return (<div className="modal fade" id="modal-rating">
                    <div className="order_management modal-dialog ">
                        <div className="modal-content">
                            <div className="evaluate_main" css={wrap}>
                                <div className="evaluate_product">
                                    <div className="title">
                                        <h3 css={h3}>ĐÁNH GIÁ SẢN PHẨM</h3>
                                    </div>
                                    {orderDetail.orderLines.map((item: any, i: any) => {
                                        return <OrderRateItem key={i}
                                                              ref={this.rateItemArrRef[i]}
                                                              orderLine={item}
                                                              shopId={orderDetail.shopId}
                                                              shopName={orderDetail.shopName}
                                                              onReview={(rating, text, images) => this.handlerOnReview(item, rating, text, images)}/>
                                    })}
                                    <div className="send_reviews text-right" css={action}>
                                        <button className="btn d-inline-block button_later" css={cancel}
                                                data-dismiss="modal">Để sau
                                        </button>
                                        <button className="btn d-inline-block button_reviews" css={send}
                                                onClick={() => this.handlerOnReviewAll()}>Gửi đánh giá
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
