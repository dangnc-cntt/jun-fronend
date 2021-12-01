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
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;`
const State2 = css`background: #CCE5FF;
  border-radius: 4px;
  font-size: 13px;
  color: #004085;
  height: 24px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;`
const State3 = css`background: #D4EDDA;
  border-radius: 4px;
  font-size: 13px;
  color: #155724;
  height: 24px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;`
const State4 = css`background: #E2E3E5;
  border-radius: 4px;
  font-size: 13px;
  color: #818182;
  height: 24px;
  width: 120px;
  display: flex;
  justify-content: center;
  align-items: center;`


export default class StatusOrder extends Component<IProps> {
    render() {
        const state = this.props.status
        if (state === "NEW") {
            return (
                <p css={State1}>
                    Chờ xác nhận
                </p>
            )
        }
        if (state === "DELIVERY") {
            return (
                <p css={State2}>
                    Đang giao
                </p>
            )
        }
        if (state === "VPN_UNPAID") {
            return (
                <p css={State3}>
                    Chờ thanh toán
                </p>
            )
        }
        if (state === "COMPLETED") {
            return (
                <p css={State3}>
                    Hoàn thành
                </p>
            )
        }
        if (state === "CONFIRMED") {
            return (
                <p css={State4}>
                   Đang xử lý
                </p>
            )
        } else return true

    }
}
