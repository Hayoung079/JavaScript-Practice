const body = document.querySelector("body");

// h1태그 생성
const newH1 = document.createElement("h1");

newH1.innerHTML = "Hello!";
newH1.style.color = "white";

// boby에 만든 h1태그 삽입
body.appendChild(newH1);

// 스크린 크기에 따라 배경색 바꾸기
function handleResize() {
    const screenSize = window.innerWidth;
    console.log(screenSize);

    if (screenSize < 600) {
        body.style.backgroundColor = "#2E8CD5";
    } else if (screenSize >= 600 && screenSize < 1200) {
        body.style.backgroundColor = "#914EAD";
    } else {
        body.style.backgroundColor = "#EEBC12";
    }
}

handleResize();

window.addEventListener("resize", handleResize);