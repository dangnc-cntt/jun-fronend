import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {observer} from "mobx-react";
import {requestUtils} from "../../../common/utils/RequestUtil";
import "../styles/PaymentSuccess.scss"
import {number_format} from "../../../common/utils/Utils";
import {putRequest} from "../../../api";

@observer
class PaymentSuccess extends Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {
            status: '',
            amount: 0,
            orderId: 0,
            type: ''
        }
    }

    componentDidMount() {
        let queryParam = requestUtils.queryParam(this.props);
        if (queryParam) {
            let status: string = queryParam.vnp_ResponseCode as unknown as string || '';
            let amount: number = queryParam.vnp_Amount as unknown as number || 0;
            let type: string = queryParam.type as unknown as string || 'VNPAY';
            let orderId: number = queryParam.vnp_TxnRef as unknown as number || 0;
            this.setState({
                status: status,
                amount: type === "CASH" ? amount : amount / 100
            })

            if(type === "VNPAY" && status === "00"){
                return putRequest(`v1/orders/${orderId}`, true, {})
            }
        }

    }


    render() {
        if(this.state.status === "00"){
            return (
                <div id="cart-payment-result">
                    <div className="container">
                        <div className="content">
                            <img src={"/assets/images/payment-success.png"} alt="success"/>
                            <p className="title">Đặt hàng thành công, Xin cảm ơn!</p>
                            <ul>
                                <li>
                                    <div>Tổng thanh toán: {number_format(this.state.amount)}đ</div>
                                </li>
                            </ul>
                            <div className="footer">
                                <p>Để biết thêm chi tiết về trạng thái đơn hàng của bạn vui lòng vào Tài khoản Đơn hàng của tôi</p>
                                <div className="container footer">
                                    <button><Link to="/">Tiếp tục mua sắm</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }else {
            return (
                <div id="cart-payment-result">
                    <div className="container">
                        <div className="content">
                            <img src={"/assets/images/payment-success.png"} alt="success"/>
                            <p className="title">Thanh toán thất bại, Xin cảm ơn!</p>
                            <div className="footer">
                                <div className="container footer">
                                    <button><Link to="/">Tiếp tục mua sắm</Link></button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            );
        }
    }
}

export default PaymentSuccess;