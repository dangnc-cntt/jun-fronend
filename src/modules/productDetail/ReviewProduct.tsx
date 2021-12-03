import React, {Component} from 'react';
import {observer} from "mobx-react";
import {productDetailStore} from "./ProductDetailStore";
import {getLocalDateTime} from "../../common/utils/Utils";


@observer
class ReviewProduct extends Component {

    render() {
        return (
            <div className="list-review w-100">
                <div className="title">
                    <h3>Đánh giá sản phẩm</h3>
                </div>
                {productDetailStore.listReview && productDetailStore.listReview.map((item, i) => {
                    return <div className="review d-flex justify-content-between" key={i}>
                        <div className="info d-flex">
                            <div className="avatar">
                                {!item.account.avatarUrl ? <img src="/assets/images/img.png" alt=""/> : <img src={item.account.avatarUrl} alt=""/>}
                            </div>
                            <div className="content">
                                <p className="name mt-0">{item.account.fullName}</p>
                                <ul style={{listStyle: 'none', paddingLeft: 0}} className="d-flex mb-2">
                                    {[...Array(5)].map((value, index) =>
                                        <li key={index} onClick={() => item.star = (index + 1) as any}>
                                            <i style={{color: index < item.star ? '#FAC917' : "#d2d2d2"}} className="fas fa-star"/>
                                        </li>)}
                                </ul>
                                <p>{item.content}</p>
                            </div>
                        </div>
                        <span>{getLocalDateTime(item.createdAt, "dd/mm/yyyy")}</span>
                    </div>
                })}
            </div>
        );
    }
}

export default ReviewProduct;