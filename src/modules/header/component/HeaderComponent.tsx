import React, {Component} from 'react';
import $ from "jquery";
import '../containers/headerStyle.scss';
import {observer} from 'mobx-react';
import {signUpStore} from "../../authen/LoginSignUp/Store/SignUpStore";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {observable} from "mobx";
import User from "./User";
import {categoryStore} from "../../cate/CategoryStore";
import {Link} from "react-router-dom";
import {slug} from "../../../common/utils/Utils";
import {cartStore} from "../../cart/CartStore";
import QuickViewCart from "../../cart/components/QuickViewCart";

@observer
export default class HeaderComponent extends Component {
  private boxLogin = React.createRef<HTMLDivElement>();
  @observable showLogin: boolean = false;

  constructor(props: any) {
    super(props);
    this.state = {
      checkCate: false
    }
  }

  handleClickLoginOut() {
    this.showLogin = !this.showLogin
  }

  async componentDidMount() {
    this.handleScroll();
    await categoryStore.getCate()
  }

  handleScroll = () => {
    $(window).on('scroll', () => {
      if (window.scrollY >= 80) {
        $('#header').addClass("fixed-top");
      } else {
        $('#header').addClass("fixed-top");
      }
    });
  }

  handleClickLogin() {
    LoginStore.isShowLoginForm = true;
    signUpStore.isSignUpForm = false
  }

  handleClickSignup() {
    LoginStore.isShowLoginForm = false;
    signUpStore.isSignUpForm = true
  }


  render() {
    return (
      <div className="header">
          <div className="content-header">
            <div className="container d-flex h-100 align-items-center justify-content-between">
              <div className="logo d-flex align-items-center">
                <Link to={'/'}><img style={{width: `100px`}} src="/assets/images/logo_in.png" alt=""/></Link>
                <div className="category ml-4">
                  <div className="dropdown">
                    <div className="dropdown-toggle" id="dropdownMenuCate" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <p>Danh mục sản phẩm</p> <i className="fal fa-angle-down"/>
                    </div>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuCate">
                      {categoryStore.listCate.map((value, i) => {
                        return <Link className="dropdown-item" to={`/category-product/${slug(value.name)}/${value.id}.html`} key={i}>{value.name}</Link>
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <div className="search_header d-flex align-items-center">
                <input type="text" placeholder="Tìm kiếm trên Jun Shop"/>
                <button className="search_button">
                  <i className="fal fa-search"/>
                </button>
              </div>
              {LoginStore.userData ? <div className="d-flex align-items-center">
                <User/>
                <div className="cart-notice position-relative ml-4">
                  <i className="fal fa-shopping-cart" style={{fontSize: `20px`}}/>
                  {cartStore.listCart && cartStore.listCart.length > 0 && <span className="user_itemCount d-flex align-items-center justify-content-center position-absolute" style={{
                    width: `30px`,
                    height: `20px`,
                    borderRadius: `16px`,
                    background: `rgb(245, 75, 36)`,
                    color: `white`,
                    fontSize: `12px`,
                    top: `-10px`,
                    right: `-24px`
                  }}>{cartStore.listCart.length}</span>}
                  <QuickViewCart/>
                </div>
              </div> : <div className="user-header d-flex align-items-center">
                <div className="icon-user-header mr-2 position-relative text-right">
                  <div className="user-icon d-inline-block d-flex align-items-center">
                    <div className="icon">
                      <i className="fal fa-user"/>
                    </div>
                    <div className="text">
                      <div className="d-flex">
                        <span style={{marginRight: "4px"}} onClick={() => this.handleClickLogin()}>Đăng nhập/</span><span
                          onClick={() => this.handleClickSignup()}>Đăng ký</span>
                      </div>
                      <div className="d-flex align-items-center" onClick={() => this.handleClickLoginOut()} ref={this.boxLogin}>
                        <p className="mb-0" style={{marginRight: "6px"}}>Tài khoản</p><i className="fal fa-chevron-down"/>
                        <div className="hover-user position-absolute">
                          {this.showLogin &&
                          <div className="login-register text-center">
                            <p>Chào mừng bạn đến với <span style={{color: `#F54B24`}}> Jun shop !</span>
                            </p>
                            <button className="login" onClick={() => this.handleClickLogin()}>Đăng nhập
                            </button>
                            <button className="register" onClick={() => this.handleClickSignup()}>Đăng
                              ký
                            </button>
                          </div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <i className="fal fa-bell mr-4" style={{fontSize: `20px`}}/>
                <i className="fal fa-shopping-cart" style={{fontSize: `20px`}}/>
              </div>}
            </div>
          </div>
      </div>
    );
  }
}
