import React, {Component} from 'react';
import {observer} from "mobx-react";
import "./cateStyle.scss";
import {categoryStore, ISortType} from "./CategoryStore";
import {observable} from "mobx";
import Product from "../product/Product";
import {getRequest} from "../../common/helpers/RequestHelper";
import {css} from "@emotion/core";
import {numberWithCommas} from "../../common/utils/Utils";
import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

interface IProps{
    match:{
        params: {
            id: any
        }
    }
}

@observer
class CateProduct extends Component<IProps, any> {
    @observable id: number = 0
    async componentDidMount() {
        this.id = this.props.match.params.id;
        await categoryStore.getProductCate(this.id)
    }

    async sortType(e: any){
        categoryStore.sortType = e;
        await categoryStore.getProductCate(this.id)
    }

    async readMore(){
        categoryStore.page ++
        try {
            categoryStore.isLoadingBt = true;
            const result = await getRequest(`v1/products?isHot=true&page=${categoryStore.page}&size=12`);
            categoryStore.isLoadingBt = false;
            if(result.status === 200){
                categoryStore.listCateProduct = [...categoryStore.listCateProduct, ...result.body.data];
                categoryStore.totalPages = result.body.metadata.totalPages;
            }
        }catch (e) {
            return true
        }
    }

    async handlerFilterPrice() {
        if (categoryStore.getMinPrice || categoryStore.getMaxPrice) {
            await categoryStore.getProductCate(this.id)
        }
    }

    render() {
        return (
            <div className="cate_product" style={{minHeight: 600}}>
                <div className="content_wrapper">
                    <div className="sidebar_left">
                        <div className="filter__trademark">
                            <h5 css={h5}>Đánh giá</h5>
                            <ul className="trademark pl-0" css={less}>
                                {[5, 4, 3, 2, 1].map((item, i) => {
                                    return (<li css={star} className="mb-2" key={i} onClick={() => categoryStore.getVote = item}>
                                        <div className="d-flex align-items-center">
                                            <p className="mb-0" style={{
                                                height: "24px",
                                                width: "24px",
                                                borderStyle: "solid",
                                                borderWidth: "1px",
                                                borderColor: "#C1C1C1",
                                                borderRadius: "4px",
                                                display: "flex",
                                                background: categoryStore.getVote === item ? "#f54b24" : "#ffffff",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                marginRight: "8px"
                                            }}>
                                                {categoryStore.getVote === item &&  <i style={{color: "#FFFFFF", fontSize: "14px"}} className="fal fa-check"/> }
                                            </p>
                                            <Rater total={5}
                                                   rating={item}
                                                   interactive={false}/>
                                            <p className="mb-0 mt-1 pl-1" css={starP}>({item} sao)</p>

                                        </div>
                                    </li>)
                                })}
                            </ul>
                        </div>
                        <div>
                            <h5 css={h5}>Khoảng giá </h5>
                            <div css={group}>
                                <input maxLength={12} type="text" placeholder="1.000đ"
                                       css={inputMoney}
                                       value={numberWithCommas(categoryStore.getMinPrice || '')}
                                       onChange={(e) => {
                                           let number = e.currentTarget.value.replace(/\./g, '');
                                           categoryStore.minPrice = parseInt(number);
                                       }}/>
                                <input maxLength={12} type='text' placeholder="99.999.999đ" css={inputMoney}
                                       value={numberWithCommas(categoryStore.getMaxPrice || '')}
                                       onChange={e => {
                                           let number = e.currentTarget.value.replace(/\./g, '');
                                           categoryStore.maxPrice = parseInt(number);
                                       }}/>
                            </div>
                            <button css={buttonMoney} onClick={() => this.handlerFilterPrice()}>Áp dụng</button>
                        </div>
                    </div>
                    <div className="list_product">
                        <div className="header_sort d-flex align-items-center">
                            <p className="mb-0">Ưu tiên xem:</p>
                            <span className={`${categoryStore.sortType == ISortType.asc ? "active" : ''}`} onClick={() => this.sortType(ISortType.asc)}>Giá thấp đến cao</span>
                            <div className="line"/>
                            <span className={`${categoryStore.sortType == ISortType.desc ? "active" : ''}`} onClick={() => this.sortType(ISortType.desc)}>Giá cao đến thấp</span>
                        </div>
                        <div className="content_product">
                            {categoryStore.listCateProduct.map((item, i) => {
                                return <Product data={item} key={i}/>
                            })}
                        </div>
                        {categoryStore.totalPages > 1 && (categoryStore.page + 1) < categoryStore.totalPages && <div className="d-flex justify-content-center">
                            <a href="#" className="read_more" onClick={() => this.readMore()}>
                                {categoryStore.isLoadingBt ? <i className="fal fa-spinner fa-spin"/> : "Xem thêm"}
                            </a>
                        </div>}
                    </div>
                </div>
            </div>
        );
    }
}

export default CateProduct;


const less = css`max-height: 180px;
overflow: hidden;`
const star = css`  
a {
    width: 100%;
    display: flex;
    align-items: center;
   margin-top: 8px;
   margin-bottom: 8px;
}
`
const starP = css`cursor: pointer;
color: #999999;
font-size: 11px;
margin-top: 3px;
margin-left: 2px;
`
const inputMoney = css`
display:block !important;
visibility: visible!important;
left: 0 !important;
position: relative !important;
height: 24px;
font-size: 12px;
border-radius: 3px;
border: solid 1px #e3e8ea;
background-color: #ffffff;
padding-left: 8px;
width: 45%;
margin-bottom: 16px;&::placeholder{
    color:#999999;
    font-size:13px;
}`
const buttonMoney = css`background: #F54B24;
height: 36px;
width: 100%;
border: none;
color: white;
font-size: 13px;
cursor: pointer;&:hover{
    background-color:#E03715;
}`
const h5 = css`color: #323639;
font-weight: bold;
font-size: 15px;
margin-bottom: 12px;`
const group = css`display: flex;
justify-content: space-between;`