const colors = ["#1abc9c", "#3498db", "#9b59b6", "#f39c12", "#e74c3c"];

const target = document.querySelector("h2");

const superEventHandler = {
  over: function handleMouseOver() {
    target.innerHTML = "The mouse is here!";
    target.style.color = colors[0];
  },
  out: function handleMouseOut() {
    target.innerHTML = "The mouse is gone!";
    target.style.color = colors[1];
  },
  resize: function handleResize() {
    target.innerHTML = "You just resized!";
    target.style.color = colors[2];
  },
  rightClick: function handleRightClick() {
    target.innerHTML = "That was right click!";
    target.style.color = colors[3];
  }
};

target.addEventListener("mouseover", superEventHandler.over);
target.addEventListener("mouseout", superEventHandler.out);
window.addEventListener("resize", superEventHandler.resize);
window.addEventListener("contextmenu", superEventHandler.rightClick);

