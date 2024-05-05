import {useEffect, useState} from "react";
import {findShop} from "./service/ProfileService";
import {format, subDays} from "date-fns";
import {totalBill, totalByWeek} from "./service/ReportService";
import ReportMonth from "./ReportMonth";

export default function TotalMonth() {
    const idAcc = localStorage.getItem('account')
    let [countM, setCountM] = useState(0);
    useEffect(() => {
        findShop(idAcc).then((shop) => {
            const idShop = shop.id;
            const currentDate = new Date();
            const promisesMonth = [];
            for (let i = 0; i < 4; i++) {
                const startDate = subDays(currentDate, i * 7 + 7);
                const endDate = subDays(currentDate, i * 7);
                const formattedStartDate = format(startDate, 'yyyy-MM-dd');
                const formattedEndDate = format(endDate, 'yyyy-MM-dd');
                const monthPromise = totalBill(formattedStartDate, formattedEndDate, idShop);
                promisesMonth.push(monthPromise);
            }
            promisesMonth.reverse();
            Promise.all(promisesMonth)
                .then((week) => {
                    let count2 = 0;
                    for (let i = 0; i < week.length; i++) {
                        Promise.all(week[i]).then((day) => {
                            let count1 = 0;
                            for (let j = 0; j < day.length; j++) {
                                count1++
                            }
                            count2 += count1;
                            setCountM(count2)
                        })
                    }
                })
        })
    },[])
    console.log("m",countM)
    return (
        <>
            <ReportMonth countM={countM}></ReportMonth>
        </>
    )
}