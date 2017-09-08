export class meetingtypeitem {
    public currentstep:string;// previous step
    public beforestep:string;//step after action (triggered by user or temoin)
    public autoafterstep: string;// step automatically after maxduration
    public minimumduration: number; // duration in hours, during which the step cannot be changed by user or temoin
    public maximumduration: number; // duration in hours, after which the step changes automatically: 
    //if positive : count down (34 = 34 hours count-down ==> dead line = now + 34 hours )
    //if negative : date of the availability - this amount = deadline (-72 => dead line = date of meeting - 72 hours)
    //if zero : date of meeting
    public triggeractionname: string;//name of the action
    public triggeractiondescription:string;//description of the action triggering the new step
    public stepdescription:string;//description of the current description
    public buttoncaption:string;//this is the text of the button (with [tags] to be replaced)
    public buttonclass:string;//this holds the css classes for each type

    constructor(
        currentstep : string,
        beforestep : string,
        autoafterstep : string,
        minimumduration : number,
        maximumduration : number,
        triggeractionname:string,
        triggeractiondescription : string,
        stepdescription:string,
        buttoncaption:string,
        buttonclass:string
    ) {
        this.currentstep = currentstep;
        this.beforestep = beforestep;
        this.autoafterstep = autoafterstep;
        this.minimumduration = minimumduration;
        this.maximumduration = maximumduration;
        this.triggeractionname = triggeractionname;
        this.triggeractiondescription = triggeractiondescription;
        this.stepdescription = stepdescription;
        this.buttoncaption = buttoncaption;
        this.buttonclass = buttonclass;
    }
}  