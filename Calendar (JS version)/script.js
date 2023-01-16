const date = new Date();
const months = ["January", "February", "March", "April", 
                "May", "June", "July", "August", 
                "September", "October", "November", "December"];
const dates = document.querySelector(".date");
const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

document.getElementById('current-month').value = months[date.getMonth()];
document.getElementById('current-year').value = date.getFullYear();
render();

/**  John H Conway's algorithm **/

/* Century codes:
       1900     2000    2100    2200
        3        2       0       5
    They repeat */

// finding the first day of the month based on the doomsday
// Sunday: 0 and Saturday: 6
/* Doomsdays:
   Jan 3/4  Feb 28/29  March 14  April 4  May 9  June 6
   July 11  Aug 8      Sept 5    Oct 10   Nov 7  Dec 12 */

function doomsday(year){
    let millennium = parseInt(year/100, 10);
    const codeCategory = (millennium - 19)%4;
    let centuryCode = 0;
    if(codeCategory === 0) centuryCode = 3;
    else if(codeCategory === 1 || codeCategory === -3) centuryCode = 2;
    else if (codeCategory === 2 || codeCategory === -2) centuryCode = 0;
    else if (codeCategory === 3 || codeCategory === -1) centuryCode = 5;

    const yearsAfterMillennium = year%100;
    let sum = centuryCode + parseInt(yearsAfterMillennium/12, 10) + 
            yearsAfterMillennium % 12 + 
            parseInt((yearsAfterMillennium % 12) / 4, 10);

    /* doomsday number of that century + times twelve goes into it +
       remainder + times four goes into the remainder */

    return sum%7; // seven days a week
}

function findFirstDay(){
    const reqMonth = document.getElementById("current-month").value;
    const y = parseInt(document.getElementById("current-year").value, 10); // year
    let d; // first day of the month
    if (reqMonth === "January" && y % 4 == 0) {
        d = doomsday(y) + 4;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "January" && y % 4 != 0) {
        d = doomsday(y) + 5;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "February" && y % 4 === 0) {
        d = doomsday(y);
    }
    else if (reqMonth === "February" && y % 4 != 0) {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "March") {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "April") {
        d = doomsday(y) + 4;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "May") {
        d = doomsday(y) - 1;
        if (d < 0)
            d = d + 7;
    }
    else if (reqMonth === "June") {
        d = doomsday(y) + 2;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "July") {
        d = doomsday(y) - 3;
        if (d < 0)
            d = d + 7;
    }
    else if (reqMonth === "August") {
        d = doomsday(y);
    }
    else if (reqMonth === "September") {
        d = doomsday(y) + 3;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "October") {
        d = doomsday(y) - 2;
        if (d < 0)
            d = d + 7;
    }
    else if (reqMonth === "November") {
        d = doomsday(y) + 1;
        if (d > 6)
            d = d - 7;
    }
    else if (reqMonth === "December") {
        d = doomsday(y) - 4;
        if (d < 0)
            d = d + 7;
    }

    return d;
}

function daysInMonth(){
    const str = document.getElementById("current-month").value;
    const y = parseInt(document.getElementById("current-year").value, 10);
    let n;
    if (str === "January" || str === "March" || str === "May" || str === "July" ||
     str === "August" || str === "October" || str === "December")
        n = 31;
    else if (str === "February" && y % 4 === 0)
        n = 29;
    else if (str === "February" && y % 4 != 0)
        n = 28;
    else n = 30;
    return n;
}

function render(){
    let days = "";
    const firstDayIndex = findFirstDay();
    for (let i = findFirstDay(); i > 0; i--) {
        days += `<div class="empty">${""}</div>`;
        dates.innerHTML = days;
    }
    for (let i = 1; i <= daysInMonth(); i++) {
        if (i === date.getDate() &&
            document.getElementById('current-month').value === months[date.getMonth()] &&
            parseInt(document.getElementById("current-year").value, 10) === date.getFullYear()) {
            days += `<div class="today">${i}</div>`;
        }
        else days += `<div>${i}</div>`;
        dates.innerHTML = days;
    }
}

function prev(){
    const currentMonth = document.getElementById('current-month').value;
    const currentYear = parseInt(document.getElementById('current-year').value, 10);
    let monthIndex;
    if(currentMonth === "January"){
        monthIndex = 11;
        document.getElementById('current-year').value = currentYear - 1;
    }
    else if(currentMonth === "February"){
        monthIndex = 0;
    }
    else if (currentMonth === "March") {
        monthIndex = 1;
    }
    else if (currentMonth === "April") {
        monthIndex = 2;
    }
    else if (currentMonth === "May") {
        monthIndex = 3;
    }
    else if (currentMonth === "June") {
        monthIndex = 4;
    }
    else if (currentMonth === "July") {
        monthIndex = 5;
    }
    else if (currentMonth === "August") {
        monthIndex = 6;
    }
    else if (currentMonth === "September") {
        monthIndex = 7;
    }
    else if (currentMonth === "October") {
        monthIndex = 8;
    }
    else if (currentMonth === "November") {
        monthIndex = 9;
    }
    else if (currentMonth === "December") {
        monthIndex = 10;
    }
    document.getElementById('current-month').value = months[monthIndex];
    render();    
}

function next() {
    const currentMonth = document.getElementById('current-month').value;
    const currentYear = parseInt(document.getElementById('current-year').value, 10);
    let monthIndex;
    if (currentMonth === "January") {
        monthIndex = 1;
    }
    else if (currentMonth === "February") {
        monthIndex = 2;
    }
    else if (currentMonth === "March") {
        monthIndex = 3;
    }
    else if (currentMonth === "April") {
        monthIndex = 4;
    }
    else if (currentMonth === "May") {
        monthIndex = 5;
    }
    else if (currentMonth === "June") {
        monthIndex = 6;
    }
    else if (currentMonth === "July") {
        monthIndex = 7;
    }
    else if (currentMonth === "August") {
        monthIndex = 8;
    }
    else if (currentMonth === "September") {
        monthIndex = 9;
    }
    else if (currentMonth === "October") {
        monthIndex = 10;
    }
    else if (currentMonth === "November") {
        monthIndex = 11;
    }
    else if (currentMonth === "December") {
        monthIndex = 0;
        document.getElementById('current-year').value = currentYear + 1;
    }
    document.getElementById('current-month').value = months[monthIndex];
    render();
}

function changeMonth(){
    let month = document.getElementsByName('month-names');
    for (i = 0; i < month.length; i++) {
        if (month[i].checked)
            document.getElementById("current-month").value
                = month[i].value;
    }
    render();
}

function changeYear(){
    let year = document.getElementById('year-input').value;
    if(year < 0){
        alert('Please enter a year after 0 AD');
        return;
    }
    document.getElementById('current-year').value = year;
    render();
}
