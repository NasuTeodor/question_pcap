const pcap = require('pcap');

const device_name = 'wlan0'
const options = {
    promiscuous: true,
    monitor: false,
}

const pcap_session = pcap.createSession(device_name, options);

pcap.warningHandler = function(warn) {
    console.log(warn)
}

pcap_session.on('packet', (raw_packet)=>{
    // console.log(raw_packet);
    let packet = pcap.decode.packet(raw_packet);
    console.log(packet)
    // throw new Error("aici gata")
})

console.log("created session")