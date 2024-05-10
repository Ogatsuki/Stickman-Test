const canvas = document.getElementById("myCanvas");
const button = document.getElementById("button");

let ctx = canvas.getContext("2d");
let neck = [150, 200];
let shoulder = [150, 230];
let rhand = [220, 250];
let lhand = [70, 250];
let waist = [150, 350];
let rfoot = [230, 420];
let lfoot = [70, 420];


// 頭
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2, true);
ctx.lineWidth = "5";
ctx.strokeStyle = "#333"
ctx.stroke();

// 胴体
ctx.beginPath();
ctx.moveTo(...neck);
ctx.lineTo(...waist);
ctx.stroke();

// 右手
ctx.beginPath();
ctx.moveTo(...shoulder);
ctx.lineTo(...rhand);
ctx.stroke();

// 左手
ctx.beginPath();
ctx.moveTo(...shoulder);
ctx.lineTo(...lhand);
ctx.stroke();

// 右足
ctx.beginPath();
ctx.moveTo(...waist);
ctx.lineTo(...rfoot);
ctx.stroke();

// 左足
ctx.beginPath();
ctx.moveTo(...waist);
ctx.lineTo(...lfoot);
ctx.stroke();

let canvasLeft;
let canvasLeftInt;
let movingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);

function findCanvasLeftInt() {
  canvasLeft = window.getComputedStyle(canvas).left;
  canvasLeftInt = parseInt(canvasLeft);
  return canvasLeftInt;
}

function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

async function run() {
  console.log("function started.");

  while(findCanvasLeftInt() <= parseInt(window.innerWidth)) { 
    await timeout(2);
    canvas.style.left = canvasLeftInt + 2 + "px";
    console.log(canvasLeft);

    if(findCanvasLeftInt() > movingRangeInt) {
      break;
    }
  }

  console.log("function ended.");
}

button.addEventListener("click", run);