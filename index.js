const notepad=document.getElementById("notepad")
const ctx=notepad.getContext("2d")

let startx=0;
let starty=0;
let endx=0;
let endy=0;

isdrawing = false
document.addEventListener('mousedown',function(e){
    console.log("down")
     startx=e.clientX
     starty= e.clientY
     ctx.lineTo(startx,starty);
})
document.addEventListener('mouseup',function(e){
    console.log("up")

     endx=e.clientX
     endy=e.clientY
     ctx.lineTo(endx,endy);
ctx.stroke();
})
