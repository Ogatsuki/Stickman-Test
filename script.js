// 初期設定ここから----------------------------
const canvas = document.getElementById("myCanvas");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let ctx = canvas.getContext("2d");
let neck = [150, 200];
let shoulder = [150, 230];
let waist = [150, 330];
let armLength = 100;
let rUpperArm;
let lUpperArm;
let UpperArmLength = 50;
let rhand;
let lhand;
let lowerArmLength = 50;
let rThigh;
let lThigh;
let thighLength = 70;
let rLowerLeg = [200, 440];
let llowerLeg = [100, 440];
let lowerLegLength = 70;
let stopFlag = false;
let reverseFlag = false;



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
  
  // 右上腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rArm);
  ctx.stroke();

  // 右前腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rArm);
  ctx.stroke();
  
  // 左上腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...lArm);
  ctx.stroke();

  // 左前腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rArm);
  ctx.stroke();
  
  // 右大腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...rLowerLeg);
  ctx.stroke();
  
  // 左大腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...llowerLeg);
  ctx.stroke();

  // 右下腿

  // 左下腿
}

function resetStickman() {
  neck = [150, 200];
  shoulder = [150, 230];
  rArm = [200, 270];
  lArm = [100, 270];
  waist = [150, 330];
  rLowerLeg = [200, 440];
  llowerLeg = [100, 440];

  drawStickman();

  canvas.style.left = "0px";
}

drawStickman();

// 初期設定ここまで------------------------------------








let globalAngle = 0;
let canvasLeft;
let canvasLeftInt;
let CanvasBOxMovingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);
let rLowerLegPositionIncrement = 1;
let rArmAngleIncrement = Math.PI * 1/120;
let deltaGlobalAngle = Math.PI * 1/180;


function sumArrayAngle(array1, angle, radius) {
  let arrayA = [,];
  arrayA[0] = array1[0] + radius * Math.cos(angle);
  arrayA[1] = array1[1] + radius * Math.sin(angle);
  return arrayA;
}

// タイマー
function timeout(delay) {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  })
}

// canvasボックスの移動距離を測る
function getCanvasLeftInt() {
  canvasLeft = window.getComputedStyle(canvas).left;
  canvasLeftInt = parseInt(canvasLeft);
  return canvasLeftInt;
}

// globalAngleを少しずつ変化させる
function globalAnglePlusDelta(globalAngle, deltaGLobalAngle) {
  globalAngle += deltaGlobalAngle;
}

// globalRhythmを作る
function makeGlobalRhythmedAngleFromGlobalAngle(globalAngle) {
  let globalToneL = Math.cos(globalAngle);
  let globalRhythmedAngleL = Math.PI * 1/2 + Math.PI * 1/2 * globalToneL;
  let globalToneR = Math.cos(Math.PI - globalAngle);
  let globalRhythmedAngleR = Math.PI * 1/2 + Math.PI * 1/2 * globalToneR;
}


// 手の位置更新
function makeHandsPosition(globalRhythmedAngleR, globalRhythmedAngleL) {
  rArm = sumArrayAngle(shoulder, globalRhythmedAngleR, armLength);
  lArm = sumArrayAngle(shoulder, (Math.PI - globalRhythmedAngleL), armLength);
}

// 大腿の位置を計算
function makeKneePositionFromGlobalRhythmedAngle(globalRhythmedAngle) {
  rLowerLeg = sumArrayAngle(waist, globalRhythmedAngle, lowerLegLength);
  lLowerLeg = sumArrayAngle(waist, globalRhythmedAngle)
}

// 下腿の位置を計算
function makeFeetPositionFromGlobalRhythmedAngle(globalRhythmedAngle) {

}

async function run() {
  console.log("function started.");

  while(getCanvasLeftInt() <= parseInt(window.innerWidth)) { 
    await timeout(2);
    canvas.style.left = canvasLeftInt + 1 + "px";
    
    // 手足の位置更新
    rLowerLeg[0] = rLowerLeg[0] + rLowerLegPositionIncrement;
    llowerLeg[0] = llowerLeg[0] + -rLowerLegPositionIncrement;
    rArmAngle += rArmAngleIncrement;
    renewHandPosition(rArmAngle);
    drawStickman();

    // 手足の移動制限+方向転換
    if(rLowerLeg[0] <= 100 && rLowerLegPositionIncrement == -1) {
      rLowerLegPositionIncrement = 1;
    }
    else if(200 <= rLowerLeg[0] && rLowerLegPositionIncrement == 1) {
      rLowerLegPositionIncrement = -1;
    }
    else {
    }
    if(rArmAngle >= Math.PI * 2/3 && rArmAngleIncrement > 0) {
      rArmAngleIncrement = -rArmAngleIncrement;
    }
    else if(rArmAngle <= Math.PI * 1/3 && rArmAngleIncrement < 0) {
      rArmAngleIncrement = -rArmAngleIncrement;
    }


    if(getCanvasLeftInt() > CanvasBOxMovingRangeInt) {
      stopFlag = ture;
    }
    if(stopFlag) {
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