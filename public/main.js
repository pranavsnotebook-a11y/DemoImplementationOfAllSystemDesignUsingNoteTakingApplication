import { renderer_init , draw , drawinitStroke} from "../src/renderer/renderer";
import { startStroke , add , end , isActive } from "../src/domain/stokeservice";
import { getPoint } from "../src/input/mouse";


const notepad = document.getElementById("notepad") //selector 
// Set canvas size
notepad.width = window.innerWidth * 0.8;
notepad.height = window.innerHeight * 0.8;

let isdrawing = false


document.addEventListener('mousedown', function(e) {
    let points=getPoint(e)
    startStroke(points)
    drawinitStroke(points)
})

document.addEventListener('mousemove', function(e) {
    let continuouspoints=getPoint(e);
    add(continuouspoints)

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