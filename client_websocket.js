const socket= new WebSocket('ws://localhost:1337');
socket.onopen=(event)=>console.log(`open1 ${event}`);
socket.onmessage=(event)=>console.log(`onmessage ${event}`);
socket.onerror=(event)=>console.log(`on error ${event}`);
socket.onclose=(event)=>console.log(`on close ${event}`);

