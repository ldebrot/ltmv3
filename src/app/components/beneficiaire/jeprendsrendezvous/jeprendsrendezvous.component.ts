//Built-in
import { Component, OnInit } from '@angular/core';

//Home-grown
import { DbuserinfoService } from './../../../services/dbuserinfo.service';
import { TitleService } from './../../../services/title.service';


@Component({
    selector: 'app-jeprendsrendezvous',
    templateUrl: './jeprendsrendezvous.component.html',
    styleUrls: ['./jeprendsrendezvous.component.css']
})
export class JeprendsrendezvousComponent implements OnInit {
    
    public temoinurl:string = "assets/images/profiletemoin_colored_50x50.png";

    constructor(
        public titleservice:TitleService,
        public dbuserinfoservice: DbuserinfoService
    ) { 
        this.titleservice.titlesubject.next("Je prends rendez-vous");//sets title in title service to "Je prends rendez-vous" after half a second
    }
    
    ngOnInit() {
    }
    
}
