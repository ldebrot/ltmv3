export class checkbuttontooltipmodel {
    public message: String;
    public intervalstart: number;
    public intervalend: number;
    
    constructor(message : String, intervalstart:number, intervalend:number) {
        this.message = message;
        this.intervalstart = intervalstart;
        this.intervalend = intervalend;
    }
}    
