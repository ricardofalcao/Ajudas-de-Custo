import HOLIDAYS from './Holidays.js'

const utils = {
    DAY: 1000 * 60 * 60 * 24,

    maxDate(date1, date2) {
        return date1 > date2 ? date1 : date2;
    },

    getHoliday(date) {
        let key = date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
        return HOLIDAYS[key];  
    },

    isWorkday (date) {
        let day = date.getDay();
        return day != 0 && day != 6 && !this.getHoliday(date);
    },

    isWeekend(date) {
        return !this.isWorkday(date);
    },

    isSameDay(date1, date2) {
        return (date1.getDate() === date2.getDate()) &&
            (date1.getMonth() === date2.getMonth()) &&
            (date1.getFullYear() === date2.getFullYear());
    },

    calculateDays(dateStart, dateEnd) {
        return Math.floor(dateEnd.getTime() / this.DAY) - Math.floor(dateStart.getTime() / this.DAY) + 1;
    },

    calculateWorkdays(dateStart, dateEnd) {
        let result = 0;
        let currentDate = new Date(dateStart);

        for (let i = 0; i < this.calculateDays(dateStart, dateEnd); i++)  {  
            if(this.isWorkday(currentDate)) {
                result++;
            }

            currentDate.setDate(currentDate.getDate()+1); 
        }

        return result;
    }
}

export default { ...utils };