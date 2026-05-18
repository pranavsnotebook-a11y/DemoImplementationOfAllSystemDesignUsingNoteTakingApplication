import { renderer_init , draw , drawinitStroke} from "../src/renderer/renderer.js";
import { startStroke , add , end , isActive } from "../src/domain/stokeservice.js";
import { getPoint } from "../src/input/mouse.js";


const notepad = document.getElementById("notepad"); //selector 
renderer_init(notepad);
// Set canvas size
notepad.width = window.innerWidth * 0.8;
notepad.height = window.innerHeight * 0.8;

let isdrawing = false


document.addEventListener('mousedown', function(e) {
    isdrawing = true;
    let points=getPoint(e)
    startStroke(points)
    drawinitStroke(points)
})

document.addEventListener('mousemove', function(e) {
    if (!isdrawing) return;
    let continuouspoints=getPoint(e);
    add(continuouspoints)
    draw(continuouspoints)
})

function syncnotes(data){
    if(!isdrawing){
        const parsedData = JSON.parse(data);
        ctx.lineTo(parsedData.xcoordinate, parsedData.ycoordinate);
        console.log("weredrawing")
        ctx.stroke();
    }

}



document.addEventListener('mouseup', function(e) {
    if (!isdrawing) return;
    isdrawing = false;
    let endpoint=getPoint(e);
    end(endpoint);
})
function save(){
    const canvas = document.getElementById("notepad");
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
    
}