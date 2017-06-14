import { ldbmenuitem } from './ldbmenuitem.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-section-topmenu',
    templateUrl: './section-topmenu.component.html',
    styleUrls: ['./section-topmenu.component.css']
})
export class SectionTopmenuComponent implements OnInit {

    menuitems: ldbmenuitem[] = [
        new ldbmenuitem('Moi et la reconversion', 1, ''),
        new ldbmenuitem('Je m\'inspire     d\'autrui', 2, ''),
        new ldbmenuitem('Je valorise ma reconversion', 3, ''),
        new ldbmenuitem('Je rencontre un mentor/é', 4, ''),
        new ldbmenuitem('Je découvre la communauté', 5, '')
    ];

    trymescrollposition : number = 0;
    
    constructor() { }
    
    public tagueule(): void {
        alert("Ta gueule!");
    }

    public tryme(event:any): void {
        if(event.target.scrollLeft>150){
            this.menuitems.push(this.menuitems[0]);
            this.menuitems.splice(0,1);
            event.target.scrollLeft=event.target.scrollLeft-150;
            console.log('current pos: '+this.menuitems[0].title);
        }
    }
    
    ngOnInit() {
    }
    
}
