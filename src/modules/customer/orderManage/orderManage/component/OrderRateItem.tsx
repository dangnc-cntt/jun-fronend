import React from "react";
import {observer} from "mobx-react";
import {observable} from "mobx";
import css from "@emotion/css";

interface IOrderRateItemProps {
    orderLine: any,
    onReview: (star: number, content: string) => any
}


@observer
export default class OrderRateItem extends React.Component<IOrderRateItemProps, any> {
    @observable rate: 1 | 2 | 3 | 4 | 5 = 5;
    @observable text: string = '';


    render() {
        try {
            const {orderLine} = this.props;
            return <div css={reviewImageStyle} className="popup-review">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        {orderLine.imageUrls ? <img src={orderLine.imageUrls[0]} alt={orderLine.productName}
                             style={{width: "80px", height: '80px'}}/> : ''}
                        <div className="d-flex flex-column pl-2">
                            <p style={{color: 'black'}}>{orderLine.name}</p>
                        </div>
                    </div>
                    <ul style={{listStyle: 'none', paddingLeft: 0}} className="d-flex">
                        {[...Array(5)].map((value, index) =>
                            <li key={index} onClick={() => this.rate = (index + 1) as any}>
                                <i style={{color: index < this.rate ? '#FAC917' : undefined}} className="fas fa-star"/>
                            </li>)}
                    </ul>
                </div>
                <textarea
                    style={{resize: 'none', marginTop: '4px'}}
                    value={this.text}
                    onChange={e => this.text = e.currentTarget.value}
                    rows={5} className="form-control"/>
            </div>;
        } catch (e) {
            console.error(e);
            return null;
        }
    }
}

export const reviewImageStyle = css`
    ul.review-images {
        list-style: none !important;
        padding-left: 0 !important;
        
        li {
            &:not(:first-of-type) {
                margin-left: 16px;
            }
            div.add {
                width: 80px;
                height: 80px;
                border: dashed 1px #cccccc;
                input {
                    top: 0; left: 0; bottom: 0; right: 0; 
                    opacity: 0;
                    cursor: pointer !important;
                }
            }
            div.image {
                position: relative;
                width: 80px;
                height: 80px;
                background-size: contain;
                i.fa-trash {
                    display: none;
                    color: #da442f;
                    font-size: 22px;
                    cursor: pointer;
                }
                &:hover {
                    &:before {
                        content: "";
                        position: absolute;
                        top: 0; left: 0; bottom: 0; right: 0;
                        background-color: rgba(255,255,255,.45);
                        z-index: 1;
                    }
                    i.fa-trash {
                        display: block;
                        z-index: 2;
                    }
                }
            }
        }
    }
`;