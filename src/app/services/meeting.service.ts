//This service handles the meetings based on dbuserinfo

//Firebase service
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

//Built-in stuff:
import { OnInit, Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

//Hand-made
import { meetingtypeitem } from './meetingtype.model';
import { ReadwriteService } from './readwrite.service';
import { meetingitem } from './meeting.model';
import { CommonService } from './common.service';
import { FirebaseauthService } from './firebaseauth.service';
import { DbuserinfoService } from './dbuserinfo.service';
import { buttonmodel } from './button.model';

//Firebase


@Injectable()
export class MeetingService implements OnInit{
    
    public firebaseitem : any;

    public buttoncaptiontypes : any;//this holds the keywords to be used in the buttoncaption texts

    public meetings : any;
    public meetingparameters = {
        maxinvitations : 3
    }

    constructor(
        public readwriteservice:ReadwriteService,
        public commonservice:CommonService,
        public dbuserinfoservice:DbuserinfoService,
        public firebaseauthservice:FirebaseauthService
    ) {
        
    }

    ngOnInit() {
    }

    public initiatemeetingsobject():void {
        this.meetings = {
            countbystep : {},
            itemsbystep : {},
            allitems : []
        }
        for (let i = 0 ; i < this.meetingtypes.length; i++) {
            this.meetings.countbystep[this.meetingtypes[i].beforestep] = 0;
            this.meetings.countbystep[this.meetingtypes[i].currentstep] = 0;
            this.meetings.itemsbystep[this.meetingtypes[i].beforestep] = [];
            this.meetings.itemsbystep[this.meetingtypes[i].currentstep] = [];
        }
    }


    public setdeadline(meetingtypeid:number,meetingdate:string):string {
        let deadlinevalue:number = this.meetingtypes[meetingtypeid].maximumduration
        //remember that the meetingdate is saved as follows : YYYYMMDDHHmm
        let temp_deadline:string;
        let temp_meetingdatematrix = this.commonservice.getdatematrix(meetingdate);
        let temp_currentdateinmilliseconds = Date.now();
        if (deadlinevalue===0){
            //if zero : date of meeting
            temp_deadline = meetingdate;
        } else if (deadlinevalue > 0) {
            //if positive : count down (34 = 34 hours count-down ==> dead line = now + 34 hours )
            temp_deadline = this.commonservice.getformatteddate(temp_currentdateinmilliseconds + (deadlinevalue*60*1000));
        } else if (deadlinevalue < 0) {
            //if negative : date of the availability - this amount = deadline (-72 => dead line = date of meeting - 72 hours)
            temp_deadline = this.commonservice.getformatteddate(this.commonservice.getdatematrix(meetingdate).inmilliseconds - (deadlinevalue*60*1000));
        }
        return temp_deadline;
    }

    public createnew(triggeractionname:string,creatoruids:object,participantuids:object,participantemails:object,meetingdate:string,address:string):any {
        let temp_id:number = this.createid();
        let temp_step:string = "";
        let temp_deadline:string = "";
        for (let i = 0; i < this.meetingtypes.length; i++) {
            if (this.meetingtypes[i].triggeractionname===triggeractionname) {
                temp_step = this.meetingtypes[i].currentstep;
                temp_deadline = this.setdeadline(i,meetingdate);
            }
        }
        let temp_meeting = new meetingitem (
            temp_id,
            temp_step,
            creatoruids,
            participantuids,
            participantemails,
            meetingdate,
            temp_deadline,
            address
        )
        let temp_date = Date.now();
        //save meeting in /users/uid/ folder
        let temp_updates = {created:temp_date, status:"creator"};
        let temp_ref = "/users/"+this.firebaseauthservice.angularfireauth.auth.currentUser.uid+"/meetings/"+temp_id;
        this.dbuserinfoservice.userinfo.meetings[temp_id]=temp_updates;//saving things locally
        return this.readwriteservice.simplyupdate(temp_ref,temp_updates)//saving it on Firebase
        .then(()=>{
            //save meeting in /meetings/ folder
            temp_ref = "/meetings/"+temp_id+"/";
            return this.readwriteservice.simplyupdate(temp_ref,temp_meeting)
            .then(()=>{
                console.log("Created new meeting");
                this.getcurrentusermeetings('creator');

            })
            
        });
    }

    public getcurrentusermeetings(status:string):any{

        //Make a list of all meeting IDs
        let temp_meetingidlist : string[] = [];
        let temp_meetinglist : any[] = [];
        for (let i = 0; i < Object.keys(this.dbuserinfoservice.userinfo.meetings).length; i++){
            if (this.dbuserinfoservice.userinfo.meetings[Object.keys(this.dbuserinfoservice.userinfo.meetings)[i]].status===status){
                temp_meetingidlist.push(Object.keys(this.dbuserinfoservice.userinfo.meetings)[i]);
            }
        };
        console.log("temp_meetingidlist");
        console.log(temp_meetingidlist);

        //prepare promises used for firebase operations
        let temp_subscription : Subscription[] = [];
        let temp_promises : any[] = [];
        this.initiatemeetingsobject();
        for (let i:number = 0; i < temp_meetingidlist.length;i++){
            //console.log("meeting ID  nb : "+i);
            this.firebaseitem = this.firebaseauthservice.angularfiredatabase.object("/meetings/"+temp_meetingidlist[i]);
            temp_promises[i]= new Promise((resolve,reject)=>{
                temp_subscription[i] = this.firebaseitem.subscribe((data)=>{
                    if (data.currentstep!==""){
                        if (this.meetings.countbystep[data.currentstep]===""){
                            console.log("this currentstep is not registered in this.meetings");
                        }else{
                            this.meetings.countbystep[data.currentstep]=this.meetings.countbystep[data.currentstep]+1;
                            this.meetings.itemsbystep[data.currentstep].push(data);
                            this.meetings.allitems.push(data);
                        }
                    }
                    resolve();
                });
            })
        }

        return Promise.all(temp_promises)
        .then(()=>{
            for (let i = 0; i < temp_subscription.length;i++){
                if(temp_subscription[i]!==undefined){
                    temp_subscription[i].unsubscribe();
                }
            }
            console.log("this.meetings");
            console.log(this.meetings);
        });

    }

    public integratemeetings(input:any){
        this.initiatemeetingsobject();
        for (let i = 0; i < input.length; i++) {
            if (input[i].currentstep!==""){
                if (this.meetings.countbystep[input[i].currentstep]===""){
                    console.log("this currentstep is not registered in this.meetings");
                }else{
                    this.meetings[input[i].currentstep]=this.meetings.countbystep[input[i].currentstep]+1;
                    this.meetings.itemsbystep[input[i].currentstep].push(this.meetings[i]);
                }
            }
        }
    }


    public createid():number{
        let tempstring = Date.now().toString() + Math.round(Math.random()*1000000).toString();
        return Number(tempstring);
    }

    //Creates button items (which can be displayed with ngFor) --> check button.model to see what's in there
    public returnbuttonitems(meetings:meetingitem[]):buttonmodel[]{
        console.log("meetings.length");
        console.log(meetings.length);
        let temp_return : any = [];
        if (meetings.length!==0){
            for (let i = 0; i < meetings.length; i++){
                for (let i2 = 0; i2 < this.meetingtypes.length;i2++){
                    if (meetings[i].currentstep===this.meetingtypes[i2].currentstep){
                        temp_return[i]={};
                        temp_return[i] = new buttonmodel(
                            this.returnbuttoncaption(meetings[i],this.meetingtypes[i2].buttoncaption),
                            this.meetingtypes[i2].buttonclass,
                            this.meetingtypes[i2].routerlink,
                            this.meetingtypes[i2].tooltiptext
                        )
                        break;
                    }            
                }
            }                
        } else {
            console.log("returnmeetingitems: meetingtypes empty!");
        }
        return temp_return;
    }

    //Returns the caption of a button with keywords replaced
    public returnbuttoncaption(meeting:meetingitem, inputbuttoncaption:string):string{

        //Find keywords in caption text
        let temp_startpos:number[] = [];
        let temp_endpos:number[] = [];
        let temp_keyword:string[] = [];
        let temp_currentpos:number = 0
        let temp_inputbuttoncaptionrest : string = inputbuttoncaption;
        let next_startpos : number = 0;
        let next_endpos : number = 0;
        for (let i = 0; i < 10; i++){//there cannot be more than 10 keywords in a caption text
            next_startpos = temp_inputbuttoncaptionrest.search("\\[");
            next_endpos = temp_inputbuttoncaptionrest.search("\\]");
            if(temp_inputbuttoncaptionrest.search("\\[")>=0){
                temp_startpos[i] = next_startpos + temp_currentpos;
                temp_endpos[i] = next_endpos+1 + temp_currentpos;
                temp_currentpos += next_endpos+1;
                temp_keyword[i] = inputbuttoncaption.substring(temp_startpos[i]+1,temp_endpos[i]-1);
                temp_inputbuttoncaptionrest = inputbuttoncaption.substring(temp_endpos[i]);
            } else {
                break;
            }          
        }

        //console.log("temp_keyword");
       // console.log(temp_keyword);
        
        //Find replacement strings for each keyword
        let temp_replacement : string[] = [];
        for (let i = 0; i < temp_keyword.length; i++){
            switch (temp_keyword[i]) {
                case "temoinemail" :
                    temp_replacement[i]=Object.keys(meeting.participantemails.temoin)[0];
                break;
                case "meetingdate" :
                    //insert the meeting date here
                    let temp_dateinmilliseconds:number = this.commonservice.getdatematrix(meeting.date).inmilliseconds;
                    temp_replacement[i]=this.commonservice.getdateasaphrasefrommilliseconds(temp_dateinmilliseconds);
                break;
                case "deadline" :
                    //insert the dead line here
                    let temp_delta:number = this.commonservice.getdatematrix(meeting.deadline).inmilliseconds - Date.now();
                    temp_replacement[i] = this.commonservice.getdeadlineasaphrasefrommilliseconds(temp_delta);
                break;    
                default :
                temp_replacement[i] = "";
            }

        }
        //console.log("temp_replacement");
        //console.log(temp_replacement);

        //Replace keywords
        let temp_buttoncaption :string = inputbuttoncaption;
        for (let i = (temp_keyword.length - 1); i >= 0; i--){
            temp_buttoncaption = temp_buttoncaption.replace("["+temp_keyword[i]+"]",temp_replacement[i]);
        }

        //return result
        return temp_buttoncaption;
    }

    public meetingtypes : any = [
        new meetingtypeitem (
            "invitationsent",//current step
            "",//beforestep
            "invitationexpired",//automatic step if dead line is reached
            0,//
            168,
            "invitationcreate",//name of action
            "Le bénéficiaire a envoyé une invitation.",
            "Le témoin doit accepter l'invitation.",
            "Invitation envoyée à [temoinemail] le [meetingdate]. Il reste [deadline] à votre contact pour l'accepter.",
            "ldb_btn_inprogress"
        ),
        new meetingtypeitem (
            "availabilityopen",
            "",
            "availabilityexpired",
            0,
            -360,//date of the availability - this amount = deadline
            "temoinaddsnewavailability",
            "Le témoin a ajouté un nouveau créneau.",
            "Un bénéficiaire doit choisir ce créneau.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "availabilityconfirmed",
            "availabilityopen",
            "availabilityopen",
            0,
            48,
            "beneficiaireconfirmsavailability",
            "Le bénéficiaire a choisi le créneau.",
            "Le témoin doit confirmer le rendez-vous dans les 48h.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "preparationbeneficiaire",
            "availabilityconfirmed",
            "",
            0,
            -144,//144hrs before meeting 
            "temoinconfirmsmeeting",
            "Le témoin a confirmé le rendez-vous.",
            "Le bénéficiaire doit préparer la rencontre.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "preparationtemoin",
            "preparationbeneficiaire",
            "meetingautocancelledbeneficiaire",//beneficiaire has not prepared the meeting
            0,
            -72,//72hrs before meeting
            "beneficiaireterminatespreparation",
            "Le bénéficiaire a terminé sa préparation.",
            "Le témoin doit préparer la rencontre.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "meeting",
            "preparationtemoin",
            "meeting",
            0,
            0,//dead line = meeting date
            "temointerminatespreparation",
            "Le témoin a fini la préparation de la rencontre",
            "C'est le jour de la rencontre",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "meetingfollowup",
            "meeting",
            "meetingfollowup",
            0,
            24,
            "meetingterminates",
            "La rencontre a eu lieu.",
            "Les participants doivent faire le suivi de la rencontre",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "meetingdone",
            "meetingfollowup",
            "meetingwithoutfollowup",
            0,
            168,
            "beneficiaireterminatesfollowup",
            "Le bénéficiaire a fait le suivi de la rencontre.",
            "La rencontre est terminée.",
            "to be set in meeting.service.",
            ""
        )
    ]
}