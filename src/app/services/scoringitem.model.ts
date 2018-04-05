export class meetingitem {
    public id:number;//id of item
    public name:string;//name of item
    public description:string;//human-readable description of item
    public valuetype: "discrete" | "continuous";//type of value produced by item. Values are stored in an array as multiple values can be the output of the item.
    public valueunique: true | false;//if true, there is only one possible answer; if false, there can be several values in the output array.
    public coefficientmin: number;
    public coefficientmax: number;

    constructor(
        id:number,
        name:string,
        description:string,
        valuetype:"discrete" | "continuous",
        valueunique:true | false,
        coefficientmin:number,
        coefficientmax:number
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.valuetype = valuetype;
        this.valueunique = valueunique;
        this.coefficientmin = coefficientmin;
        this.coefficientmax = coefficientmax;
    }
}  