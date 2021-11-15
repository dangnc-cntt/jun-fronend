import React, {Component} from 'react';
import {observer} from "mobx-react";
import {productDetailStore} from "./ProductDetailStore";

interface IProps {
   match:{params:{id: any}}
}

@observer
class ProductDetail extends Component <IProps, any>{

    async componentDidMount() {
       await productDetailStore.getProductDetail(this.props.match.params.id)
    }

    render() {
        return (
            <div className="product_detail">
                <div className="container">
                    <div className="images">

                    </div>
                    <div className="content">

                    </div>
                </div>
            </div>
        );
    }
}

export default ProductDetail;