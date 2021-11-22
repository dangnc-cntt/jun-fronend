import React, {Component} from 'react';
import {observer} from "mobx-react";
import {orderStore} from "../../customer/orderManage/store";
import StatusOrder from "../../customer/orderManage/orderManage/StatusOrder";
import {getLocalDateTime, number_format, slug} from "../../../common/utils/Utils";
import {Link} from "react-router-dom";
import {css} from "@emotion/core";
import {getRequest} from "../../../api";
import {observable} from "mobx";
import {PROFILE_CTRL} from "../../customer/CustomerControl";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";

interface IProps {
    match:{ params: {id: any}}
}



@observer
class OrderDetail extends Component<IProps, any> {
    @observable orderDetail: any
    @observable stateOrder: any[] = [
        'VPN_UNPAID',
        'NEW',
        'CONFIRMED',
        'DELIVERY',
        'COMPLETED',
    ]

    constructor(props: any) {
        super(props);
        PROFILE_CTRL.setMenuActive([1, 0]);
        PROFILE_CTRL.setBreadcrumbs([{title: "Đơn hàng của tôi"}])
    }

    async componentDidMount() {
        await this.getOrder(this.props.match.params.id)
    }

    async getOrder(id: number){
        const result = await getRequest(`v1/orders/${id}`, true);
        if(result.status === 200){
            this.orderDetail = result.body
        }
    }

    statusOrder(state: any){
        if (state === "NEW") {
            return "Chờ xác nhận"
        }
        if (state === "DELIVERY") {
            return "Đang giao"
        }
        if (state === "VPN_UNPAID") {
            return "Chờ thanh toán"
        }
        if (state === "COMPLETED") {
            return "Hoàn thành"
        }
        if (state === "CONFIRMED") {
            return "Đang xử lý"
        } else return true
    }

    render() {
        let item: any = this.orderDetail;
        try {
            if(item.paymentMethod == "CASH"){
                this.stateOrder.splice(0, 1)
            }
            return (
                <div className="order_detail">
                    <div className="container">
                        <div css={Wrap}>
                            <Link to='/customer/order/manage?type=all&page=0'>
                                <i className="fas fa-chevron-left" css={icon}/>
                            </Link>
                            <Link to='/customer/order/manage?type=all&page=0'><p css={col1}>Quay lại danh sách đơn hàng</p></Link>
                        </div>
                        <div className="info_header d-flex justify-content-between">
                            <div className="flex-column justify-content-center p-3" style={{width: `33%`}}>
                                <p className="w-100 text-center"><strong>Thông tin nhận hàng</strong></p>
                                <p><strong>{LoginStore.userData?.fullName}</strong></p>
                                <p>{LoginStore.userData?.phoneNumber}</p>
                                <span>{LoginStore.userData?.address}</span>
                            </div>
                            <div style={{width: `33%`}}>

                            </div>
                            <div className="flex-column justify-content-center p-3" style={{width: `33%`}}>
                                <p className="w-100 text-center"><strong>Thông tin thanh toán</strong></p>
                                <div className="d-flex align-items-center mb-2">
                                    <span className="mr-4">Phương thức:  </span>
                                    <span><strong>{item.paymentMethod === "CASH" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}</strong></span>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex w-100 p-4 justify-content-center align-items-center" css={stateOrder}>
                            {this.stateOrder.map((val, i) => {
                                return (
                                    <div className={`${item.state === val ? "active" : ''} text-center state_order`} key={i}>
                                        <p>{i+1}</p>
                                        <span>{this.statusOrder(val)}</span>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="order_management_content" css={contentMb}>
                            <div className="w-100 order_line">
                                <div className="order_info mb-2">
                                    <div className="d-flex align-items-center">
                                        <p className="mr-4">Đơn hàng <strong style={{color:` rgb(245, 75, 36)`, fontWeight: `bold`}}>{item.id}</strong></p>
                                        <StatusOrder status={item.state}/>
                                    </div>
                                    <span>{getLocalDateTime(item.createdAt, "dd/mm/yyyy, hh:m_m")}</span>
                                </div>
                                {item.products.map((product: any,  key: number) => {
                                    return(
                                        <Link to={'/' + slug(product.name) + '/' + product.id + '.html'} className="product d-flex align-items-center justify-content-between" key={key}>
                                            <div className="d-flex align-items-center">
                                                <div className="images"
                                                     style={{width: 60, height: 60, marginRight: 16}}>
                                                    <img src={product.imageUrls} alt="" style={{width: 60, height: 60}} />
                                                </div>
                                                <div className="info">
                                                    <p style={{width: 500, height: 20, overflow: `hidden`}}>{product.name}</p>
                                                    <p><strong>{number_format(product.price - product.discount)} x{product.option.amount}</strong></p>
                                                    <div className="d-flex">
                                                        <span className="mr-2">Color: {product.option.color.name}</span> -
                                                        <span className="ml-2">Size: {product.option.size.name}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span><strong>{number_format((product.price - product.discount) * product.option.amount)} đ</strong></span>
                                        </Link>
                                    )
                                })}
                                <div css={action}>
                                    <div>
                                        <p css={total}>Tổng cộng ({item.products.length} sản phẩm): <span
                                            css={price}>{number_format(item.price)}đ</span></p>
                                    </div>
                                    <div>
                                        <button css={btn1}>Đánh giá</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }catch (e) {
            console.log(e)
            return true
        }

    }
}

export default OrderDetail;



const stateOrder = css`
  
  .state_order{
    margin-right: 26px;

    p {
      width: 40px;
      height: 40px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      margin-right: 8px;
      border: 1px solid #cfcfcf;
    }
  }
  
  .state_order.active{
    p{
      color: rgb(245, 75, 36);
      font-weight: bold;
      border: 1px solid rgb(245, 75, 36);
    }
    span{
      color: rgb(245, 75, 36);  
    }
  }
  
`
const contentMb = css`
  @media screen and (max-width: 414px) {
    padding-right: 0 !important;
    padding-left: 15px !important;
  };
  background: white;

  .order_line{
    width: 100%;
    margin-bottom: 12px;
    border: 1px solid rgb(244, 245, 246);
    .order_info{
      padding: 16px;
      background: rgb(244, 245, 246);
    }
    .product {
      width: 100%;
      padding: 16px 12px;
      border-bottom: 1px dashed #d6d6d6;
    }
  }
`
const action = css`display: flex;
flex-direction: column;
align-items: flex-end;
padding: 20px 12px;`
const total = css`color: #000000;
font-size: 15px;
margin-bottom: 16px;
display: flex;
align-items: center;`
const price = css`    
color: #F54B24;
font-size: 22px;
font-weight: bold;
margin-left: 24px;`
const btn1 = css`background: #F54B24;
border: none;
border-radius: 4px;
color: white;
height: 40px;
width: 180px;
margin-left: 16px;
font-size: 13px;
font-weight: bold;`
const Wrap = css`display: flex;;
  background: white;
  padding: 16px;
  border-bottom: 2px solid #E1E1E1;
  align-items: center;`
const col1 = css`font-weight: bold;
  color: #000000;
  font-size: 22px;
  margin-bottom: 0;
  margin-right: 16px;`
const icon = css`margin-right: 16px;
  color: #000000;
  font-size: 22px;`