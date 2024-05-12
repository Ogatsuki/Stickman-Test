// 初期設定ここから----------------------------
const canvas = document.getElementById("myCanvas");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
let ctx = canvas.getContext("2d");
let neck = [150, 200];
let shoulder = [150, 230];
let waist = [150, 330];
let armLength = 100;
let rUpperArm = [,];
let lUpperArm = [,];
let UpperArmLength = 50;
let rhand = [,];
let lhand = [,];
let lowerArmLength = 50;
let rThigh = [,];
let lThigh = [,];
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
  ctx.lineTo(...rUpperArm);
  ctx.stroke();

  // 右前腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rHand);
  ctx.stroke();
  
  // 左上腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...lUpperArm);
  ctx.stroke();

  // 左前腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rHand);
  ctx.stroke();
  
  // 右腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...rThigh);
  ctx.stroke();

  // 左腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...lThigh);
  ctx.stroke();

  // 右下腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...rLowerLeg);
  ctx.stroke();
  
  // 左下腿
  ctx.beginPath();
  ctx.moveTo(...waist);
  ctx.lineTo(...llowerLeg);
  ctx.stroke();

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
let deltaGlobalAngle = Math.PI * 1/180;
let canvasLeft;
let canvasLeftInt;
let CanvasBoxMovingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);


function getArraySummingArrayAngle(array1, angle, radius) {
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

// globalToneR,Lを作る
function getGlobalToneArray(globalAngle) {
  let globalToneL = Math.cos(globalAngle);
  let globalToneR = Math.cos(Math.PI - globalAngle);
  return [globalToneR, globalToneL];
}

// 体のパーツの各角度を計算
function getArrayContainsPartsAngles(gToneR, gToneL, basePosition, amplitude) {
  let aL = basePosition + amplitude * gToneL;
  let aR = basePosition + amplitude * gToneR;
  return [aR, aL];
}

// 上腕の位置をセット
function setUpperArmsPosition(upperArmAR, upperArmAL) {
  rUpperArm = getArraySummingArrayAngle(shoulder, upperArmAR, upperArmLength)
  lUpperArm = getArraySummingArrayAngle(shoulder, upperArmAL, upperArmLength)
}

// 前腕の位置更新
function setHandsPosition(handAR, handAL) {
  rHand = getArraySummingArrayAngle(rUpperArm, handAR, armLength);
  lHand = getArraySummingArrayAngle(lUpperArm, (Math.PI - globalRhythmedAngleL), armLength);
}

// 大腿の位置を計算
function makeKneePositionFromGlobalRhythmedAngle(globalRhythmedAngle) {
  rLowerLeg = getArraySummingArrayAngle(waist, globalRhythmedAngle, lowerLegLength);
  lLowerLeg = getArraySummingArrayAngle(waist, globalRhythmedAngle)
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


    if(getCanvasLeftInt() > CanvasBoxMovingRangeInt) {
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