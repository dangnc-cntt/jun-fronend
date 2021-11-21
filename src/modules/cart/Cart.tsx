import React, {Component} from 'react';
import {observer} from "mobx-react";
import {cartStore} from "./CartStore";
import {Link} from "react-router-dom";
import "./CartDetailStyle.scss";
import {numberWithCommas} from "../../common/utils/Utils";
import {observable} from "mobx";
import {LoginStore} from "../authen/LoginSignUp/Store/LoginStore";
import {toastUtil} from "../../common/utils/ToastUtil";
import {css} from "@emotion/core";

@observer
class Cart extends Component<any, any> {

    @observable isCheck = false;

    getTotalPrice(): any {
        let count: number = 0;
        cartStore.listCart.map(item => item.check && (count += (item.price - item.discount) * item.option.amount));
        return count;
    }

    handleCheck(): any {
        var check = cartStore.listCart.findIndex((item) => item.check == false);
        if(check === -1){
            this.isCheck = true;
        }else {
            this.isCheck = false;
        }
    }


    handlerOnChangeSelectedAllCart = async (value: boolean) => {
        this.isCheck = value;
        if(this.isCheck){
            cartStore.listCart.map(value => value.check = true);
        }else {
            cartStore.listCart.map(value => value.check = false);
        }
    };



    render() {
        if (cartStore.listCart && cartStore.listCart.length > 0) {
            return (
                <div id="cart-detail">
                    <div className="container">
                        <div className="card-header">
                            <p className="title">Giỏ hàng của bạn <span>({cartStore.listCart.length} sản phẩm)</span></p>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th className="d-flex align-items-center">
                                        <label className="checkbox-container mb-0">
                                            <input type="checkbox"
                                                   onChange={e => this.handlerOnChangeSelectedAllCart(e.currentTarget.checked)}
                                                   checked={this.isCheck}
                                            />
                                            <span className="checkmark"/>
                                        </label>
                                    </th>
                                    <th>Thông tin sản phẩm</th>
                                    <th>Đơn giá</th>
                                    <th>Số lượng </th>
                                    <th>Thành tiền</th>
                                    <th className="text-center">Thao tác</th>
                                </tr>
                                </thead>
                                <tbody>
                                {cartStore.listCart.map((value, index) => {
                                    return(
                                        <tr key={index}>
                                            <td className="d-flex align-items-center">
                                                <label className="checkbox-container mb-0">
                                                    <input type="checkbox"
                                                           onChange={e => {value.check = e.currentTarget.checked; this.handleCheck()}}
                                                           checked={value.check}
                                                    />
                                                    <span className="checkmark"/>
                                                </label>
                                            </td>
                                            <td>
                                                <img src={value.imageUrls[0]} alt={value.imageUrls[0]}/>
                                                <span className="ml-2 overflow-hidden" style={{maxWidth: 280}}>{value.name}</span>
                                            </td>
                                            <td>{numberWithCommas(value.price - value.discount)} ₫</td>
                                            <td>{value.option.amount}</td>
                                            <td>{numberWithCommas((value.price - value.discount) * value.option.amount)} ₫</td>
                                            <td  className="text-center">
                                                <i className="fas fa-trash"
                                                   data-toggle="tooltip"
                                                   data-placement="top"
                                                   title="Xóa"
                                                   onClick={() => {cartStore.listCart.splice(index, 1); cartStore.updateCart()}}/>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            <div className="cart-short">
                                <div className="container position-relative">
                                    <ul>
                                        <li className="secsion-2">
                                            <div className="link-goback">
                                                <i className="fal fa-angle-left"/>
                                                <Link to="/">Tiếp tục mua sắm</Link>
                                            </div>
                                            <div className="content">
                                                <ol>
                                                    <li>Tổng cộng:</li>
                                                </ol>
                                                <ul>
                                                    <li><strong>{numberWithCommas(this.getTotalPrice())} ₫</strong></li>
                                                    <li>
                                                        {(LoginStore.userData?.address && LoginStore.userData?.phoneNumber) ?
                                                        <Link to={`/checkout`}><button>Tiến hành đặt hàng</button></Link> :
                                                        <button onClick={() => toastUtil.warning('Vui lòng thêm địa chỉ, số điện thoại nhận hàng')}>Tiến hành đặt hàng</button>}
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else return (
            <div className="cart-detail">
                <div className="container">
                    <div className="card-body d-flex justify-content-center">
                        <div className="empty mt-5 d-flex justify-content-center flex-column">
                            <img className="mb-4" src="/assets/images/empty.svg" alt="icon"/>
                            <p className="text-center w-100 mb-4">Giỏ hàng của bạn hiện đang trống!</p>
                            <label className="text-center w-100 mb-4">Đừng bỏ lỡ bão ưu đãi đang đổ bộ trên Jun Shop.</label>
                            <button css={button}><Link to="/">Tiếp tục mua sắm</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cart;


const button = css`
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 15px;
  border: none;
  border-radius: 4px;
  padding: 8px 10px;
  background-color: #F54B24;

  a {
    color: white;
  }
`