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
                id: 2,
                sort: 4,
                icon: <i className="fal fa-heart"/>,
                name: 'Sản phẩm yêu thích',
                link: '/customer/favorite?page=0'
            },
            {
                id: 3,
                sort: 5,
                icon: <i className="fal fa-store"/>,
                name: 'Gian hàng theo dõi',
                link: '/customer/follow-shop?page=0&size=5',
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
                id: 7,
                sort: 9,
                icon: <i className="fal fa-envelope-open"/>,
                name: 'Tin nhắn của tôi',
                link: '#',
                hide: true
            },
            {
                id: 8,
                sort: 10,
                icon: <i className="fal fa-bell"/>,
                name: 'Thông báo của tôi',
                link: '/customer/my-notice'
            },
            {
                id: 9,
                sort: 1,
                icon: <i className="fal fa-crown"/>,
                name: 'VIP Member',
                link: '/customer/member'
            },
            {
                id: 10,
                sort: 2,
                icon: <i className="fal fa-key"/>,
                name: 'Chozoi xu',
                link: '/customer/xu',
                hide: true
            }
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
                sort: 1,
                icon: <i className="fal fa-retweet"/>,
                name: 'Đơn hàng đổi trả',
                link: '/customer/return/manage?type=request&page=0'
            },
            {
                id: 2,
                sort: 2,
                icon: <i className="fal fa-thumbs-up"/>,
                name: 'Đánh giá của tôi',
                link: '/customer/rate?type=wait-review&page=0'
            },
            {
                id: 3,
                sort: 3,
                icon: <i className="fal fa-thumbs-up"/>,
                name: 'Đánh giá từ shop',
                link: '/customer/my-shop-rate?page=0&size=3'
            }
        ]
    },
    {
        id: 2,
        sort: 2,
        title: 'Quản lý đấu giá',
        data: [
            {
                id: 0,
                sort: 0,
                icon: <i className="fal fa-gavel"/>,
                name: 'Đấu giá của tôi',
                link: '/customer/auctions?type=WINNER&page=0'
            },
            {
                id: 1,
                sort: 1,
                icon: <i className="fal fa-trophy"/>,
                name: 'Thắng cuộc',
                link: '#',
                hide: true
            },
            {
                id: 2,
                sort: 2,
                icon: <i className="fal fa-history"/>,
                name: 'Đang đấu giá',
                link: '#',
                hide: true
            }
        ]
    },
    /*{
        title: 'Trung tâm trợ giúp',
        data: [
            {
                icon: <i className="fal fa-question-circle"/>,
                name: 'Hỏi đáp',
                link: '#',
                hide: true
            }
        ]
    }*/
];
