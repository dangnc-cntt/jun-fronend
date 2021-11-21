import React from "react";
import "./style.scss";

interface IPaginationProps {
    total: number
    size: number
    active: number

    OnChangePage: (page: number) => any
}

export default class Pagination extends React.Component<IPaginationProps> {
    render() {
        let totalPage: number = (this.props.total / this.props.size);
        if (totalPage > parseInt(totalPage.toString()))
            totalPage = parseInt(totalPage.toString()) + 1;
        if (totalPage > 0) {
            if (totalPage < 8 || (this.props.active < 3))
                return (<div id="my-pagination" className={this.props.active > 99 ? 'padding' : ''}>
                    <ul>
                        {this.props.active > 0 &&
                        <li className="pre" onClick={() => this.props.OnChangePage(this.props.active - 1)}><i
                            className="fal fa-chevron-left"/></li>}
                        {[...Array(totalPage < 8 ? totalPage : 7)].map((value, index) =>
                            <li key={index} className={index === this.props.active ? 'active' : ''}
                                onClick={() => this.props.OnChangePage(index)}>{index + 1}</li>)}
                        {this.props.active < totalPage - 1 &&
                        <li className="next" onClick={() => this.props.OnChangePage(this.props.active + 1)}><i
                            className="fal fa-chevron-right"/></li>}
                    </ul>
                </div>);
            else return (<div id="my-pagination" className={this.props.active > 99 ? 'padding' : ''}>
                <ul>
                    {this.props.active > 0 &&
                    
                    <li className="pre" onClick={() => this.props.OnChangePage(this.props.active - 1)}><i
                        className="fal fa-chevron-left"/></li>}
                    {this.props.active > 2 &&
                    <li className="first-page" onClick={() => this.props.OnChangePage(0)}>1</li>}


                    {this.props.active - 3 > 0 && <li>...</li>}
                    {[...Array(5)].map((value, index) => {
                        let page: number = 0;
                        if (index !== 2) page = this.props.active - (1 - index);
                        else if (index === 2) page = this.props.active + 1;
                        return page <= totalPage ?
                            <li key={index} className={page - 1 === this.props.active ? 'active' : ''}
                                onClick={() => this.props.OnChangePage(page - 1)}>{page}</li> : null;
                    })}
                    {(this.props.active + 4 < totalPage) && <li>...</li>}
                    {(totalPage - 2 > this.props.active + 1) &&
                    <li className="last-page" onClick={() => this.props.OnChangePage(totalPage - 1)}>{totalPage}</li>}
                    {this.props.active < totalPage - 1 &&
                    <li className="next" onClick={() => this.props.OnChangePage(this.props.active + 1)}><i
                        className="fal fa-chevron-right"/></li>}
                </ul>
            </div>);
        } else return null;
    }
}
