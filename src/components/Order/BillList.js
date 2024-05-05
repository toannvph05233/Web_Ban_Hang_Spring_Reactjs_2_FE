import React from "react";
import {STATUS} from "../../utils/status";
import Loader from "../Loader/Loader";
import BillDetails from "./BillDetails";

const BillList = (props) => {
    const uniqueArray =  [];
    for (let i = 0; i < props.items.length; i++) {
        let isUnique = true;

        for (let j = 0; j < uniqueArray.length; j++) {
            if (props.items[i]?.bill?.id === uniqueArray[j]) {
                isUnique = false;
                break;
            }
        }
        if (isUnique ) {
            uniqueArray[i] = props.items[i]?.bill?.id;
        }
    }
    const listBillByUser = new Array(uniqueArray.length).fill(0);
    if(props.items.length > 0){
        for (let i = 0; i < uniqueArray.length ; i++) {
            let product = [];
            for (let j = 0; j < props.items.length; j++) {
                if(props.items[j]?.bill?.id === uniqueArray[i] ){
                    product.push(props.items[j])
                }
            }
            listBillByUser[i]= product;
        }
    }

    return (
        <>
            <div style={{marginTop : '10px'}}>
                {listBillByUser.map((item , index) => (
                    (item.length >0) ?

                            <div className=''>

                                <div style={{backgroundColor: 'rgb(232, 232, 232)' , height : '50px' }}>
                                    <div style={{padding: '10px'}} >Mã đơn hàng 2903VDC02{item[0]?.bill?.id}</div>
                                </div>
                                {item === STATUS.LOADING ? <Loader /> : <BillDetails bill={item}/>}
                            </div>
                        :
                        <div></div>
                ))}
            </div>
            </>
    )
}


export default BillList ;