import React from 'react';
import $ from "jquery";
import {ACCOUNT_CTRL} from "../AccountControl";
import {toastUtil} from "../../../../common/utils/ToastUtil";
import {Feedback, Form, FormGroup, Input, Validations} from "../../../../common/form";
import {sendUpdateEmail} from "../../../../api/account";

const dataRequestUpdateEmail: { email: string } = {email: ''};

export const UpdateEmail: React.FC<any> = () => {

    const onSubmit = async () => {
        try {
            const response = await sendUpdateEmail(dataRequestUpdateEmail.email);
            if (response.status === 200) {
                toastUtil.success('Email mới đã được áp dụng');
                ACCOUNT_CTRL.getView && ACCOUNT_CTRL.getView.setState({email: dataRequestUpdateEmail.email});
                $('#add_email').modal('hide');
            }
        } catch (e) {
            console.error(e);
        }
    };

    const onChange = (value: string) => {
        let email: string = value;
        console.log(value);
        let filter: RegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        if (!filter.test(email)) {
            dataRequestUpdateEmail.email = 'Sai định dạng email';
        } else {
            dataRequestUpdateEmail.email = value;
        }
    };

    return (
        <div>
            <div className="modal fade" id="add_email" role="dialog" aria-labelledby="exampleModalCenterTitle"
                 aria-hidden="true">
                {/*<div className="modal-backdrop fade bt-close"/>*/}
                <Form
                    onSubmit={() => onSubmit()}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Thêm email</h5>
                                <button type="button" className="close bt-close" data-dismiss="modal"
                                        aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <FormGroup className="add-email">
                                    <label>Email</label>
                                    <Input type="email" onChange={(e: any) => onChange(e.currentTarget.value)}
                                           validations={[new Validations(Validations.minLength(1), 'Vui lòng nhập email của bạn'),
                                               new Validations(Validations.regexp(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/), "Nhập sai định dạng email")]}
                                           placeholder="Vui lòng nhập email của bạn"/>
                                    <Feedback invalid={"true"}/>
                                    <span className="text-danger">{dataRequestUpdateEmail.email}</span>
                                </FormGroup>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary bt-close" data-dismiss="modal"
                                        aria-label="Close">Hủy bỏ
                                </button>
                                <button type="submit" className="btn btn-primary confirm_email">Hoàn tất</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>

        </div>
    );
};
