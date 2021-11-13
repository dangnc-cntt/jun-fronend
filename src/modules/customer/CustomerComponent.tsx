import React from "react";
import {CustomerRouter} from "./CustomerRouter";
import {IMenu, MenuDefined} from "./MenuDefined";
import {Link} from "react-router-dom";
import "./CustomerStyle.scss";
import {observer} from "mobx-react";
import {PROFILE_CTRL} from "./CustomerControl";
import {CustomerStore, store} from "./CustomerStore";
import {LoginStore} from "../authen/LoginSignUp/Store/LoginStore";
import {toastUtil} from "../../common/utils/ToastUtil";

interface IProps {
    history: any
    location: { pathname: string, search: string | null }
}
@observer
export default class CustomerComponent extends React.Component<IProps, any> {
    public store: CustomerStore = store;
    public MenuData: IMenu[] = MenuDefined.sort((a, b) => {
        if (a.sort < b.sort) return -1;
        else if (a.sort > b.sort) return 1;
        else return 0;
    }).reduce((previousValue: IMenu[], currentValue) => {
        previousValue.push({
            id: currentValue.id,
            sort: currentValue.sort,
            title: currentValue.title,
            data: currentValue.data.sort((a, b) => {
                if (a.sort < b.sort) return -1;
                else if (a.sort > b.sort) return 1;
                else return 0;
            })
        });
        return previousValue;
    }, []);

    state = {
        active: ''
    };

    constructor(props: any) {
        super(props);
        PROFILE_CTRL.setView(this);
        PROFILE_CTRL.setStore(this.store);
    }

    async componentDidMount() {
        window.scrollTo(0, 0);
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        if (!!LoginStore.getUserData) {
            return <div id="profiles-page">
                <div className="container-fluid breadcrumbs">
                    <div className="container">
                        {/*Breackums*/}
                        <div className="row mx-0">
                            <div className="col-12 px-0">
                                <ol>
                                    <li><Link to="/">Trang chủ</Link></li>
                                    {this.store.getBreadcrumbs.length > 0 && this.store.getBreadcrumbs.map((value, index) => {
                                        if (value.link)
                                            return <li key={index}><Link to={value.link}>{value.title}</Link></li>;
                                        else
                                            return <li key={index}>{value.title}</li>;
                                    })}
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container content">
                    {/*Menu*/}
                    <div className="row menu mx-0">
                        <div className="col-2">
                            <h3>Tài khoản của bạn</h3>
                            <ol>
                                {this.MenuData.map((value, index) => <li key={index}>
                                    <p>{value.title}</p>
                                    <ul>
                                        {value.data.map((value1, index1) => {
                                            if(!value1.hide ){
                                                return(
                                                  <li key={index1}
                                                      className={JSON.stringify(this.store.getMenuActive) === JSON.stringify([value.id, value1.id]) ? 'active' : ''}>
                                                      {value1.icon}
                                                      {value1.link === "#" && <Link to="#"
                                                                                    onClick={() => toastUtil.warning('Chức năng đang xây dựng!')}>{value1.name}</Link>}
                                                      {value1.link !== "#" && <Link to={value1.link}>{value1.name}</Link>}
                                                  </li>
                                                )
                                            }
                                        }
                                            )}
                                    </ul>
                                </li>)}
                            </ol>
                        </div>
                        <div className="col-10 px-0">
                            {/*Router*/}
                            <CustomerRouter/>
                        </div>
                    </div>
                </div>
            </div>;
        } else
            return null;
    }
}