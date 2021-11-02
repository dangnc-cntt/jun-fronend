import React, {Component} from 'react';
import {LoginStore} from "../../authen/LoginSignUp/Store/LoginStore";
import {Link} from "react-router-dom";
import {logOut} from "../../authen/LoginSignUp/Reducers/LoginReducer";
import {observer} from "mobx-react";
import {css} from "@emotion/core";

@observer
class User extends Component {

    converName(name: string | number) {
        if (typeof (name) === "number") {
            return name
        } else {
            const result = name.split('@');
            return result[0]
        }
    }

    render() {
        if(LoginStore.getUserData){
            return (
                <div css={user} className="user">
                    <div className="user-hover">
                        {LoginStore.getUserData.avatarUrl ?
                            <div className="d-flex align-items-center" style={{height: `60px`}}>
                                <div className="img_user" style={{marginRight: 16}}>
                                    <img src={LoginStore.getUserData.avatarUrl} alt=""/>
                                </div>
                                <div className="information-user">
                                    <p className="text-white">Xin chào</p>
                                    <span className="text-white">{this.converName(LoginStore.getUserData.fullName)}</span>
                                </div>
                            </div> :
                            <div className="d-flex align-items-center">
                                <div className="img-user" style={{lineHeight: `60px`, width: `36px`, marginRight: 16}}>
                                    <img src="/assets/images/img.png" alt=""/>
                                </div>
                                <div className="information-user">
                                    <p className="text-white">Xin chào</p>
                                    <span className="text-white">{this.converName(LoginStore.getUserData.fullName)}</span>
                                </div>
                            </div>}
                        <div className="list-manager-information">
                            <div className="manager-information">
                                <Link to="/customer/account" className="css_information-user">
                                    <div className="img">
                                        <i className="fal fa-user"/>
                                    </div>
                                    <div className="content">
                                        <p>Tài khoản của tôi</p>
                                    </div>
                                </Link>
                                <Link to="/customer/order/manage?type=all&page=0"
                                      className="css_information-user text-center">
                                    <div className="img">
                                        <i className="fal fa-file-check"/>
                                    </div>
                                    <div className="content">
                                        <p>Đơn hàng của tôi</p>
                                    </div>
                                </Link>
                                <a className="css_information-user text-center">
                                    <div className="img">
                                        <i className="fal fa-envelope-open"/>
                                    </div>
                                    <div className="content">
                                        <p>Tin nhắn của tôi</p>
                                    </div>
                                </a>
                                <Link to="/customer/rate?type=wait-review&page=0"
                                      className="css_information-user text-center">
                                    <div className="img">
                                        <i className="fal fa-thumbs-up"/>
                                    </div>
                                    <div className="content">
                                        <p>Đánh giá của tôi</p>
                                    </div>
                                </Link>
                            </div>
                            <div className="logout-user d-flex align-items-center" onClick={() => {
                                logOut()
                            }}>
                                <div className="icon-out">
                                    <i className="fal fa-sign-out"/>
                                </div>
                                <span>Thoát khỏi tài khoản</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }else return true
    }
}

export default User;

const user = css`
  .img-user img {
    max-width: 100%;
    max-height: 100%;
  }

  .user-hover {
    height: 60px;
    position: relative;
    transition: .3s;

    &:hover {
      .list-manager-information {
        display: block !important;
        opacity: 1;
        @keyframes fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        animation: fade ease-in .3s;
      }
    }

    .list-manager-information {
      width: 280px;
      height: 253px;
      border-radius: 4px;
      background: white;
      opacity: 0;
      padding: 0;
      border: none;
      display: none;
      z-index: 150;
      position: absolute;
      box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
      transform: translate3d(-150px, -2px, 0px) !important;

      &:before {
        bottom: 100%;
        left: 15.9%;
        border: solid transparent;
        content: " ";
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
      }

      &:before {
        border-color: rgba(194, 225, 245, 0);
        border-bottom-color: white;
        border-width: 10px !important;
        margin-left: 186px;
      }

      .manager-information {
        padding: 15px 15px 14px;

        .css_information-user {
          width: 100%;
          display: flex;
          padding: 4px 0;
          align-items: center;

          &:hover .content p {
            color: #F54B24;
          }

          .img {
            width: 36px;
            height: 36px;
            display: flex;
            border-radius: 50%;
            justify-content: center;
            align-items: center;
            background-color: #FFE8DA;

            i {
              font-size: 22px;
              color: #F54B24;
            }
          }

          .content {
            padding-left: 10px;

            p {
              font-size: 15px;
              color: #323639;
              font-family: "Opensans";
              transition: .3s;
            }
          }
        }
      }

      .logout-user {
        width: 100%;
        height: 48px;
        padding: 0 15px;
        border-radius: 0 0 4px 4px;
        background-color: #F4F5F6;

        .icon-out {
          width: 32px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50%;
          background-color: #E1E1E1;

          i {
            font-size: 20px;
            color: #F54B24;
          }
        }

        span {
          font-size: 15px;
          color: #323639;
          font-family: "Opensans";
          margin-left: 13px;

        }
      }
    }
  }
`