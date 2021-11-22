import React, {Component} from 'react';
import {observer} from "mobx-react";
import {productDetailStore} from "./ProductDetailStore";
import './ProductDetailStyle.scss'
import {css} from "@emotion/core";
import $ from "jquery"
import {number_format} from "../../common/utils/Utils";
import {observable} from "mobx";
import {cartStore} from "../cart/CartStore";

interface IProps {
   match:{ params: {id: any}}
}

@observer
class ProductDetail extends Component <IProps, any>{
    @observable optionId: any = '';
    async componentDidMount() {
       await productDetailStore.getProductDetail(this.props.match.params.id)
    }

    chooseOption(item: any){
       this.optionId = item.id;
       productDetailStore.amount = item.amount
    }


    render() {
        if(productDetailStore.productDetail){
            let id = productDetailStore.productDetail.id;
            let price = productDetailStore.productDetail.price;
            let salePrice = productDetailStore.productDetail.price - productDetailStore.productDetail.discount;
            const discount = price > salePrice ? Math.ceil((price - salePrice) / price * 100) : 0;
            return (
                <div className="product_detail">
                    <div className="container d-flex">
                        <div>
                            <div className="images">
                                <img src={productDetailStore.productDetail.imageUrls[productDetailStore.imagesActive]} alt=""/>
                            </div>
                            <div className="list_img">
                                {productDetailStore.productDetail.imageUrls && productDetailStore.productDetail.imageUrls.map((item, i) => {
                                    return <span className={productDetailStore.imagesActive === i ? "active" : ''} key={i}><img src={item} onClick={() => productDetailStore.imagesActive = i} alt=""/></span>
                                })}
                            </div>
                        </div>
                        <div className="content">
                            <div className="name">
                                <h2>{productDetailStore.productDetail.name}</h2>
                            </div>
                            <div className="d-flex align-items-center">
                                <p className="salePrice mr-4">{number_format(salePrice)}đ</p> <span className="price">{number_format(price)}đ</span>
                            </div>
                            {discount > 0 && <p className="discount mb-4">{discount}% <span className="ml-1">GIẢM</span></p>}
                            {productDetailStore.productDetail.optionList && <div className="d-flex mb-4 options align-items-center">
                                <label className="mr-4"><strong>Phân loại:</strong></label>
                                {productDetailStore.productDetail.optionList.map((item, i) => {
                                    return <span className={`${item.id == this.optionId ? "active" : ''} mr-2 p-2`} onClick={() => this.chooseOption(item)} key={i}>{item.color.name} - {item.size.name}</span>
                                })}
                            </div>}
                            <div className="next-number-picker d-flex align-items-center justify-content-center" css={z}>
                                <button css={button2} className=" " type="button" onClick={() => subQuantity()}><i
                                    className="far fa-minus"/></button>
                                <input css={input} className="product-result-quantity" type="text" readOnly
                                       value={JSON.stringify(productDetailStore.quantity)}/>
                                <button css={button} className=" " type="button" onClick={() => addQuantity()}><i
                                    className="far fa-plus"/></button>
                            </div>
                            <p className="quantity">
                                {productDetailStore.amount !== -1 && (productDetailStore.amount > 0 ? `Còn ${number_format(productDetailStore.amount)} sản phẩm trong kho` : <span className="text-danger">Hết hàng</span>)}
                            </p>
                            <div className="action-normal d-flex align-items-center" id="product-detail-action">
                                <button className="add" onClick={() => cartStore.addToCart(id, this.optionId, productDetailStore.quantity, productDetailStore.amount)}>Thêm vào giỏ</button>
                                <button className="buy">Mua ngay</button>
                            </div>
                            <div className="commitment" css={commitment}>
                                <span>Cam kết sản phẩm chính hãng</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else return null

    }
}

export default ProductDetail;


export function addQuantity() {
    if (productDetailStore.productDetail && productDetailStore.quantity) {
        productDetailStore.quantity = productDetailStore.quantity + 1
        $('.product-result-quantity').prop('value', productDetailStore.quantity)
    }
}

export function subQuantity() {
    if (productDetailStore.quantity > 1) {
        productDetailStore.quantity = productDetailStore.quantity - 1
        $('.product-result-quantity').prop('value', productDetailStore.quantity)
    }
}

const commitment = css`
  padding: 32px 0 14px;
  margin-top: 40px;
  border-top: 1px solid #E1E1E1;
  span{
    font-weight: 600;
    font-size: 15px;
    line-height: 20px;
    color: #F44B24
  }
`;


const input = css`
  width: 86px;
  font-size: 18px;
  text-align: center;
  border: none;
  background-color: white`
const button = css`
  color: #666666;
  border: none;
  font-size: 14px;
  background: #F4F5F6;
  width: 48px !important;
  height: 48px !important;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid #C1C1C1;
  &:hover {
    background: #E1E1E1;
  }
  `
const button2 = css`
  color: #666666;
  border: none;
  font-size: 14px;
  background: #F4F5F6;
  width: 48px !important;
  height: 48px !important;
  border-radius: 4px 0px 0px 4px;
  border-right: 1px solid #C1C1C1;
  &:hover {
    background: #E1E1E1;
  }
`
const nameLayout = css`height: 30px;
  background: #ebeced;
  width: 60%;
  animation-name: timeline_32FJ;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  background: linear-gradient(90deg, #eee 8%, #ddd 18%, #eee 33%);`

const z = css`
  width: 180px;
  border: 1px solid #E1E1E1;
  border-radius: 5px;
  `
