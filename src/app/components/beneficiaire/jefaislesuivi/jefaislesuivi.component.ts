import { TitleService } from './../../../services/title.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-jefaislesuivi',
    templateUrl: './jefaislesuivi.component.html',
    styleUrls: ['./jefaislesuivi.component.css']
})
export class JefaislesuiviComponent implements OnInit {
    
    constructor(
        private titleservice : TitleService
    ) {
        this.titleservice.titlesubject.next("Je fais le suivi");//sets title in title service to "Je fais le suivi" after half a second        
    }
    
    ngOnInit() {
    }
    
}
