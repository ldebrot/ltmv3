export class monplanningitem {
    public iclass: string;//class used in <i> tag
    public tooltip: string;//tooltip text when you hoover over the item
    public aclass: string;//class used for button
    public route: string;//button link
    public atext: string;//button message
    public formodule: string;//shown for module
    public ifvalue: string;//shown according to value
    public emergencylevel: number; // emergency level between tasks
    
    constructor(
        iclass: string,
        tooltip: string,
        aclass: string, 
        route: string,  
        atext: string, 
        formodule :string, 
        ifvalue : string,
        emergencylevel: number
    ) {
        this.iclass = iclass;
        this.tooltip = tooltip;
        this.aclass = aclass;
        this.route = route;
        this.atext = atext;
        this.formodule = formodule;
        this.ifvalue = ifvalue;
        this.emergencylevel = emergencylevel;
    }
}  