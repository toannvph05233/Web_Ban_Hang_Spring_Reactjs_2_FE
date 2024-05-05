import React, {useContext, useEffect, useState} from "react";
import {listBillDetailByShop} from "../../service/OrderService";
import {STATUS} from "../../utils/status";
import Loader from "../Loader/Loader";
import BillList from "./BillList";
import {userCheck} from "../../service/UserService";
import {AppContext} from "../../Context/AppContext";


export default function Order(prop) {
    const idAcc = localStorage.getItem("account")
    const [user, setUser] = useState([]);
    const [billDetail, setBillDetail] = useState([]);
    const {isFlag} = useContext(AppContext);
    useEffect(() => {
        userCheck(idAcc).then(res => {
            setUser(res.data)
        })

        listBillDetailByShop(idAcc).then(res => {
            setBillDetail(res.data);

        })
    }, [isFlag]);
    const listBillByUser = new Array(user.length).fill(0);
    if (prop.name === 'Tất cả') {
        if (billDetail.length > 0) {
            for (let i = 0; i < user.length; i++) {
                let product = [];
                for (let j = 0; j < billDetail.length; j++) {
                    if (billDetail[j]?.bill?.account?.username === user[i]) {
                        product.push(billDetail[j])
                    }
                }
                listBillByUser[i] = product;
            }
        }
    } else {
        if (billDetail.length > 0) {
            for (let i = 0; i < user.length; i++) {
                let product = [];
                for (let j = 0; j < billDetail.length; j++) {
                    if (billDetail[j]?.bill?.account?.username === user[i] && billDetail[j]?.bill?.status === prop.name) {
                        product.push(billDetail[j])
                    }
                }
                listBillByUser[i] = product;
            }
        }
    }


    const checkEmpty = (list) => {
        for (let i = 0; i < list.length; i++) {
            if (list[i].length > 0) {
                return true;
            }
        }
    }

    return (
        <div>
            {checkEmpty(listBillByUser) ?
                <div style={{backgroundColor: '#f6f6f6', fontSize: '15px', marginLeft: '2%', marginRight: '2%'}}>
                    <div style={{
                        display: 'flex',
                        backgroundColor: 'rgb(232, 232, 232)',
                        marginBottom: '15px',
                        fontSize: '17px',
                        height: '55px'
                    }}>
                        <div style={{marginLeft: '25px', marginTop: '12px'}}>Sản phẩm</div>
                        <div style={{marginLeft: '390px', marginTop: '12px'}}>
                            <p>Tổng đơn hàng</p>
                        </div>
                        <div style={{marginLeft: '68px', marginTop: '12px'}}>
                            <p>Trạng thái</p>
                        </div>
                        <div style={{marginLeft: '100px', marginTop: '12px'}}>
                            <p>Thao tác</p>
                        </div>
                    </div>
                    <div>
                        {listBillByUser.map((item) => (
                            (item.length > 0) ?
                                <div className='' style={{marginLeft: '20px'}}>
                                    <div>
                                        <div style={{fontWeight: 'bold'}}>Khách hàng
                                            : {item[0]?.bill?.account?.username} - {item[0]?.bill?.phone}</div>
                                        <div>Địa chỉ :{item[0]?.bill?.address}
                                            ,{item[0]?.bill?.wards?.name}
                                            ,{item[0]?.bill?.wards?.district?.name}
                                            ,{item[0]?.bill?.wards?.district?.city?.name} </div>
                                    </div>

                                    {
                                        item === STATUS.LOADING ? <Loader/> : <BillList items={item}/>
                                    }
                                </div>
                                :
                                <div></div>
                        ))}
                    </div>

                </div>
                :
                <div>
                    <div style={{marginLeft: '42.5%', marginTop: '130px'}}><img
                        style={{width: "160px", height: "77.6667px"}}
                        src="data:image/png;base64,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"
                        alt=""/></div>
                    <div style={{
                        fontSize: '18px',
                        color: 'rgba(0,0,0,.8)',
                        textAlign: 'center',
                        paddingTop: '10px'
                    }}>Chưa có đơn hàng
                    </div>
                </div>}
        </div>
    )
}