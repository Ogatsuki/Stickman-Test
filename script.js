(function() {
  // 初期設定ここから----------------------------
  const canvas = document.getElementById("myCanvas");
  const start = document.getElementById("start");
  const reset = document.getElementById("reset");
  let ctx = canvas.getContext("2d");
  let neck = [150, 200];
  let shoulder = [150, 230];
  let waist = [150, 330];
  let rUpperArm = [];
  let lUpperArm = [];
  let upperArmLength = 50;
  let rLowerArm = [];
  let lLowerArm = [];
  let lowerArmLength = 50;
  let rThigh = [];
  let lThigh = [];
  let thighLength = 70;
  let rLowerLeg = [];
  let lLowerLeg = [];
  let lowerLegLength = 70;
  let stopFlag = false;


  let canvasLeft;
  let canvasLeftInt;
  let CanvasBoxMovingRangeInt = parseInt(window.innerWidth) - parseInt(window.getComputedStyle(canvas).width);
  let globalAngle = 0;
  let globalAngleDelta = Math.PI * 1/180;
  let globalToneArray = [];
  let upperArmAngles = [];
  let lowerArmAngles = [];
  let thighAngles = [];
  let lowerLegAngles = [];




  firstDrawStickman();

  function firstDrawStickman() {
    globalToneArray = getGlobalToneArray(0);
    setStickman(globalToneArray);
    drawStickman();
    console.log(lLowerLeg);
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
    ctx.strokeStyle = "gray";
    ctx.stroke();
    
    // 右上腕
    ctx.beginPath();
    ctx.moveTo(...shoulder);
    ctx.lineTo(...rUpperArm);
    ctx.strokeStyle = "lightblue";
    ctx.stroke();
  
    // 右前腕
    ctx.beginPath();
    ctx.moveTo(...rUpperArm);
    ctx.lineTo(...rLowerArm);
    ctx.strokeStyle = "blue";
    ctx.stroke();
    
    // 左上腕
    ctx.beginPath();
    ctx.moveTo(...shoulder);
    ctx.lineTo(...lUpperArm);
    ctx.strokeStyle = "lightgreen";
    ctx.stroke();
  
    // 左前腕
    ctx.beginPath();
    ctx.moveTo(...lUpperArm);
    ctx.lineTo(...lLowerArm);
    ctx.strokeStyle = "green";
    ctx.stroke();
    
    // 右腿
    ctx.beginPath();
    ctx.moveTo(...waist);
    ctx.lineTo(...rThigh);
    ctx.strokeStyle = "magenta";
    ctx.stroke();
    
    // 右下腿
    ctx.beginPath();
    ctx.moveTo(...rThigh);
    ctx.lineTo(...rLowerLeg);
    ctx.strokeStyle = "red";
    ctx.stroke();
  
    // 左腿
    ctx.beginPath();
    ctx.moveTo(...waist);
    ctx.lineTo(...lThigh);
    ctx.strokeStyle = "pink";
    ctx.stroke();
    
    // 左下腿
    ctx.beginPath();
    ctx.moveTo(...lThigh);
    ctx.lineTo(...lLowerLeg);
    ctx.strokeStyle = "purple";
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
  
  
  
  
  
  
  
  

  
  
  function getArraySummingArrayAngle(array1, angle, radius) {
    let arrayA = [];
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
  function globalAnglePlusDelta(deltaA) {
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
  function getBodyPartPosition(baseBodyPart, bodyPartAngle, length) {
    bodyPartPosition = getArraySummingArrayAngle(baseBodyPart, bodyPartAngle, length);
    return bodyPartPosition;
  }
  
  // 体の位置初期計算・更新
  function setStickman(toneArray) {
    upperArmAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 1/2, Math.PI * 1/6);
    lowerArmAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 2/5, Math.PI * 1/7);
    thighAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 11/24, Math.PI * 1/6);
    lowerLegAngles = getBodyPartAnglesArray(...toneArray, Math.PI * 7/12, Math.PI * 1/7);
  
    rUpperArm = getBodyPartPosition(shoulder, upperArmAngles[0], upperArmLength);
    lUpperArm = getBodyPartPosition(shoulder, upperArmAngles[1], upperArmLength);
    rLowerArm = getBodyPartPosition(rUpperArm, lowerArmAngles[0], lowerArmLength);
    lLowerArm = getBodyPartPosition(lUpperArm, lowerArmAngles[1], lowerArmLength);
    rThigh = getBodyPartPosition(waist, thighAngles[0], thighLength);
    lThigh = getBodyPartPosition(waist, thighAngles[1], thighLength);
    rLowerLeg = getBodyPartPosition(rThigh, lowerLegAngles[0], lowerLegLength);
    lLowerLeg = getBodyPartPosition(lThigh, lowerLegAngles[1], lowerLegLength);
  }
  
  async function run() {
    console.log("function started.");
  
    while(getCanvasLeftInt() <= parseInt(window.innerWidth)) { 
      await timeout(2);
      canvas.style.left = canvasLeftInt + 1 + "px";
      
      // 体の位置更新
      globalAnglePlusDelta(globalAngleDelta);
      globalToneArray = getGlobalToneArray(globalAngle);
      setStickman(globalToneArray);
      drawStickman();
  
  
      if(getCanvasLeftInt() > CanvasBoxMovingRangeInt) {
        stopFlag = true;
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
})();