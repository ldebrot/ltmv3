export class meetingitem {
    public id:number;//unique id of meeting
    public currentstep:string;//current step of the meeting 
    public creatoruids:object;//array of uids involved
    public participantuids:object;//array of uids involved
    public date:string;//"YYYYMMDDHHMM"
    public address:string;//address of meeting point

    constructor(
        id:number,
        currentstep:string,
        creatoruids:object,
        participantuids:object,
        date:string,
        address:string
    ) {
        this.id = id;
        this.currentstep = currentstep;
        this.creatoruids =creatoruids;
        this.participantuids = participantuids;
        this.date = date;
        this.address = address;
    }
}  