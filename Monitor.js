const pcap = require('pcap');
const ws = require('ws')

const device_name = 'wlan0mon'
const options = {
    promiscuous: true,
    monitor: false,
}

const pcap_session = pcap.createSession(device_name, options);
const wss = new ws.WebSocketServer({ port: 3005 })

const PacketParser = new MonitorPacketParser();

wss.on('connection', () => {
    console.log('Client connected!')
})

console.log("pcap capture and server started")

pcap.warningHandler = function (warn) {
    console.log("[PCAP WARN NEXT LINE]:")
    console.log(warn)
}

pcap_session.on('packet', (raw_packet) => {
    console.log(raw_packet)
    console.log(PacketParser.parse(raw_packet))
    throw new Error('done')
    // #### TO DO NOW
    // ADD CUSTOM PACKET PARSER FOR MONITOR MODE
    // LOOKUP PCAP IN TCPDUMP
    try {
        let packet = pcap.decode.packet(raw_packet);
        wss.clients.forEach((ws) => {
            ws.send(JSON.stringify(packet))
        })
    } catch (e) {
        wss.clients.forEach((ws) => { ws.send(JSON.stringify(e)) })
        wss.clients.forEach((ws) => { ws.send(raw_packet) })
    }
})

// TODO: ADD PACKET INJECTION

console.log("Session created!")