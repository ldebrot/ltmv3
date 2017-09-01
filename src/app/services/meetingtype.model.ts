export class meetingtypeitem {
    public name: string;//name of the step
    public beforestep:string;// previous step
    public afterstep:string;//step after action (triggered by user or temoin)
    public autoafterstep: string;// step automatically after maxduration
    public minimumduration: number; // duration in hours, during which the step cannot be changed by user or temoin
    public maximumduration: number; // duration in hours, after which the step changes automatically: 
    //if positive : count down (34 = 34 hours count-down ==> dead line = now + 34 hours )
    //if negative : date of the availability - this amount = deadline (-72 => dead line = date of meeting - 72 hours)
    //if zero : date of meeting
    public triggeraction:string;//description of the action triggering the new step
    public stepdescription:string;//description of the current description
    
    constructor(
        name : string,
        beforestep : string,
        afterstep : string,
        autoafterstep : string,
        minimumduration : number,
        maximumduration : number,
        triggeraction:string,
        stepdescription:string
    ) {
        this.name = name;
        this.beforestep = beforestep;
        this.afterstep = afterstep;
        this.autoafterstep = autoafterstep;
        this.minimumduration = minimumduration;
        this.maximumduration = maximumduration;
        this.triggeraction = triggeraction;
        this.stepdescription = stepdescription;
    }
}  