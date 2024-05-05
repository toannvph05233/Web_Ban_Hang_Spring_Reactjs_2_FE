import {Chart} from 'primereact/chart';
import {format, subDays} from 'date-fns';
import React, {useState, useEffect} from 'react';
import {totalByDate} from "./service/ReportService";
import button from "bootstrap/js/src/button";
import {useNavigate} from "react-router-dom";
import {findShop} from "./service/ProfileService";
import {formatPrice} from "../../utils/helpers";

export default function ReportWeek(prop) {
    let navigate = useNavigate();
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [check, setCheck] = useState(true);
    const idAcc = localStorage.getItem('account')
    let [revenue, setRevenue] = useState(0);
    let [count, setCount] = useState(0);

    useEffect(() => {
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const currentDate = new Date();
            const labels = [];
            const total1 = [];
            const promises = [];
            for (let i = 6; i >= 0; i--) {
                const date = subDays(currentDate, i);
                const formattedDate = format(date, 'yyyy-MM-dd');
                labels.push(formattedDate);
                promises.push(totalByDate(formattedDate, idShop));
            }
            Promise.all(promises)
                .then(results => {
                    let total2 = 0;
                    let count2 = 0;
                    for (let i = 0; i < results.length; i++) {
                        let result = 0;
                        let count1 = 0;
                        for (let j = 0; j < results[i].length; j++) {
                            result += results[i][j].total;
                            count1++
                        }
                        total1.push(result)
                        total2 += result
                        count2 += count1;
                    }
                    setRevenue(total2)
                    setCount(count2)
                    const data = {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Doanh thu tuần',
                                data: total1,
                                backgroundColor: [
                                    '#a87633',
                                    '#4BC0C0',
                                    '#369EEB',
                                    '#9966FF',
                                    '#f5796e',
                                    '#C81464',
                                    '#32CD32',
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

    const countW = prop.countW

    function changeLine() {
        setCheck(!check)
    }

    function reportMonth() {
        navigate("/shop-management/report/month")
    }

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
                <div className="card" style={{height: '50%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Tỷ lệ chuyển đổi</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>{Math.ceil((count / countW) * 100)}%</p>
                </div>
                <div className="card" style={{height: '50%', width: '20%'}}>
                    <p style={{marginLeft: '10%', fontSize: '20px'}}>Lượt truy cập</p>
                    <p style={{marginLeft: '10%', fontSize: '16px'}}>590</p>
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
                        onClick={reportMonth}>Trong 1 tháng qua
                </button>
            </div>
        </>
    )
}





