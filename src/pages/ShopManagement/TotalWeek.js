import ReportWeek from "./ReportWeek";
import {useEffect, useState} from "react";
import {findShop} from "./service/ProfileService";
import {format, subDays} from "date-fns";
import {totalBill, totalByWeek} from "./service/ReportService";

export default function TotalWeek() {
    let [count,setCount] = useState(0)
    const idAcc = localStorage.getItem('account')

    useEffect(()=> {
        window.scroll(0,150)
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const currentDate = new Date();
            const promises = [];
                const startDate = subDays(currentDate,  7);
                const endDate = subDays(currentDate, 0);
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                const weekPromise
                    = totalBill(formattedStartDate, formattedEndDate, idShop);
                promises.push(weekPromise);
            promises.reverse();
            Promise.all(promises)
                .then(results => {
                    let count2 = 0;
                    for (let i = 0; i < results.length; i++) {
                        let count1 = 0;
                        for (let j = 0; j < results[i].length; j++) {
                            count1++
                        }
                        count2 +=count1;
                    }
                    setCount(count2)
                })
        })
    },[])
    return (
        <>
            <ReportWeek countW={count}></ReportWeek>
        </>
    )
}