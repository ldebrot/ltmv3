export class bilantask {
    public validationtype: string;//this one indicates how the validation process is to be handled (is it about a value being present/absent in an array or is it about a simple value)
    public name: string;//the name of the task
    public message: string;//the message for the user
    public route: string;//the path to which leads the task, if left empty ("") no path to follow
    public modulelevel: string;//the name of the level of jefaislepoint. E.g. "jeconstruismonprojet"
    public step: string;//the number of the step in the module. E.g. 1, 2, 3...
    public experiencefield: string;//the name of the field which holds the value. E.g. "jeconstruismonprojetstep4avalue"
    public expectedvalue: any[] = [];//the value in which case the entry is shown (E.g. if user says "yes" to question X --> show this entry)
    public assignedto: string;//says who has to carry out task: beneficiaire, temoin or jeveuxensavoirplus
    public impact: number;//shows how the balance is impacted by this choice. Exceptions : -99 = annihilates all, 99 = neutralizes annihilation
    public iconclass: string;//the mdi icon class used for this task
    
    constructor(
        validationtype : string,
        name: string, 
        message: string, 
        route: string, 
        modulelevel: string, 
        step: number, 
        experiencefield : string, 
        expectedvalue:any, 
        assignedto : string, 
        impact :number,
        iconclass : string
    ) {
        this.validationtype = validationtype;
        this.name = name;
        this.message = message;
        this.route = route;
        this.modulelevel = modulelevel;
        this.step = step;
        this.experiencefield = experiencefield;
        this.expectedvalue = expectedvalue;
        this.assignedto = assignedto;
        this.impact = impact;
        this.iconclass = iconclass;
    }
}    
