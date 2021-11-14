import React from "react";

export interface IMenu {
    id: number
    sort: number
    title: string
    data: {
        id: number
        sort: number
        name: string
        link: string
        icon: React.ReactNode
        hide?: boolean
    }[]
}

export const MenuDefined: IMenu[] = [
    {
        id: 0,
        sort: 0,
        title: 'Quản lý tài khoản',
        data: [
            {
                id: 0,
                sort: 0,
                icon: <i className="fal fa-user"/>,
                name: 'Thông tin cá nhân',
                link: '/customer/account'
            },
            {
                id: 1,
                sort: 3,
                icon: <i className="fal fa-key"/>,
                name: 'Thay đổi mật khẩu',
                link: '/customer/change-password'
            },
            {
                id: 4,
                sort: 6,
                icon: <i className="fal fa-map-marker-alt"/>,
                name: 'Sổ địa chỉ',
                link: '/customer/address'
            },
            {
                id: 5,
                sort: 7,
                icon: <i className="fal fa-university"/>,
                name: 'Ngân hàng của tôi',
                link: '/customer/account/bank'
            },
            {
                id: 6,
                sort: 8,
                icon: <i className="fal fa-wallet"/>,
                name: 'Ví voucher',
                link: '/customer/voucher?type=available&provider=chozoi&page=0'
            },
            {
                id: 8,
                sort: 10,
                icon: <i className="fal fa-bell"/>,
                name: 'Thông báo của tôi',
                link: '/customer/my-notice'
            },
        ]
    },
    {
        id: 1,
        sort: 0,
        title: 'Quản lý giao dịch',
        data: [
            {
                id: 0,
                sort: 0,
                icon: <i className="fal fa-file-check"/>,
                name: 'Đơn hàng của tôi',
                link: '/customer/order/manage?type=all&page=0'
            },
            {
                id: 1,
                sort: 2,
                icon: <i className="fal fa-thumbs-up"/>,
                name: 'Đánh giá của tôi',
                link: '/customer/rate?type=wait-review&page=0'
            },
        ]
    }
];
