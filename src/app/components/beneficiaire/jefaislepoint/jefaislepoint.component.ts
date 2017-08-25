import { TitleService } from './../../../services/title.service';
import { Component, OnInit } from '@angular/core';

//PrimeNG
import {TooltipModule} from 'primeng/primeng';

//Home-grown:
import { NavigationService } from './../../../services/navigation.service';

@Component({
    selector: 'app-jefaislepoint',
    templateUrl: './jefaislepoint.component.html',
    styleUrls: ['./jefaislepoint.component.css']
})
export class JefaislepointComponent implements OnInit {
    
    constructor(
        public titleservice:TitleService,
        public navigationservice: NavigationService
        ) {
    }
    
    ngOnInit() {
        this.titleservice.titlesubject.next("Je fais le point");//sets title in title service to "Je fais le point" after half a second
        this.navigationservice.preparejefaislepointitems();//sets up the list of button in the monplanning menu.
        this.navigationservice.setnexttaskjefaislepoint();//sets the next important task, also shown in the mon planning menu.

    }



}
