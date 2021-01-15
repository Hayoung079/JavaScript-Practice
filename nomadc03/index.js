const NINE_HOURS_MILLISECONDS = 32400000;

const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h2");

function getTime() {
    const xmasDay = new Date("2021-12-24:00:00:00+0900");
    const now = new Date();

    const gap = xmasDay - now;
    // console.log(`${gap}ms`); 

    // 밀리초를 일/시/분/초로 나누기
    const day = Math.floor(gap / (1000 * 60 * 60 * 24));
    const hour = Math.floor((gap % (1000 * 60 *60 * 24)) / (1000 * 60 * 60));
    const min = Math.floor((gap % (1000 * 60 * 60)) / (1000 * 60));
    const sec = Math.floor((gap % (1000 * 60)) / 1000);

    // h2안에 00d 00h 00m 00s 형태로 넣기
    clockTitle.innerText = `${day < 10 ? `0${day}` : day}d ${hour < 10 ? `0${hour}` : hour}h ${min < 10 ? `0${min}` : min}m ${sec < 10 ? `0${sec}` : sec}s`;
}

function init() {
    getTime();
    setInterval(getTime, 1000); 
}

init();