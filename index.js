const notepad = document.getElementById("notepad")
const ctx = notepad.getContext("2d")

let isdrawing = false

document.addEventListener('mousedown', function(e) {
    isdrawing = true
    ctx.beginPath()
    ctx.moveTo(e.clientX, e.clientY)
})

document.addEventListener('mousemove', function(e) {
    if (isdrawing) {
        ctx.lineTo(e.clientX, e.clientY)
        ctx.stroke()
    }
})

document.addEventListener('mouseup', function(e) {
    isdrawing = false
})
