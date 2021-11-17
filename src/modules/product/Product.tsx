import React, {Component} from 'react';
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import "./ProductStyle.scss"
import {number_format, slug} from "../../common/utils/Utils";


@observer
class Product extends Component<{data: any}, any> {

    render() {
        let item = this.props.data;

        return (
            <Link to={`/${slug(item.name)}/${item.id}.html`} className="card_product">
                <div className="images">
                    <img src={item.imageUrls[0]} alt=""/>
                </div>
                <div className="content">
                    <div className="name">
                        {item.name}
                    </div>
                    <div className="d-flex align-items-center justify-content-between">
                        <span className="sale_price">
                            {number_format(item.price)}đ
                        </span>
                        {/*<span className="price">*/}
                        {/*    {item.price}*/}
                        {/*</span>*/}
                    </div>
                </div>
            </Link>
        );
    }
}

export default Product;
