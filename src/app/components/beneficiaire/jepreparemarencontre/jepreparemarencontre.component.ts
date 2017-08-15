import { TitleService } from './../../../services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jepreparemarencontre',
    templateUrl: './jepreparemarencontre.component.html',
    styleUrls: ['./jepreparemarencontre.component.css']
})
export class JepreparemarencontreComponent implements OnInit {
    
    constructor(
        private titleservice: TitleService
    ) { 
        this.titleservice.titlesubject.next("Je prépare ma rencontre");//sets title in title service to "Mon planning" after half a second
    }
    
    ngOnInit() {
    }
    
}
