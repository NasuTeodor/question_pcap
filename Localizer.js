import { PacketHeader } from "./MonitorPacketParser"

class Localizer{

    PACKET_HEADER = undefined
    DELTA_TIME = undefined
    SPEED_CONSTANT = 299792458 // m/s

    TS_SEC = undefined
    TS_MIC = undefined

    LAST_DISTANCE = undefined

    constructor(pcktHdr){
        this.PACKET_HEADER = new PacketHeader(pcktHdr)
        this.DELTA_TIME = dltTime 

        this.parse_header()
    }

    parse_header(){
        this.TS_SEC = this.PACKET_HEADER.TIMESTAMP_SECONDS
        this.TS_MIC = this.PACKET_HEADER.TIMESTAMP_MICROSECONDS
    }

    time_to_distance(deltaTime){
        this.LAST_DISTANCE = deltaTime * this.SPEED_CONSTANT
    }

}