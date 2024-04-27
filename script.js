const canvas = document.getElementById("myCanvas");

let ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2, true);
// ctx.fillStyle = ""
// ctx.fill();
ctx.lineWidth = "5";
ctx.strokeStyle = "#333"
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 200);
ctx.lineTo(150, 350);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 230);
ctx.lineTo(220, 250);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 230);
ctx.lineTo(70, 250);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 350);
ctx.lineTo(230, 420);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 350);
ctx.lineTo(70, 420);
ctx.stroke();