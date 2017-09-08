//Ready-made:
import { Component, OnInit } from '@angular/core';

//family-owned:
import { CommonService } from './../../../../services/common.service';
import { MeetingService } from './../../../../services/meeting.service';
import { BilanService } from './../../../../services/bilan.service';
import { TitleService } from './../../../../services/title.service';

@Component({
    selector: 'app-invitationsdashboard',
    templateUrl: './invitationsdashboard.component.html',
    styleUrls: ['./invitationsdashboard.component.css']
})
export class InvitationsdashboardComponent implements OnInit {
    
    constructor(
        public titleservice:TitleService,
        public bilanservice:BilanService,
        public meetingservice:MeetingService,
        public commonservice:CommonService
    ) { 
        this.titleservice.titlesubject.next("Je prends rendez-vous");//sets title in title service to "Je prends rendez-vous" after half a second
    }
    
    ngOnInit() {
        this.bilanservice.assesslevel();
    }
    
}
