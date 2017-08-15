import { TitleService } from './../../../services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jefaislepoint',
    templateUrl: './jefaislepoint.component.html',
    styleUrls: ['./jefaislepoint.component.css']
})
export class JefaislepointComponent implements OnInit {
    
    constructor(
        private titleservice:TitleService
    ) {
        this.titleservice.titlesubject.next("Je fais le point");//sets title in title service to "Je fais le point" after half a second
    }
    
    ngOnInit() {
    }
    
}
