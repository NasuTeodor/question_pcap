class PacketHeader {
    //PACKET DATA STRUCTURE
    TIMESTAMP = undefined   //momentul de capture
    CAPLEN = undefined      //length of portion present //nush ce e asta
    LEN = undefined         //packet length

    constructor(packet) {
        throw new Error('nuigata')
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
        console.log(...Object.keys(packet))
    }


}

export default MonitorPacketParser;