import React from "react";

export default function Comment() {
    const save = (e) => {

    }

    return (
        <>
            <div className={'login-container col-12 col-sm-4 '} style={{fontSize:'14px'}}>
                <div className={'title'}>Đánh giá sản phẩm</div>
                <div className={'input'}>
                    {/*<input type={} placeholder={'Nhập đánh giá của bạn'}/>*/}
                    <textarea name="" id="" cols="30" rows="10" placeholder={'Nhập đánh giá của bạn'} ></textarea>
                </div>
                <div style={{marginLeft:'15%'}}>
                    <button
                            onClick={save}
                    >Gửi
                    </button>
                </div>
            </div>
        </>
    )
}