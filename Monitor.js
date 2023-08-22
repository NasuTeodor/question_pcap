import { createSession } from 'pcap';
import { WebSocketServer } from 'ws';
import MonitorPacketParser from './MonitorPacketParser.js';

const device_name = 'wlan0mon'
const options = {
    promiscuous: true,
    monitor: false,
}

const pcap_session = createSession(device_name, options);
const wss = new WebSocketServer({ port: 3005 })

const PacketParser = new MonitorPacketParser();

wss.on('connection', () => {
    console.log('Client connected!')
})

console.log("pcap capture and server started")

// warningHandler = function (warn) {
//     console.log("[PCAP WARN NEXT LINE]:")
//     console.log(warn)
// }
 
pcap_session.on('packet', (raw_packet) => {
    // console.log(raw_packet)
    PacketParser.parse(raw_packet)

    wss.clients.forEach(ws=>ws.send('[WARN]: RETURNING RAW PACKETS'))
    wss.clients.forEach(ws=>ws.send(JSON.stringify(raw_packet)))
    // throw new Error('done')
    // #### TO DO NOW
    // ADD CUSTOM PACKET PARSER FOR MONITOR MODE
    // LOOKUP PCAP IN TCPDUMP
    // try {
    //     let packet = pcap.decode.packet(raw_packet);
    //     wss.clients.forEach((ws) => {
    //         ws.send(JSON.stringify(packet))
    //     })
    // } catch (e) {
    //     wss.clients.forEach((ws) => { ws.send(JSON.stringify(e)) })
    //     wss.clients.forEach((ws) => { ws.send(raw_packet) })
    // }
})

// TODO: ADD PACKET INJECTION

console.log("Session created!")