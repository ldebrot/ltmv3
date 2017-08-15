import { TitleService } from './../../../services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jeprendsrendezvous',
    templateUrl: './jeprendsrendezvous.component.html',
    styleUrls: ['./jeprendsrendezvous.component.css']
})
export class JeprendsrendezvousComponent implements OnInit {
    
    constructor(
        private titleservice:TitleService
    ) { 
        this.titleservice.titlesubject.next("Je prends rendez-vous");//sets title in title service to "Je prends rendez-vous" after half a second
    }
    
    ngOnInit() {
    }
    
}
