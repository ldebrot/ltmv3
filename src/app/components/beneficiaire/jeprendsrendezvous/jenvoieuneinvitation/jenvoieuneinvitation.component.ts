//Ready-made:
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";

//family-owned:
import { CommonService } from './../../../../services/common.service';
import { MeetingService } from './../../../../services/meeting.service';
import { BilanService } from './../../../../services/bilan.service';
import { TitleService } from './../../../../services/title.service';

@Component({
    selector: 'app-jenvoieuneinvitation',
    templateUrl: './jenvoieuneinvitation.component.html',
    styleUrls: ['./jenvoieuneinvitation.component.css']
})
export class JenvoieuneinvitationComponent implements OnInit {
    
    constructor(
        public titleservice:TitleService,
        public bilanservice:BilanService,
        public meetingservice:MeetingService,
        public commonservice:CommonService
    ) { 
        this.titleservice.titlesubject.next("Je prends rendez-vous");//sets title in title service to "Je prends rendez-vous" after half a second
    }
    
    ngOnInit() {
    }
    
    
}
