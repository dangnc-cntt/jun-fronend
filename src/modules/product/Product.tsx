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
                    <div className="d-flex align-items-center mb-1 justify-content-between">
                        <span className="sale_price">
                            {number_format(item.price - item.discount)}đ
                        </span>
                        {item.discount > 0 &&<span className="price">
                            {number_format(item.price)}đ
                        </span>}
                    </div>
                    {item.star > 0 && <ul style={{listStyle: 'none', paddingLeft: 0}} className="d-flex mb-0">
                        {[...Array(5)].map((value, index) =>
                            <li key={index} onClick={() => item.star = (index + 1) as any}>
                                <i style={{color: index < item.star ? '#FAC917' : "#d2d2d2", fontSize: 12}} className="fas fa-star"/>
                            </li>)}
                    </ul>}
                </div>
            </Link>
        );
    }
}

export default Product;
