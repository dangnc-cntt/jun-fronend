import React, {Component} from 'react';
import $ from "jquery";
import '../containers/headerStyle.scss';
import {observer} from 'mobx-react';
import {signUpStore} from "../../authen/LoginSignUp/Store/SignUpStore";
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {css} from "@emotion/core";
import {observable} from "mobx";
import User from "../../home/User";

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
              <div className="logo">
                <img style={{width: `100px`}} src="/assets/images/logo_in.jpg" alt=""/>
              </div>
              {LoginStore.getUserData ? <User/> :
              <div className="user-header">
                <div className="icon-user-header position-relative text-right">
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
                        <p style={{marginRight: "6px"}}>Tài khoản</p><i className="fal fa-chevron-down"/>
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
              </div>}
            </div>
          </div>
      </div>
    );
  }
}



const google = css`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  opacity: 0;

  &:hover {
    opacity:  @important
  }

  span {
    display: none
  }

  div {
    display: none
  }
`;