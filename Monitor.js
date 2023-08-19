const pcap = require('pcap');
const ws = require('ws')

const device_name = 'wlan0'
const options = {
    promiscuous: true,
    monitor: false,
}

const pcap_session = pcap.createSession(device_name, options);
const wss = new ws.WebSocketServer({ port: 3005 })

wss.on('connection', ()=>{
    console.log('Client connected!')
})

console.log("pcap capture and server started")

pcap.warningHandler = function (warn) {
    console.log(warn)
}

pcap_session.on('packet', (raw_packet) => {
    let packet = pcap.decode.packet(raw_packet);
    wss.clients.forEach((ws)=>{
        ws.send(JSON.stringify(packet))
    })    
})

// TODO: ADD PACKET INJECTION

console.log("Session created!")