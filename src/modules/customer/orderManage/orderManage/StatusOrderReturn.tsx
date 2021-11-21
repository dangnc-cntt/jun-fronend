import React, {Component} from 'react'
import {css} from '@emotion/core';

interface IProps {
    status: string
}

const State1 = css`background: #FFF3CD;
  border-radius: 4px;
  font-size: 13px;
  color: #856404;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 60px;
  font-family: OpenSans-Semibold;`
const State2 = css`background: #FFBF44;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
const State3 = css`background: #A5AFFB;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
const State4 = css`background: #9CEB9B;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
const State5 = css`background: #219653;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
const State6 = css`background: #EB512512;;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
const State12 = css`background: #D5F2EA;
  border-radius: 4px;
  font-size: 13px;
  color: #3F3356;
  height: 24px;
  padding: 0px 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: OpenSans-Semibold;`
export default class StatusOrderReturn extends Component<IProps> {
    render() {
        const state = this.props.status
        if (state === "DRAFT" || state === "NEW") {
            return (
                <p css={State1}>
                    Yêu cầu chờ xử lý
                </p>
            )
        }
        if (state === "CONFIRMED") {
            return (
                <p css={State2}>
                    Yêu cầu được phê duyệt
                </p>
            )
        }
        if (state === "SHIPPING") {
            return (
                <p css={State3}>
                    Người mua chuẩn bị hàng
                </p>
            )
        }
        if (state === "COMPLETED") {
            return (
                <span css={State4}>
                    Đơn vị vận chuyển đã giao
                </span>
            )
        }
        if (state === "FINISHED") {
            return (
                <p css={State5}>
                    Hoàn trả hoàn thành
                </p>
            )
        }
        if (state === "CANCELED") {
            return (
                <p css={State6}>
                    Từ chối hoàn trả
                </p>
            )
        }
        if (state === "WAIT_REFUND") {
            return (
                <span css={State12}>
                    Chờ hoàn tiền
                </span>
            )
        } else return true

    }
}
