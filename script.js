// 初期設定ここから----------------------------
const canvas = document.getElementById("myCanvas");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let rhandAngle = Math.PI * 1/6;
let lhandAngle = Math.PI * 5/6;

let ctx = canvas.getContext("2d");
let neck = [150, 200];
let shoulder = [150, 230];
let rhand = [shoulder[0] + 70 * Math.cos(rhandAngle), shoulder[1] + 70 * Math.sin(rhandAngle)];
let lhand = [shoulder[0] + 70 * Math.cos(lhandAngle), shoulder[1] + 70 * Math.sin(lhandAngle)];
let waist = [150, 330];
let rfoot = [200, 440];
let lfoot = [100, 440];


function renewHandAngle(ra, la) {
  rhand[0] = shoulder[0] + 70 * Math.cos(ra);
  rhand[1] = shoulder[1] + 70 * Math.sin(ra);
  lhand[0] = shoulder[0] + 70 * Math.cos(la);
  lhand[1] = shoulder[1] + 70 * Math.sin(la);
}

function drawStickman() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

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
}

function resetStickman() {
  neck = [150, 200];
  shoulder = [150, 230];
  rhand = [200, 270];
  lhand = [100, 270];
  waist = [150, 330];
  rfoot = [200, 440];
  lfoot = [100, 440];

  drawStickman();

  canvas.style.left = "0px";
}

drawStickman();

// 初期設定ここまで------------------------------------








let canvasLeft;
let canvasLeftInt;
let movingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);
let rfootPositionIncrement = 1;
let rhandAngleIncrement = Math.PI * 1/120;


// canvasボックスの移動距離を測る
function getCanvasLeftInt() {
  canvasLeft = window.getComputedStyle(canvas).left;
  canvasLeftInt = parseInt(canvasLeft);
  return canvasLeftInt;
}

// タイマー
function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

async function run() {
  console.log("function started.");

  while(getCanvasLeftInt() <= parseInt(window.innerWidth)) { 
    await timeout(2);
    canvas.style.left = canvasLeftInt + 1 + "px";
    
    // 手足の位置更新
    rfoot[0] = rfoot[0] + rfootPositionIncrement;
    lfoot[0] = lfoot[0] + -rfootPositionIncrement;
    rhandAngle += rhandAngleIncrement;
    lhandAngle -= rhandAngleIncrement;
    renewHandAngle(rhandAngle, lhandAngle);
    drawStickman();

    // 手足の移動制限+方向転換
    if(rfoot[0] <= 100 && rfootPositionIncrement == -1) {
      rfootPositionIncrement = 1;
    }
    else if(200 <= rfoot[0] && rfootPositionIncrement == 1) {
      rfootPositionIncrement = -1;
    }
    else {
    }

    if(rhandAngle >= Math.PI * 5/6 && rhandAngleIncrement == Math.PI * 1/120) {
      rhandAngleIncrement = -Math.PI * 1/120;
    }
    else if(rhandAngle <= Math.PI * 1/6 && rhandAngleIncrement == -Math.PI * 1/120) {
      rhandAngleIncrement = Math.PI * 1/120;
    }


    if(getCanvasLeftInt() > movingRangeInt) {
      console.log("moving ended");
      break;
    }
  }

  console.log("function ended.");
}

start.addEventListener("click", async () => {
  if(window.getComputedStyle(canvas).left == "0px") {
    run();
  }
  else {
    canvas.style.left = "0px";
    await timeout(250);
    run();
  }
});

reset.addEventListener("click", () => {
  resetStickman();
})