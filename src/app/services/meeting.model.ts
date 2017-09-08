export class meetingitem {
    public id:number;//unique id of meeting
    public currentstep:string;//current step of the meeting 
    public creatoruids:object;//array of uids involved
    public participantuids:object;//array of uids involved
    public participants:any;//contains information about participants such as email
    public date:string;//"YYYYMMDDHHMM" meeting date
    public deadline:string;//"YYYYMMDDHHMM" dead line of currentstep
    public address:string;//address of meeting point

    constructor(
        id:number,
        currentstep:string,
        creatoruids:object,
        participantuids:object,
        participants:any,
        date:string,
        deadline:string,
        address:string
    ) {
        this.id = id;
        this.currentstep = currentstep;
        this.creatoruids = creatoruids;
        this.participantuids = participantuids;
        this.participants = participants;
        this.date = date;
        this.deadline = deadline;
        this.address = address;
    }
}  