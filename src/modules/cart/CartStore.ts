import { observable} from "mobx";
import {toastUtil} from "../../common/utils/ToastUtil";
import {cartService} from "./CartService";
import {productDetailStore} from "../productDetail/ProductDetailStore";
import {LoginStore} from "../authen/LoginSignUp/Store/LoginStore";
import {signUpStore} from "../authen/LoginSignUp/Store/SignUpStore";

class CartStore{
    @observable listCart: any[] = [];

    async getCart(){
        const result = await  cartService.getCart();
        if(result.status === 200){
            this.listCart = result.body
        }
    }

    async addToCart( id: number, optionId: any, quantity: any, amount: any){
        if(!optionId){
            toastUtil.warning("Vui lòng chọn phân loại sản phẩm", 2)
            return false
        }
        if(amount < 1){
            toastUtil.warning("Sản phẩm không đủ số lượng", 3)
            return false
        }
        if(!localStorage.getItem('token')){
            LoginStore.isShowLoginForm = true;
            signUpStore.isSignUpForm = false
            return false
        }
        const result = await cartService.addToCart(id, optionId, quantity);
        if(result.status === 200){
            toastUtil.success('Thêm sản phẩm thành công');
            cartStore.getCart()
        }
    }

    async buyNow( id: number, optionId: any, quantity: any, amount: any){
        if(!optionId){
            toastUtil.warning("Vui lòng chọn phân loại sản phẩm", 2)
            return false
        }
        if(amount < 1){
            toastUtil.warning("Sản phẩm không đủ số lượng", 3)
            return false
        }
        if(!localStorage.getItem('token')){
            LoginStore.isShowLoginForm = true;
            signUpStore.isSignUpForm = false
            return false
        }
        const result = await cartService.addToCart(id, optionId, quantity);
        if(result.status === 200){
            toastUtil.success('Thêm sản phẩm thành công');
            cartStore.getCart()
            window.location.href = `/cart?id=${id}`;
        }
    }

    async updateCart(){
        let data: any[] = [];
        this.listCart && this.listCart.length > 0 && this.listCart.map((item) => {
            data.push({
                id: item.id,
                amount: item.option.amount,
                optionId: item.option.id
            })
        })
        const result = await cartService.deleteCart(data);
        if(result.status === 200){
            toastUtil.success('Xóa giỏ hàng thành công')
        }
    }

}

export const cartStore = new CartStore();