const notepad = document.getElementById("notepad") //selector 
const ctx = notepad.getContext("2d")// tools to modify canvas

let isdrawing = false

document.addEventListener('mousedown', function(e) {
    isdrawing = true
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
})
//

document.addEventListener('mousemove', function(e) {
    if (isdrawing) {
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke();
        socket.send(JSON.stringify({'xcoordinate':e.clientX,'ycoordinate': e.clientY}))
    }

})



document.addEventListener('mouseup', function(e) {
    isdrawing = false
})
function save(){
    const canvas = document.getElementById("notepad");
    const dataURL = canvas.toDataURL();
    console.log(dataURL);
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby
// blAAAADElEQVQImWNgoBMAAABpAAFEI8ARAAAAAElFTkSuQmCC"
    
}