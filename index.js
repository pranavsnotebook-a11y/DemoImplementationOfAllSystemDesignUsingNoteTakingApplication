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
        modifyData(("Hi").toString())
    }

})

function modifyData(message){
    const frame =[]
    const firstFrame=(1).toString(2).padStart(8, '0')
    console.log(firstFrame);
    const stringlength=message.length;
    console.log(stringlength);
    const thirdFrame=[]
    if(stringlength>0){

        if(stringlength>125){
                if(stringlength>(Math.pow())){
                    thirdFrame=(127).toString(2).padStart(8, '0')
                }


        }

    }        

    //const secondFrame =  

    const encoder = new TextEncoder();
    const finalFrame = encoder.encode("Hi");
    console.log(finalFrame);


// Uint8Array [72, 105]
}

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