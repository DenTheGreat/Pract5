let canvas = document.getElementById('draw');
let color = document.getElementById('color');
let size = document.getElementsByClassName('sizeRadius');
context = canvas.getContext("2d");

let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let clickColor = new Array();
let clickSize = new Array();
let paint;
let mouseX;
let mouseY;
let sizeRadius = 1;
let colorForPaint = "df4b26";
//specific only for this layout
let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
let offsetTop = canvas.parentElement.parentElement.offsetTop;
canvas.addEventListener('mousedown', function (e) {
  mouseX = e.pageX - this.offsetLeft - offsetLeft;
  mouseY = e.pageY - this.offsetTop - offsetTop;
  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});
canvas.addEventListener('mousemove', function (e) {
  if (paint) {
    addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY -
      this.offsetTop - offsetTop, true);
    redraw();
  }
});
canvas.addEventListener('mouseup', function (e) {
  paint = false;
});
canvas.addEventListener('mouseleave', function (e) {
  paint = false;
});

function addClick(x, y, dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
  clickColor.push(colorForPaint);
  clickSize.push(sizeRadius);
}

color.addEventListener('input', function () {
  colorForPaint = this.value;
  redraw(colorForPaint, sizeRadius);
});

for (let i = 0; i < size.length; i++) {
  size[i].addEventListener('click', function () {
    sizeRadius = this.value;
    redraw(colorForPaint, sizeRadius);
  });
}

document.getElementById('btn-clear').onclick = function () {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  clickX = [];
  clickY = [];
  clickDrag = [];
  console.log("clear");
};

function redraw() {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
  context.strokeStyle = "#df4b26";
  context.lineJoin = "round";
  context.lineWidth = 5;
  for (var i = 0; i < clickX.length; i++) {
    context.beginPath();
    if (clickDrag[i] && i) {
      context.moveTo(clickX[i - 1], clickY[i - 1]);
    } else {
      context.moveTo(clickX[i] - 1, clickY[i]);
    }
    context.lineTo(clickX[i], clickY[i]);
    context.closePath();
    context.strokeStyle = clickColor[i];
    context.lineWidth = clickSize[i];
    context.stroke();
  }
}
