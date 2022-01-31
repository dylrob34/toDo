const timeInDay = 86400000;
const dow = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const getTodayUTC = () => {
    const now = new Date()
    const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())
    return today
}

const getDayString = (day) => {
    const theDay = new Date(day);
    const dayy = theDay.getDate();
    const month = theDay.getMonth() + 1;
    const year = theDay.getFullYear();
    return month + "/" + dayy + "/" + year
}

const getDateUTC = (date) => {
    const dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
    return dateUTC
}

const getWeekDaysUTC = (theWeek) => {
    let week = []
    const sunday = new Date(theWeek);
    for (let i = 0; i < dow.length; i++) {
        week.push({
            day: dow[i],
            date: new Date(sunday.getTime() + timeInDay * i)
        });
    }
    return week;
}

const getCurrentWeek = () => {
    const now = new Date();
    const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
    const sunday = new Date(today.getTime() - timeInDay * today.getUTCDay());
    return sunday.getTime();
}

const getCurrentWeekString = (theWeek) =>
{
    const day = new Date(theWeek).getUTCDate();
    const month = new Date(theWeek).getUTCMonth() + 1; // Need to add 1 because Jan = 0 in JS.
    const year = new Date(theWeek).getUTCFullYear();
    const returnDate = month + "/" + day + "/" + year;
    return returnDate
}

const getNextWeek = (theWeek) => {
    const currentSunday = new Date(theWeek);
    return new Date(currentSunday.getTime() + timeInDay * 7).getTime();
}

const getPrevWeek = (theWeek) => {
    const currentSunday = new Date(theWeek);
    return new Date(currentSunday.getTime() - timeInDay * 7).getTime();
}

export { getTodayUTC, getDayString, getDateUTC, getWeekDaysUTC, getCurrentWeekString, getCurrentWeek, getNextWeek, getPrevWeek }