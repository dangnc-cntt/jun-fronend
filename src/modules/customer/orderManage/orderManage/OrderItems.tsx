import React, {Component} from 'react'
import {css} from '@emotion/core';
import {observer} from 'mobx-react';
import {orderStore} from '../store';
import {Link} from "react-router-dom";
import {getLocalDateTime, number_format, slug} from "../../../../common/utils/Utils";
import StatusOrder from "./StatusOrder";

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

@observer
export default class OrderItems extends Component<any, any> {

    render() {
        if (!orderStore.listOrders){
            return (
                <div className="not-result">
                    <p>Chưa có đơn hàng <span/> nào!</p>
                    <img src="http://cdn.chozoi.com/product/1564540131726-not-order.PNG"/>
                </div>
            )
        } else return (
                <div className="order_management_content" css={contentMb}>
                    {orderStore.listOrders && orderStore.listOrders.map((item: any, i: number) => {
                        return <div key={i} className="w-100 order_line">
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
                                    <Link to={"/customer/order/manage/code/" + item.id}>
                                        <button css={btn1}>Chi tiết đơn hàng</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            )
    }

}

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
