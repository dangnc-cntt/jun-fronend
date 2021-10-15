import { observable, computed } from "mobx";

class ForgetPass{
    @observable public isShow:boolean=false
    @observable public step:number=1;
    @observable public userName!:string
    @observable public passWord!:string;
    @observable public passConfirm!:string;
    @observable public otp!:string
    @computed get getStep(){
        return this.step
    }
    @computed get getUserName(){
        return this.userName
    }
    @computed get getPass(){
        return this.passWord
    }
    @computed get getPassConfirm(){
        return this.passConfirm
    }
    @computed get getIsShow(){
        return this.isShow
    }
    @computed get getOtp(){
        return this.otp
    }
    @observable public buttonLoading:boolean=false
    @computed get getButtonLoading(){
        return this.buttonLoading
    }
    @observable public capcha!:string
    @computed get getCapcha(){
        return this.capcha
    }
    // @observable public timeSpam:number=(window as any).DELAY_SEND_OTP_TIME
    // @computed get getTimeSpam(){
    //     return this.timeSpam
    // }
    @observable public isSpam:boolean=false;
    @computed get getIsSpam(){
        return this.isSpam
    }
    @observable public forgetPassError?:{
      phoneError?:string,
      capcha?:string,
      message?:string,
      pass?:string
      passComfirm?:string
    }
    @computed get getFormError(){
        return this.forgetPassError
    }
   
}

export const forgetPassStore=new ForgetPass()