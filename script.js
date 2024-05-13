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
let rLowerArm = [,];
let lLowerArm = [,];
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
  ctx.lineTo(...rLowerArm);
  ctx.stroke();
  
  // 左上腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...lUpperArm);
  ctx.stroke();

  // 左前腕
  ctx.beginPath();
  ctx.moveTo(...shoulder);
  ctx.lineTo(...rLowerArm);
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








let canvasLeft;
let canvasLeftInt;
let CanvasBoxMovingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);
let globalAngle = 0;
let globalAngleDelta = Math.PI * 1/180;
let globalToneArray = [,];
let upperArmAngles = [,];
let lowerArmAngles = [,];
let thighAngles = [,];
let lowerLegAngles = [,];


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
function globalAnglePlusDelta(globalAngle, deltaA) {
  globalAngle += deltaA;
}

// globalToneR,Lを作る
function getGlobalToneArray(globalAngle) {
  let globalToneL = Math.cos(globalAngle);
  let globalToneR = Math.cos(Math.PI - globalAngle);
  return [globalToneR, globalToneL];
}

// 体のパーツの各角度を計算
function getBodyPartAnglesArray(gToneR, gToneL, baseAngle, amplitude) {
  let aL = baseAngle + amplitude * gToneL;
  let aR = baseAngle + amplitude * gToneR;
  return [aR, aL];
}

// 角度をもとに体のパーツの位置を計算
function getBodyPartPositions(baseBodyPart, angleRight, angleLeft, length) {
  rightPart = getArraySummingArrayAngle(baseBodyPart, angleRight, length);
  leftPart = getArraySummingArrayAngle(baseBodyPart, angleLeft, length);
  return [rightPart, leftPart];
}

// 体の位置初期計算・更新
function setStickman(toneArray) {
  upperArmAngles = getBodyPartAnglesArray(...toneArray, Math,PI * 1/2, Math.PI * 1/6);
  lowerArmAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 4/5, Math.PI * 1/7);
  thighAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 5/12, Math.PI * 1/6);
  lowerLegAngle = getBodyPartAnglesArray(...toneArray, Meth.PI * 7/12, Math.PI * 1/7);
  
  rUpperArm = getBodyPartPositions(shoulder, ...upperArmAngles, upperArmLength)[0];
  lUpperArm = getBodyPartPositions(shoulder, ...upperArmAngles, upperArmLength)[1];
  rLowerArm = getBodyPartPositions(shoulder, ...lowerArmAngles, upperArmLength)[0];
  lLowerArm = getBodyPartPositions(shoulder, ...lowerArmAngles, upperArmLength)[1];
  rThigh = getBodyPartPositions(shoulder, ...thighAngles, upperArmLength)[0];
  lThigh = getBodyPartPositions(shoulder, ...thighAngles, upperArmLength)[1];
  rLowerLeg = getBodyPartPositions(shoulder, ...lowerLegAngles, upperArmLength)[0];
  lLowerLeg = getBodyPartPositions(shoulder, ...lowerLegAngles, upperArmLength)[1];
}

async function run() {
  console.log("function started.");

  while(getCanvasLeftInt() <= parseInt(window.innerWidth)) { 
    await timeout(2);
    canvas.style.left = canvasLeftInt + 1 + "px";
    
    // 体の位置更新
    globalAnglePlusDelta(globalAngle, globalAngleDelta);
    globalToneArray = getGlobalToneArray(globalAngle);
    setStickman(globalToneArray);
    drawStickman();


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

function firstDrawStickman() {
  globalToneArray = getGlobalToneArray(0);
  setStickman(globalToneArray);
  drawStickman();
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

firstDrawStickman();