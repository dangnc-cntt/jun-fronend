import {orderStore} from "./store";
import $ from 'jquery'
import axios from 'axios';
import {getCookie} from "../../../common/utils/Utils";
import {getRequest} from "../../../api";

export async function getListOrders(state: any, page: number, size: number) {
    try {
        const result = await getRequest(`v1/orders?page=${page}&size=10`);

        if (result.status === 200) {
            orderStore.listOrders = result.body.data;
            orderStore.metadata = result.body.metadata;

        }
    } catch (e) {
        console.log(e)
    }
}

export async function getOrderDetail() {
    try {
        const url: string = window.location.pathname;
        const urlArr: string[] = url.split("code/");
        const id: string = urlArr[1];
        orderStore.code = id;


    } catch (e) {
        console.error(e)
    }
}

export async function cancelOrder(code: any) {
    try {

    } catch (e) {
        console.log(e)
    }

}

export async function completeOrder(lineId: any, shopOrderId: any) {
    try {
        const data = {"action": "FINISHED"}
        // const result = await sendCompleteOrder(lineId, shopOrderId, data);
        // if (result.status < 300) {
        //     if (result.body.success) {
        //         toastUtil.success('Xác nhận nhận hàng thành công');
        //         getOrderDetail();
        //     } else toastUtil.error('Xác nhận nhận hàng thất bại');
        // }
    } catch (e) {
        console.log(e)
    }
}

export async function getOrderLineDetail(orderId: string, lineId: string, type: string) {
    try {
        // const result = await getOrderLineDetailApi(orderId, lineId, type);
        // if (result.status < 300) {
        //     orderStore.lineDetail = result.body
        // }
    } catch (e) {
        console.log(e)
    }
}

export function convertStateToText(state: string, preState: string) {
    switch (state) {
        case "ORDER_DRAFT":
            return "Đơn hàng được khởi tạo. Chozoi đã tiếp nhận và sẽ thông báo ngay cho bạn khi có tiến trình tiếp theo của đơn hàng. ";
        case "ORDER_NEW":
            return "Kiện hàng đã được người bán Xác nhận.";
        case "ORDER_CONFIRM":
            return "Kiện hàng đã được người bán đóng gói.";
        case "ORDER_CANCELED":
            return "Đơn hàng bị hủy";
        case "ORDER_WAITING":
            return "Đơn hàng đang chờ xử lý.";
        case "ORDER_CANCELED_CANCELED":
            if (preState === "CONFIRMED") return 'Người bán từ chối giao hàng. Đơn hàng bị hủy.';
            else if (preState === "SHIPPING") return 'Người bán giao hàng thất bại. Đơn hàng bị hủy.';
            else break;
        case "ORDER_CANCELED_LOST":
            return "Đơn vị vận chuyển làm mất hàng. Đơn hàng bị hủy. Liên hệ với bộ phận chăm sóc khách hàng để giải quyết nếu có khiếu nại.";
        case "ORDER_CANCELED_RETURN":
            return "Giao hàng thất bại, đơn hàng bị hủy do người mua không nhận hàng.";
        case "ORDER_CANCELED_RETURNED":
            return "Vì người mua không nhận hàng nên đơn hàng đã được hoàn trả cho người bán.";
        case "ORDER_SHIPPING":
            return "Thông tin đơn hàng đã được gửi cho đơn vị vận chuyển.";
        case "ORDER_SHIPPINFG_PICKING":
            return "Đơn vị vận chuyển đang đi lấy hàng.";
        case "ORDER_SHIPPING_SHIPPING":
            return "Đơn vị vận chuyển đang giao hàng.";
        case "ORDER_SHIPPINFG_READYTOPIC":
            return "Đơn vị vận chuyển đã tiếp nhận thông tin về đơn hàng.";
        case "ORDER_COMPLETED_SHIPPED":
            return "Đơn vị vận chuyển đã giao.";
        case "ORDER_SHIPPINFG_RECEVIED":
            return "Đơn vị vận chuyển đã lấy hàng và nhập kho chuẩn bị giao hàng.";
        case "ORDER_FINISHED":
            return "Kiện hàng đã giao thành công cho người mua. Hãy đánh giá cho sản phẩm ngay nhé.";
        case "PAYMENT_PAID":
            return "Đã gửi yêu cầu thanh toán.";
        case "PAYMENT_PAID_SUCCESS":
            return "Thanh toán thành công.";
        case "PAYMENT_PAID_CANCELED":
            return "Hủy yêu cầu thanh toán.";
        case "SHIPPING_DONE":
            return "Đơn hàng vận chuyển đã đối soát.";
        case "ORDER_CANCELED_RECEVIE_FAILED":
            return "Đơn hàng bị hủy do đơn vị vận chuyển không lấy được hàng";
        case "ORDER_CANCELED_SHIPPING_FAILED":
            return "Đơn hàng bị hủy do không giao được hàng";
        case "BUYER_ORDER_CANCELED":
            return "Đơn hàng bị hủy bởi người mua";
        case "ADMIN_ORDER_CANCELED":
            return "Đơn hàng bị hủy bởi Admin";
        case "SELLER_ORDER_CANCELED":
            return "Đơn hàng bị hủy bởi người bán";
        case "CHOZOI_ORDER_CANCELED":
            return "Đơn hàng bị hủy tự động";
        default:
            break;
    }
}

export async function addImageReturn(e: any) {
    if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0]
        const api = (window as any).REACT_APP_BASE_URL + 'v1/users/storage/uploadRefund'
        var formData = new FormData();
        formData.append("file", file);
        const token = getCookie('token')
        const config = {
            headers: {'content-type': 'multipart/form-data', 'X-chozoi-token': token}
        }
        axios.post(api, formData, config)
            .then((res: any) => {
                let data = orderStore.listImage
                data.push({'url': res.data.url})
                orderStore.listImage = data
            })
            .catch((error: any) => {

            });
    }


}

export function getUrlGoToManagerOrder(): string {
    return "/customer/order/manage?type=all&page=0";
}
