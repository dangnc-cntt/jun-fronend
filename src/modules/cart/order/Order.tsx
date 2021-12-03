import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {cartStore} from "../CartStore";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {number_format, numberWithCommas} from "../../../common/utils/Utils";
import {css} from "@emotion/core";
import {orderStore} from "./OrderStore";
import {toastUtil} from "../../../common/utils/ToastUtil";
import {observable} from "mobx";
import {postRequest} from "../../../api";
import AddVoucher from "./AddVoucher";


export interface IProps {
    history: { push: (path: string, state?: any) => any }
}


@observer
class Order extends Component<IProps, any> {
    @observable listProduct: any[] = [];

    async orderProduct(){
        if(!orderStore.requestOrder.paymentMethod){
            toastUtil.warning('Vui lòng chọn phương thức thanh toán');
            return false
        }else if(orderStore.requestOrder.paymentMethod === "VNPAY"){
            if(!orderStore.requestOrder.bankCode){
                toastUtil.warning('Vui lòng chọn ngân hàng thanh toán');
                return false
            }
        }
        orderStore.requestOrder.voucherId = orderStore.voucherInfo.id
        orderStore.requestOrder.state =  orderStore.requestOrder.paymentMethod === "VNPAY" ? "VPN_UNPAID" : "NEW";
        orderStore.requestOrder.note = LoginStore.userData?.address
        orderStore.requestOrder.total = this.getTotalPrice();
        this.listProduct && this.listProduct.map((item) => {
            orderStore.requestOrder.products.push({
                id: item.id,
                amount: item.option.amount,
                optionId: item.option.id
            })
        });


        const result = await postRequest(`v1/orders`, true, orderStore.requestOrder);

        if(result.status === 200){
            if(orderStore.requestOrder.paymentMethod === "CASH"){
                this.props.history.push(`/payment?vnp_ResponseCode=00&vnp_Amount=${orderStore.requestOrder.total}&type=CASH`)
            }else {
                window.location.href = result.body;
            }

        }else {
            toastUtil.error(result.body.message)
        }
    }

    componentDidMount() {
        {cartStore.listCart.map((value) => {
            if(value.check){
                this.listProduct.push(value)
            }
        })}
    }

    getTotalPrice(): any {
        let count: number = 0;
        this.listProduct.map((item: any) => (count += (item.price - item.discount) * item.option.amount));
        return count;
    }


    changeBanking(item: any){
        {orderStore.listPayment.map((val) => {
            if(item.code == val.code){
                val.isActive = true;
                orderStore.requestOrder.bankCode = item.code;
            }else {
                val.isActive = false;
            }
        })}
    }


    protected get renderShortPayment(): React.ReactNode {
        return <div className="short-order" aria-haspopup='false'>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <ul>
                            <li>Tạm tính ({orderStore.requestOrder.products.length} Sản phẩm): <b>{numberWithCommas(this.getTotalPrice())} ₫</b></li>
                            <li>Giảm giá đơn hàng: <b>{number_format(orderStore.voucherInfo.discount)} đ</b></li>
                        </ul>
                    </div>
                    <div className="card-body">
                        <label>(*) Xin vui lòng kiểm tra lại đơn hàng trước khi thanh toán</label>
                        <div className="d-flex justify-content-between">
                            Tổng cộng
                            <b>{numberWithCommas(this.getTotalPrice() - orderStore.voucherInfo.discount)} ₫</b>
                        </div>
                    </div>
                    <div className="card-footer">
                        <button onClick={() => this.orderProduct()}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>;
    }

    render() {
        if(LoginStore.userData){
            return (
                <div id="c-checkout" css={checkout}>
                    <div className="container">
                        <div className="row">
                            <div className="order col-12">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-center align-items-center">
                                        <p>Thanh toán đơn hàng</p>
                                        <Link to="/cart">Giỏ hàng của quý khách</Link>
                                    </div>
                                    <div className="card-body">
                                        <ol>
                                            <li className="address-buyer mb-4">
                                                <p className="title">Địa chỉ nhận hàng</p>
                                                <div>
                                                    <div className="d-flex align-items-center mb-2">
                                                        <span>Họ và tên: </span>
                                                        <p className="mb-0 ml-2"><strong>{LoginStore.userData.fullName}</strong></p>
                                                    </div>
                                                   <div className="mb-2 d-flex align-items-center">
                                                       <span>Số điện thoại: </span>
                                                       <p className="mb-0 ml-2"><strong>{LoginStore.userData.phoneNumber}</strong></p>
                                                   </div>
                                                   <div className="d-flex align-items-center">
                                                       <span>Địa chỉ nhận hàng: </span>
                                                       <p className="mb-0 ml-2"><strong>{LoginStore.userData.address}</strong></p>
                                                   </div>
                                                </div>
                                            </li>
                                            <li className="order-info mb-4">
                                                <p className="title">Thông tin đơn hàng</p>
                                                {this.listProduct.map((value: any, index: any) => {
                                                    return <div className="d-flex justify-content-between mb-2" key={index}>
                                                        <div className="d-flex">
                                                            <img style={{width: 60, height: 60}} src={value.imageUrls[0]} alt=""/>
                                                            <span className="ml-2">{value.name}</span>
                                                        </div>
                                                        <span>{number_format(value.price - value.discount)}đ</span>
                                                        <span>x{value.option.amount}</span>
                                                        <span>{number_format((value.price - value.discount) * value.option.amount)} đ</span>
                                                    </div>
                                                })}
                                            </li>
                                            <li className="promotion mb-4">
                                                <p className="title">Mã giảm giá và mã vận chuyển</p>
                                                {orderStore.requestOrder.voucherId == 0 ? <div className="box"  data-toggle="modal" data-target="#add_voucher">
                                                    <img src="/assets/images/promotion.svg" className="icon" alt="icon"/>
                                                    <p>Chọn mã giảm  giá</p>
                                                </div> : <div>

                                                </div>}
                                            </li>
                                            <li className="payment">
                                                <p className="title">Phương thức thanh toán</p>
                                                <div>
                                                    <div className="card-header">
                                                        <ul className="d-flex align-items-center" css={payment}>
                                                            <li className={`${orderStore.requestOrder.paymentMethod === "CASH" ? `active` : ''} payment_`} onClick={() => {orderStore.requestOrder.paymentMethod = "CASH"}}>
                                                                <div className="content">Thanh toán khi nhận hàng</div>
                                                            </li>
                                                            <li className={`${orderStore.requestOrder.paymentMethod === "VNPAY" ? `active` : ''} payment_`} onClick={() => orderStore.requestOrder.paymentMethod = "VNPAY"}>
                                                                <div className="content">Thanh toán online</div>
                                                            </li>
                                                        </ul>
                                                        {orderStore.requestOrder.paymentMethod === "VNPAY" && <div className="list-bank d-flex align-items-center flex-wrap">
                                                            {orderStore.listPayment.map((item, i) => {
                                                                return <div className={`${item.isActive ? "active" : ''} bank`} onClick={() => this.changeBanking(item)} key={i}>
                                                                    <img src={item.imageUrl} alt=""/>
                                                                </div>
                                                            })}
                                                        </div>}
                                                    </div>
                                                </div>
                                            </li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {this.renderShortPayment}
                    <AddVoucher/>
                </div>
            );
        }else return null
    }
}

export default Order;

const payment = css`
  .payment_{
    width: 224px;
    height: 60px;
    cursor: pointer !important;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    overflow: hidden;
    position: relative;
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-items: center;
    font-size: 13px;
    color: #333;
    margin-right: 16px;
  }
  .active{
    border: 1px solid #f54b24;
    &:after {
      content: "";
      background-color: #f54b24;
      width: 18px;
      height: 18px;
      position: absolute;
      right: -9px;
      bottom: -9px;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    
  }
`


const checkout = css`
  margin-top: 22px;
  .card-header {
    position: relative;
    background-color: #fff;
    border-bottom: none;
    a{
      position: absolute;
      top: 24px;
      color: #1890ff;
      font-size: 13px;
      left: 16px
    }
    p{
      font-size: 24px;
    }
  }
  .card-body {
    ol, li{
      cursor: context-menu;
    }
  }
  .promotion{
    width: 100%;
    height: 80px;
    position: relative;
    .box{
      width: 180px;
      position: relative;
      height: 28px;
      cursor: pointer;
      border: 1px solid transparent;
      background-color: #ffe8da;
      border-image-source: url(/assets/images/bg-coupon-small.svg);
      border-image-slice: 1;
      img{
        position: absolute;
        z-index: 2;
        left: 8px;
        top: 6px;
      }
      p{
        font-size: 13px;
        color: #000;
        padding: 0 16px 0 50px;
        top: 0;
        line-height: 28px;
        z-index: 3;
      }
    }
  }
  .payment{
    .list-bank {
      .bank{
        width: 160px;
        height: 50px;
        display: flex;
        margin-left: 16px;
        margin-top: 16px;
        border-radius: 4px;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        overflow: hidden;
        position: relative;
        border: 1px solid #e1e1e1;
        img{
          width: 140px;
          height: 40px;
          object-fit: scale-down;
        }
      }
      .bank.active{
        border: 1px solid #f54b24;
        &:after {
          content: "";
          background-color: #f54b24;
          width: 18px;
          height: 18px;
          position: absolute;
          right: -9px;
          bottom: -9px;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        }
      }
    }
  }

  div.short-order {
    margin-top: 20px;
    &.fixed-bottom {
      background-color: white;
      box-shadow: 0 4px 16px rgba(0, 0, 0, .25);

      .container .card {
        border-radius: unset;

        .card-header {
          padding: 8px 1.25rem !important;
        }

        .card-body {
          padding-top: 0;
          padding-bottom: 4px;

          label {
            padding-top: 4px;
          }
        }
      }
    }

    .container {

      .card {
        border: none;
      }

      .card-header {
        background-color: white;

        ul {
          width: 318px;
          float: right;
          list-style: none;
          margin: 0;
          padding: 0;

          li {
            display: flex;
            justify-content: space-between;

            b {
              font-weight: 800;
              color: black;
            }
          }
        }
      }

      .card-body {
        label {
          font-size: 13px;
        }

        div {
          float: right;
          width: 318px;
          align-items: center;

          b {
            color: #F54B24;
            font-family: Opensans-Semibold, serif;
            font-size: 22px;
          }
        }
      }

      .card-footer {
        background-color: white;
        margin-bottom: 32px;
        border: none;
        padding-top: 0;

        button {
          float: right;
          font-size: 15px;
          color: white;
          border: none;
          border-radius: 4px;
          background-color: #F54B24;
          padding: 10px 57px;

          &[disabled] {
            opacity: .8;
            cursor: not-allowed;
          }
        }
        .btn-disable{
          opacity: .8;
          cursor: pointer;
        }
      }
    }
  }
`