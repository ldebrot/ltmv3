import { Component, OnInit } from '@angular/core';
import { DialogModule } from 'primeng/primeng';

@Component({
    selector: 'app-jedecouvrelunchtime',
    templateUrl: './jedecouvrelunchtime.component.html',
    styleUrls: ['./jedecouvrelunchtime.component.css']
})
export class JedecouvrelunchtimeComponent implements OnInit {

    public elementstobedisplayed:any = {
        jefaislepoint : false
    }

    showdisplay(elementtobedisplayed:string):void {
        this.elementstobedisplayed[elementtobedisplayed]=true
    }

    constructor() { }
    
    ngOnInit() {
    }
    
}
