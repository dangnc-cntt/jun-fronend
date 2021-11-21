import React, {Component} from 'react'
import {observer} from 'mobx-react';
import {Link} from 'react-router-dom';
import './QuickviewCartStyle.scss';
import {cartStore} from "../CartStore";
import {number_format, slug} from "../../../common/utils/Utils";

interface IState {
    count: number
}

interface IProps {

}

@observer
export default class QuickViewCart extends Component<IProps, IState> {
    constructor(props: any) {
        super(props);
        this.state = {count: 0}
    }

    render() {
        if (cartStore.listCart.length > 0) {
            return (
                <div className="content_shopping_cart">
                    <div className="cart_content w-100">
                        {cartStore.listCart && cartStore.listCart.map((item, i) => {
                            if (i < 5) {
                                return (
                                    <div className="cart d-flex" key={i}>
                                        <div className="image">
                                            <Link to={'/' + slug(item.name) + '/' + item.id + '.html'}>
                                                <img src={item.imageUrls[0]} alt=""/>
                                            </Link>
                                        </div>
                                        <div className="content">
                                            <div className="name">
                                                <Link
                                                    to={'/' + slug(item.name) + '/' + item.id + '.html'}>{item.name}</Link>
                                            </div>
                                            <div className="d-flex">
                                                <div className="trademark">
                                                    <div className="trademark d-flex">
                                                        <div className="mr-1">
                                                            <span className="mr-4">Color: {item.option.color.name}</span>
                                                            <span>Size: {item.option.size.name}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="quantity ml-2">
                                                    <span>x{item.option.amount}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="price text-right">
                                            <p>{number_format(item.price - item.discount)}đ</p>
                                        </div>
                                        <div className="delete d-flex justify-content-center align-items-center"
                                             onClick={() => {cartStore.listCart.splice(i, 1); cartStore.updateCart()}}>
                                            <span className="fal fa-trash"/>
                                        </div>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                    <div className="pay">
                        <Link to="/cart">
                            <button>Xem giỏ hàng</button>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="no_content_shopping_cart text-center">
                    <div className="cart_content w-100">
                        <div className="image w-100 d-flex justify-content-center align-items-center">
                            <img src="/assets/images/empty.svg" alt='icon'/>
                        </div>
                        <p style={{fontSize: `15px`, color: `#333333`}}>Giỏ hàng của bạn hiện đang trống!</p>
                        <p style={{fontSize: `13px`, color: `#333333`}}>Đừng bỏ lỡ <span>Bão ưu đãi</span> đang
                            đổ bộ trên Jun Shop.</p>
                    </div>
                </div>
            )
        }

    }
}
