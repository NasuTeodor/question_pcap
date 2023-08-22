function decimalToHex(decimal) { return (decimal.toString(16)) }
function hexToDeciaml(hex) { return (parseInt(hex, 16)) }
function hexToChar(hex) { return (hex.toString()) }

function epochToLocal(decimal_epoch) {
    let d = new Date(0)
    d.setUTCSeconds(decimal_epoch)
    return d
}

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
        //get timestamp
        let tsSec = ''
        for (let i = 3; i >= 0; i--)
            tsSec += decimalToHex(pcap_packet_header[i])

        this.TIMESTAMP_SECONDS = hexToDeciaml(tsSec)
        this.TIMESTAMP = hexToDeciaml(tsSec)
        this.CAPTURE_DATE = epochHexToDate(tsSec)

        //get microsecond of capture
        let tsMicro = ''
        for (let i = 7; i >= 4; i--)
            tsMicro += decimalToHex(pcap_packet_header[i])
        console.log(hexToDeciaml(tsMicro))


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
    parse(packet) {

        //ai buf? header si link_type
        let header = packet.header
        console.log(header)
        let s = ''
        for (let i = 0; i < header.length; i++)
            s += hexToChar(decimalToHex(header[i]))
        console.log(s)
        let pkthdr = new PacketHeader(header)
        console.log('[END OF HEADER CAST]\n\n')
    }


}

export default MonitorPacketParser;