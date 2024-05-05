import React, {useEffect, useState} from "react";
import {format, subDays} from "date-fns";
import {totalBill, totalByWeek} from "./service/ReportService";
import {Chart} from "primereact/chart";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useNavigate} from "react-router-dom";
import {findShop} from "./service/ProfileService";
import {formatPrice} from "../../utils/helpers";
import button from "bootstrap/js/src/button";
export default function ReportMonth(prop){
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [check, setCheck] = useState(true);
    let navigate = useNavigate();
    const idAcc = localStorage.getItem('account')
    let [revenue,setRevenue] = useState(0);
    let [count,setCount] = useState(0);
    useEffect(() => {
        window.scroll(0,150)
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const totalRevenueS = [];
            const currentDate = new Date();
            const promisesWeek = [];
            for (let i = 0; i < 4; i++) {
                const startDate = subDays(currentDate, i * 7 + 7);
                const endDate = subDays(currentDate, i * 7);
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                const weekPromise = totalByWeek(formattedStartDate, formattedEndDate, idShop);
                promisesWeek.push(weekPromise);
            }
            promisesWeek.reverse();
            Promise.all(promisesWeek)
                .then((week) => {
                    let total2 =  0 ;
                    let count2 = 0;
                    for (let i = 0; i < week.length; i++) {
                        Promise.all(week[i]).then((day) => {
                            let result = 0
                            let count1 = 0;
                            for (let j = 0; j < day.length; j++) {
                                result += day[j]?.total
                                count1++
                                console.log(result)
                            }
                            totalRevenueS.push(result)
                            total2+= result
                            count2 += count1;
                            setRevenue(total2)
                            setCount(count2)
                        })
                    }



                    const data = {
                        labels: ['Tuần 1', 'Tuần2', 'Tuần 3', 'Tuần 4'],
                        datasets: [
                            {
                                label: "Doanh thu tháng",
                                data: totalRevenueS,
                                backgroundColor: [
                                    '#a87633',
                                    '#4BC0C0',
                                    '#369EEB',
                                    '#9966FF'
                                ]
                            }
                        ]
                    };
                    const options = {
                        scales: {
                            y: {
                                beginAtZero: true
                            }

                        }
                    };

                    setChartData(data);
                    setChartOptions(options);
                })
        })
    }, []);
    function changeLine() {
        setCheck(!check)
    }
    function reportWeek() {
        navigate("/shop-management/report")

    }
    const countM = prop.countM

    return (
        <>
            <br/>
            <br/>
            <div style={{display: 'flex', width: '80%', marginLeft: '10%', justifyContent: 'space-between'}}>
                <div className="card" style={{height: '50%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Doanh số</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>{formatPrice(revenue)}</p>
                </div>
                <div className="card" style={{height: '50%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Đơn hàng</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>{count}</p>
                </div>
                <div className="card" style={{height: '40%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Tỷ lệ chuyển đổi</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>{Math.ceil((count/countM)*100)}%</p>
                </div>
                <div className="card" style={{height: '40%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Lượt truy cập</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>2239</p>
                </div>
            </div>
            <br/>
            <br/>
            <div className="card" style={{height: '70%', width: '80%', marginLeft: '10%'}}>
                <Chart type={check ? 'bar' : 'line'}
                       data={chartData} options={chartOptions}/>
            </div>
            <div style={{
                marginLeft: '38%',
                marginTop: '2%',
                fontSize: '16px',
                width: '25%',
                display: 'flex',
                justifyContent: 'space-between'
            }}>
                <button style={{padding: '10px', border: '1px solid #d70018', width: '40%'}}
                        type="button" className="comic-button"
                        onClick={changeLine}>Chuyển đổi
                </button>
                <button style={{padding: '10px', border: '1px solid #d70018', width: '50%'}}
                        type="button" className="comic-button"
                        onClick={reportWeek}>Trong 1 tuần qua
                </button>
            </div>
        </>
    )

}