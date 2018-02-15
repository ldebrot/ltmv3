export class ldbmenuitem {
    public title: string;
    public position: number;
    public icon: string;
    public route: string;
    
    constructor(title: string, position: number, icon: string, route: string) {
        this.title = title;
        this.position = position;
        this.icon = icon;
        this.route = route;
    }
}    
