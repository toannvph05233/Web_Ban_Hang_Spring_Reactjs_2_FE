import moment from "moment/moment";

export function FormatTime (time) {
    const inputTime = moment(time);
    const currentTime = moment();
    const timeDifference = moment.duration(currentTime.diff(inputTime));
    if (timeDifference.asMinutes() < 1) {
        const seconds = Math.floor(timeDifference.asSeconds());
        return `${seconds} giây trước`
    } else if (timeDifference.asHours() < 1) {
        const minutes = Math.floor(timeDifference.asMinutes());
        return `${minutes} phút trước`
    } else if (timeDifference.asDays() < 1) {
        const hours = Math.floor(timeDifference.asHours());
        return `${hours} giờ trước`
    } else if (timeDifference.asMonths() < 1) {
        const days = Math.floor(timeDifference.asDays());
        return `${days} ngày trước`
    } else {
        const formattedDate = inputTime.format('DD/MM/YYYY'); // Định dạng chỉ ngày
        return formattedDate
    }
}