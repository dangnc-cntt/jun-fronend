import React, {Component} from 'react';
import {observer} from "mobx-react";
import {signUpStore} from "../Store/SignUpStore";
import {Feedback, FormGroup, Input, Validations} from "../../../../common/form";
import {updateRefCode} from "../Reducers/SignUpReducer";
import '../style.scss';

@observer
class PopupRefCode extends Component {

    render() {
        if(signUpStore.isShowRefCode){
            return (
                <div className="ref_code">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header text-left">
                                <h5 className="modal-title">Hãy nhập mã giới thiệu tại đây</h5>
                            </div>
                            <div className="modal-body">
                                {signUpStore.errorRefCode && <span className="error">{signUpStore.errorRefCode}</span>}
                                <FormGroup className="confirm w-100">
                                    {signUpStore.refCode ? <input type="text" className="w-100" value={signUpStore.refCode} disabled={true}/> :
                                    <Input type="text" className="w-100" placeholder="Mã giới thiệu" onChange={(e: any) => signUpStore.codeRef = e.currentTarget.value}
                                           validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập mã giới thiệu')]}/>}
                                    <Feedback invalid={"true"}/>
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button className="btn bt-close" onClick={() => signUpStore.isShowRefCode = false}>BỎ QUA</button>

                                {!signUpStore.isLoading ?
                                    <button className="btn" onClick={() => updateRefCode()}>GỬI MÃ</button> :
                                    <button className="btn bt-save"><i className="fa fa-spinner fa-spin"/></button>}
                            </div>
                        </div>
                    </div>

                    <div className="hide-form-wrap" style={{zIndex: 1030}} onClick={() => signUpStore.isShowRefCode = false}/>
                </div>
            );
        }else return true

    }
}

export default PopupRefCode;