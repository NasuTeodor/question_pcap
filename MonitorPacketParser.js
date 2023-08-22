import { writeFile } from "fs/promises";

function decimalToHex(decimal) { return (decimal.toString(16)) }
function hexToDeciaml(hex) { return (parseInt(hex, 16)) }
function epochHexToDate(epochDate) {
    const timestamp = parseInt(epochDate, 16);
    const dt = new Date(timestamp * 1000);
    return dt
}

class PacketHeader {
    //PACKET DATA STRUCTURE
    TIMESTAMP = undefined   //momentul de capture
    CAPLEN = undefined      //length of portion present //nush ce e asta
    LEN = undefined         //packet length

    //USED STRUCTURE UNOFFICIAL
    HEADER_LENGTH = 16                  //4 fields a cate 4 bits
    FIELD_LENGTH = 4
    //ordinea in packet este asta: tsSecond tsMicro capLen orgLen
    TIMESTAMP_SECONDS = undefined       //standard epoch
    TIMESTAMP_MICROSECONDS = undefined  //microsecond fraction of the ts OR NANOSECOND MA OMOR SINCER LA CE DOCUMENTATIE AU ASTIA CA AU ZIS UNA SI AU PUS ALTA TULE DUMNEZEII LOR
    CAPTURE_LENGTH = undefined          //number for length of data bites
    ORIGINAL_LENGTH = undefined         //actual packet size on the network same as captured sper si doresc asta

    //PERSONAL INFORMATIONS
    //ADDED BECAUSE I LIKE TO USE THEM FOR TELEMETRY
    CAPTURE_DATE = undefined

    // #############################
    // PARCURGEREA HEADERULUI ESTE HARDCODED PE BAZA
    // STRUCTURII DESCRISE IN VARIABILELE USED
    // #############################
    constructor(pcap_packet_header) {
        let hexTsSec = ''
        let hexTsMicro = ''

        for (let i = 3; i >= 0; i--)
            hexTsSec += decimalToHex(pcap_packet_header[i])
        for (let i = 7; i >= 4; i--)
            hexTsMicro += decimalToHex(pcap_packet_header[i])

        //main data
        this.TIMESTAMP_SECONDS = hexToDeciaml(hexTsSec) * 1000
        this.TIMESTAMP = hexToDeciaml(hexTsSec) * 1000
        this.TIMESTAMP_MICROSECONDS = hexToDeciaml(hexTsMicro)

        //telemetry bonus
        let finalDate = new Date(this.TIMESTAMP_SECONDS)
        finalDate.setMilliseconds(hexToDeciaml(hexTsMicro) / 1000)
        this.CAPTURE_DATE = finalDate

        let hexCapLen = ''
        let hexOrgLen = ''

        for (let i = 11; i >= 8; i--)
            hexCapLen += decimalToHex(pcap_packet_header[i])
        for (let i = 15; i >= 12; i--)
            hexOrgLen += decimalToHex(pcap_packet_header[i])

        let packetLength = hexToDeciaml(hexCapLen)
        let originalLength = hexToDeciaml(hexOrgLen)

        this.CAPLEN = packetLength
        this.LEN = originalLength
        this.CAPTURE_LENGTH = packetLength
        this.ORIGINAL_LENGTH = originalLength

        //discard incomplete packets
        if (packetLength !== originalLength) {
            console.log('[PACKET HEADER]: Recieved actual length different from original length. Discarding packet')
            throw new Error('Incomplete packet, size difference between read and reported')
        }

    }

}

class EtherHeader {
    //ETHER HEADER STRUCTURE
    ETHER_DESTINATION_HOST = undefined
    EHTER_SOURCE_HOST = undefined
    ETHER_TYPE = undefined

    constructor() {
        throw new Error('nuigata')
    }
}

class IPHeader {
    //IP HEADER STRUCTURE
    IP_VERSION = undefined
    IP_SERVICE = undefined
    IP_TOTAL_LENGTH = undefined
    IP_IDENTIFICATION = undefined
    IP_OFFSET = undefined
    IP_TTL = undefined
    IP_PROTOCOL = undefined
    IP_CHECKSUM = undefined
    IP_SOURCE_ADDR = undefined
    IP_DESTINATION_ADDR = undefined

    //some bonus ip flags
    IP_FLAG_RESERVER_FRAGMENT = 0x8000  //reserved fragment
    IP_FLAG_DO_NOT_FRAGMENT = 0x4000    //don't fragment
    IP_FLAG_MORE_FRAGMENTS = 0x2000     //more fragment
    IP_FLAG_OFFMASK = 0x1fff            //mask for fragmenting bits

    constructor() {
        throw new Error('nuigata')
    }
}

class MonitorPacketParser {

    ACCEPTED_LINK_TYPE = 'LINKTYPE_IEEE802_11_RADIO'    //DISALLOW ANY OTHER LINK_TYPE

    // ### PACKET STRUCTURE ###
    ETHER_HEADER_SIZE = 14
    ETHER_ADDR_LEN = 6

    //REST SEQ
    REST_SEQ = undefined
    // todo add header structures for different protocols over ip

    LINK_TYPE = undefined
    HEADER = undefined
    BUFFER = undefined

    test_compatibility(link_type) {
        if (link_type != this.ACCEPTED_LINK_TYPE)
            throw new Error('Invalid Link Type. Unable to understand this format')
        else
            return true;
    }

    //ai buf? header si link_type
    parse(packet) {

        this.LINK_TYPE = packet.link_type
        this.HEADER = packet.header
        this.BUFFER = packet.buf

        //check if it's a rfmon packet
        this.test_compatibility(this.LINK_TYPE)

        let parsedPacketHeader = new PacketHeader(this.HEADER);

        console.log(parsedPacketHeader.CAPTURE_LENGTH, this.BUFFER.length)

        var payloadOffset = this.ETHER_HEADER_SIZE + this.ETHER_ADDR_LEN;//skip ethernet headers and addresses

        let buffer = ''

        for (let i = 0; i <= parsedPacketHeader.CAPTURE_LENGTH + 4; i++)
            buffer += `${decimalToHex(this.BUFFER[i])} `

        writeFile('buffer.txt', buffer, (err) => { if (err) { console.log(err) } })

    }


}

export default MonitorPacketParser;