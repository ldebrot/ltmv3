export class buttonmodel {
    public buttoncaption:string;//this is the text of the button (with [tags] to be replaced)
    public buttonclass:string;//this holds the css classes for each type
    public routerlink:string;//
    public tooltiptext:string;//

    constructor(
        buttoncaption:string,
        buttonclass:string,
        routerlink:string,
        tooltiptext:string
    ) {
        this.buttoncaption = buttoncaption;
        this.buttonclass = buttonclass;
        this.routerlink = routerlink;
        this.tooltiptext = tooltiptext;
    }
}  