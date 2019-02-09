
import moment from 'moment';

const cap = (str) => {
    if (null !== str &&
         undefined !== str 
         && (str instanceof Object)) {
        let newStr = '';
        for (let s in str) {
            const objS = str[s];
            if (undefined !== objS && null !== objS) {
                newStr += `${objS.substr(0,1).toUpperCase()}${objS.substr(1)} `
            } else {
                newStr += ` `;
            }
        }
        return newStr.trim();
    }

    return `${str.substr(0,1).toUpperCase()}${str.substr(1)}`;
}

const formatDate = (date, format) => moment(date).format(format);

const displayDate = (arg) => formatDate(arg, 'MMMM Do YYYY');

export default {
    cap,
    formatDate,
    displayDate
};
