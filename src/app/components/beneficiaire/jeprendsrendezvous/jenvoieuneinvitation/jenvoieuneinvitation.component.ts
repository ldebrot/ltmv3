//Ready-made:
import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms/forms";

//family-owned:
import { CommonService } from './../../../../services/common.service';
import { MeetingService } from './../../../../services/meeting.service';
import { BilanService } from './../../../../services/bilan.service';
import { TitleService } from './../../../../services/title.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';

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
        public commonservice:CommonService,
        public dbuserinfoservice:DbuserinfoService
    ) { 
        this.titleservice.titlesubject.next("Je prends rendez-vous");//sets title in title service to "Je prends rendez-vous" after half a second
    }
    
    ngOnInit() {
    }
    
    public jenvoieuneinvitation(form: NgForm):void{
        let temp_creatoruids : any = {};
        let temp_participantemails : any = {};
        
        temp_creatoruids[this.dbuserinfoservice.currentuserid]="beneficiaire";
        temp_participantemails = {
            temoin : form.value.temoinemail.toString(),
            beneficiaire : this.dbuserinfoservice.userinfo.privateinfo.email.toString()
        };
        this.meetingservice.createnew("invitationcreate",temp_creatoruids,{YDggrswjcIfWmrGYNOdh6fBThI12:"okay"},temp_participantemails,"201710301230","9, rue du Rhin, 75010 PARIS")
        .then(()=>{
            this.meetingservice.getcurrentusermeetings("creator");
        });
    }

    
}
