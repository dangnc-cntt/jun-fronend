import React, {Component} from 'react';
import {observer} from "mobx-react";
import "./HomStyle.scss"
import {Link} from "react-router-dom";
import {homeStore} from "./HomeStore";
import Product from "../product/Product";
import {getRequest} from "../../common/helpers/RequestHelper";

@observer
class HomeComponent extends Component {

    async componentDidMount() {
        await homeStore.getProductHot();
        await homeStore.getProductAll();
    }

    async readMore(){
        homeStore.page ++
        try {
            homeStore.isLoadingBt = true;
            const result = await getRequest(`/v1/products?page=${homeStore.page}&size=18`);
            homeStore.isLoadingBt = false;
            if(result.status === 200){
                homeStore.listProductAll = [...result.body.data];
                homeStore.totalPages = result.body.metadata.totalPages;
            }
        }catch (e) {
            return true
        }
    }

    render() {
        return (
            <div className="home-page">
                <div className="banner d-flex align-items-center justify-content-center">
                    <img className="w-100 h-100" style={{objectFit: 'cover'}} src="./assets/images/banner13-1.jpg" alt=""/>
                </div>
                <div className="product_hot">
                    <div className="title d-flex align-items-center justify-content-between">
                        <h2>Sản phẩm nổi bật</h2>
                        <Link to={`/product-hot`}>Xem tất cả <i className="fal fa-angle-right"/></Link>
                    </div>
                    <div className="list_product">
                        {homeStore.listProductHot && homeStore.listProductHot.map((item, i) => {
                            if(i < 12){
                                return <Product data={item} key={i}/>
                            }
                        })}
                    </div>
                </div>
                <div className="product_all">
                    <div className="title d-flex align-items-center justify-content-center">
                        <h2>Tất cả sản phẩm</h2>
                    </div>
                    <div className="list_product">
                        {homeStore.listProductAll && homeStore.listProductAll.map((item, i) => {
                            return <Product data={item} key={i}/>
                        })}
                    </div>
                    {homeStore.totalPages > 1 && homeStore.page < homeStore.totalPages && <div className="d-flex justify-content-center">
                        <a href="#" className="read_more" onClick={() => this.readMore()}>
                            {homeStore.isLoadingBt ? <i className="fal fa-spinner fa-spin"/> : "Xem thêm"}
                        </a>
                    </div>}
                </div>
            </div>
        );
    }
}

export default HomeComponent;