import React, {Component} from 'react';
import {observer} from "mobx-react";
import {homeStore} from "../HomeStore";
import Product from "../../product/Product";
import {css} from "@emotion/core";
import {getRequest} from "../../../common/helpers/RequestHelper";


@observer
class ProductHotAll extends Component {

    async componentDidMount() {
        window.scroll(0, 0)
        await homeStore.getProductHot();
    }

    async readMore(){
        homeStore.page ++
        try {
            homeStore.isLoadingBt = true;
            const result = await getRequest(`v1/products?isHot=true&page=${homeStore.page}&size=12`);
            homeStore.isLoadingBt = false;
            if(result.status === 200){
                homeStore.listProductHot = [...homeStore.listProductHot, ...result.body.data];
                homeStore.totalPagesHot = result.body.metadata.totalPages;
            }
        }catch (e) {
            return true
        }
    }

    render() {
        return (
            <div className="product_all" css={product_all}>
                <div className="title d-flex align-items-center justify-content-center">
                    <h2>Sản phẩm nổi bật</h2>
                </div>
                <div className="list_product">
                    {homeStore.listProductHot && homeStore.listProductHot.map((item, i) => {
                        return <Product data={item} key={i}/>
                    })}
                </div>
                {homeStore.totalPagesHot > 1 && (homeStore.page + 1) < homeStore.totalPagesHot && <div className="d-flex justify-content-center">
                    <a href="#" className="read_more" onClick={() => this.readMore()}>
                        {homeStore.isLoadingBt ? <i className="fal fa-spinner fa-spin"/> : "Xem thêm"}
                    </a>
                </div>}
            </div>
        );
    }
}

export default ProductHotAll;


const product_all = css`
  width: 100%;
  height: auto;
  margin-top: 24px;
  padding-bottom: 24px;
  background-color: white;
  .title{
    width: 100%;
    height: 50px;
    padding: 0 1.25rem;
    border-bottom: 1px solid rgba(0,0,0,.05);
    h2{
      color: #d0011b;
      text-transform: uppercase;
      font-weight: 500;
      margin-bottom: 0;
      font-size: 1.0625rem;
    }
    a{
      font-size: 14px;
      color: #ee4d2d;
      display: flex;
      align-items: center;
      i{
        font-size: 18px;
        color: #ee4d2d;
        padding-left: 10px;
      }
    }
  }
  .list_product{
    width: 100%;
    height: auto;
    display: flex;
    padding: 12px 16px;
    flex-wrap: wrap;
  }
  .read_more{
    width: 160px;
    height: 40px;
    font-size: 14px;
    border-radius: 4px;
    display: flex;
    color: #F44B24;
    align-items: center;
    justify-content: center;
    border: 1px solid #F44B24;
    i{
      color: #F44B24;
      font-size: 18px;
    }
  }
`