import React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {observable} from "mobx";
import css from "@emotion/css";

interface IOrderRateItemProps {
    orderLine: any
    shopId: number,
    shopName: string,
    onReview: (rating: number, text: string, images?: { file: File, src?: string }[]) => any
}

export const MAX_SIZE_UPLOAD = 2000000; // 2MB

@observer
export default class OrderRateItem extends React.Component<IOrderRateItemProps, any> {
    @observable rate: 1 | 2 | 3 | 4 | 5 = 5;
    @observable text: string = '';
    @observable images: { file: File, src?: string }[] = [];
    @observable keyInput: number = Date.now();

    public handlerOnReview() {
        this.props.onReview(this.rate, this.text, this.images.length ? this.images : undefined);
    }

    handlerOnUpload(files: FileList | null) {
        const generateImageUrlBlob = (file: File): Promise<string> => {
            return new Promise<string>((resolve, reject) => {
                try {
                    const fr = new FileReader();
                    fr.onload = () => {
                        const img = new Image();
                        if (typeof fr.result === "string") {
                        } else reject();
                    };
                    return fr.readAsDataURL(file);
                } catch (e) {
                    console.error(e);
                    reject(e);
                }
            });
        };
        if (files) {
            Object.values(files).map(async (value) => {
                if (this.images.length < 4 && value.size <= MAX_SIZE_UPLOAD) {
                    const src = await generateImageUrlBlob(value);
                    this.images.push({file: new File([value], value.name, {type: "image/png"}), src: src});
                }
                return null;
            });
        }
        this.keyInput = Date.now();
    }

    render() {
        try {
            const {orderLine} = this.props;
            return <div css={reviewImageStyle} className="popup-review">
                <div className="d-flex justify-content-between">
                    <div className="d-flex">
                        <img src={orderLine.productImage} alt={orderLine.productName}
                             style={{width: "80px", height: '80px'}}/>
                        <div className="d-flex flex-column pl-2">
                            <p style={{color: 'black'}}>{orderLine.productName}</p>
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
                <p className="mt-2">Hình ảnh</p>
                <ul className="review-images d-flex">
                    {this.images.map((value, index) => <li key={index}>
                        <div className="image d-flex flex-column align-items-center justify-content-center"
                             style={{backgroundImage: `url(${value.src})`}}>
                            <i className="fas fa-trash" onClick={() => this.images.splice(index, 1)}/>
                        </div>
                    </li>)}
                    {this.images.length < 4 && <li>
                        <div
                            className="position-relative d-flex flex-column align-items-center justify-content-center add">
                            <i className="fal fa-plus"/>
                            <input className="position-absolute"
                                   onChange={e => this.handlerOnUpload(e.currentTarget.files)}
                                   type="file"
                                   accept="image/jpeg, image/png"
                                   multiple={true}/>
                        </div>
                    </li>}
                </ul>
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