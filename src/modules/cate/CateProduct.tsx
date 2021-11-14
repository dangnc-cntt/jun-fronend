import React, {Component} from 'react';
import {observer} from "mobx-react";
import {homeStore} from "../home/HomeStore";

interface IProps{
    match:{

    }
}

@observer
class CateProduct extends Component<IProps, any> {

    async componentDidMount() {
        console.log(this.props)
        let id: any = this.props;
        // await homeStore.getProductCate(id)
    }

    render() {
        return (
            <div className="cate_product">
                <div className="container">
                    <div className="title">Danh mục sản phẩm</div>
                </div>
            </div>
        );
    }
}

export default CateProduct;