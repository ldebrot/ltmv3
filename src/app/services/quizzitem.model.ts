export class quizzitemmodel {
    public iconclass: string;//which icon is used?
    public description: string;//tooltip description
    public caption: string;
    public visible: boolean;//can you see it?
    public quizzid: string;

    constructor(iconclass:string, description:string, caption:string, visible:boolean, quizzid: string) {
        this.iconclass = iconclass;
        this.description = description;
        this.caption = caption;
        this.visible = visible;
        this.quizzid = quizzid;
    }
}    
