const socket = new WebSocket(`ws://${location.host}`);
socket.onopen=(event)=>console.log(`open1 ${event}`);
socket.onmessage=(event)=>{
    console.log(`onmessage ${event.data}}`);
    syncnotes(event.data)
};
socket.onerror=(event)=>console.log(`on error ${event}`);
socket.onclose=(event)=>console.log(`on close ${event}`);