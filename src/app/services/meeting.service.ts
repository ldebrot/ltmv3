import { AngularFireAuth } from 'angularfire2/auth';
//This service handles the meetings based on dbuserinfo

//Firebase service
import * as firebase from 'firebase/app';

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
            itemsbystep : {}
        }
        for (let i = 0 ; i < this.meetingtypes.length; i++) {
            this.meetings.countbystep[this.meetingtypes[i].afterstep] = 0;
            this.meetings.countbystep[this.meetingtypes[i].beforestep] = 0;
            this.meetings.itemsbystep[this.meetingtypes[i].afterstep] = [];
            this.meetings.itemsbystep[this.meetingtypes[i].beforestep] = [];
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

    public createnew(actionname:string,creatoruids:object,participantuids:object,participants:object,meetingdate:string,address:string):any {
        let temp_id:number = this.createid();
        let temp_step:string = "";
        let temp_deadline:string = "";
        for (let i = 0; i < this.meetingtypes.length; i++) {
            if (this.meetingtypes[i].name===actionname) {
                temp_step = this.meetingtypes[i].afterstep;
                temp_deadline = this.setdeadline(i,meetingdate);
            }
        }
        let temp_meeting = new meetingitem (
            temp_id,
            temp_step,
            creatoruids,
            participantuids,
            participants,
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

    public tryme_createnew():void {
        this.createnew("invitationcreate",{"5egMZRLqVJMsDq477qgb9Nrr3kA3":"okay"},{YDggrswjcIfWmrGYNOdh6fBThI12:"okay"},{temoin : {email:"ldebrot@yahoo.de"}, beneficiaire:{email:"mumu@mumu.com"}},"201710301230","9, rue du Rhin, 75010 PARIS")
        .then(()=>{
            setTimeout(()=>{this.getcurrentusermeetings("creator");},5000);
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
            //console.log("this.meetings");
            //console.log(this.meetings);
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
    public returnbuttonitems(meetings:meetingitem[]):any{
        let temp_return : any = [];
        if (meetings.length!==0){
            for (let i = 0; i < meetings.length; i++){
                for (let i2 = 0; i2 < this.meetingtypes.length;i2++){
                    if (meetings[i].currentstep===this.meetingtypes[i2].currentstep){
                        temp_return[i].buttonclass = this.meetingtypes[i2].buttonclass;
                        temp_return[i].tooltiptext = this.meetingtypes[i2].tooltiptext;
                        temp_return[i].routerlink = this.meetingtypes[i2].routerlink;
                        temp_return[i].buttoncaption = this.returnbuttoncaption(meetings[i],this.meetingtypes[i2].buttoncaption);
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
        let temp_buttoncaption : string = inputbuttoncaption;
        let temp_startpos:number[] = [];
        let temp_endpos:number[] = [];
        let temp_keyword:string[] = [];
        let temp_currentpos:number = 0
        let temp_inputbuttoncaptionrest : string = inputbuttoncaption;
        let next_startpos : number = 0;
        let next_endpos : number = 0;
        for (let i = 0; i < 10; i++){
            next_startpos = temp_inputbuttoncaptionrest.search("\\[") + temp_currentpos;
            next_endpos = temp_inputbuttoncaptionrest.search("\\]") + temp_currentpos;
            if(next_startpos>=0){
                temp_startpos[i] = next_startpos;
                temp_endpos[i] = next_endpos+1;
                temp_currentpos += next_endpos+1;
                temp_keyword[i] = inputbuttoncaption.substring(temp_startpos[i]+1,temp_endpos[i]-1);
                temp_inputbuttoncaptionrest = temp_inputbuttoncaptionrest.substring(next_endpos+1);
            } else {
                break;
            }          
        }

        let temp_replacement : string[] = [];
        for (let i = 0; i < temp_keyword.length; i++){
            switch (temp_keyword[i]) {
                case "temoinemail" :
                    //insert the email of the temoin here
                    ///--> must resolve problem of accessing private info of other --> to be stored in meeting ?
                    temp_replacement[i]=meeting.participants.temoin.email;
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

        for (let i = (temp_keyword.length - 1); i = 0; i--){
            temp_buttoncaption = inputbuttoncaption.replace("["+temp_keyword[i]+"]",temp_replacement[i]);
        }

        return temp_buttoncaption;
    }

    public meetingtypes : any = [
        new meetingtypeitem (
            "invitationcreate",
            "",
            "invitationsent",
            "invitationexpired",
            0,
            168,
            "Le bénéficiaire a envoyé une invitation.",
            "Le témoin doit accepter l'invitation.",
            "Invitation envoyée à [temoinemail] le [meetingdate]. Il reste [deadline] à votre contact pour l'accepter.",
            "ldb_btn_inprogress"
        ),
        new meetingtypeitem (
            "temoinaddsnewavailability",
            "",
            "availabilityopen",
            "availabilityexpired",
            0,
            -360,//date of the availability - this amount = deadline
            "Le témoin a ajouté un nouveau créneau.",
            "Un bénéficiaire doit choisir ce créneau.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "beneficiaireconfirmsavailability",
            "availabilityopen",
            "availabilityconfirmed",
            "availabilityopen",
            0,
            48,
            "Le bénéficiaire a choisi le créneau.",
            "Le témoin doit confirmer le rendez-vous dans les 48h.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "temoinconfirmsmeeting",
            "availabilityconfirmed",
            "preparationbeneficiaire",
            "",
            0,
            -144,//144hrs before meeting 
            "Le témoin a confirmé le rendez-vous.",
            "Le bénéficiaire doit préparer la rencontre.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "beneficiaireterminatespreparation",
            "preparationbeneficiaire",
            "preparationtemoin",
            "meetingautocancelledbeneficiaire",//beneficiaire has not prepared the meeting
            0,
            -72,//72hrs before meeting
            "Le bénéficiaire a terminé sa préparation.",
            "Le témoin doit préparer la rencontre.",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "temointerminatespreparation",
            "preparationtemoin",
            "meeting",
            "meeting",
            0,
            0,//dead line = meeting date
            "Le témoin a fini la préparation de la rencontre",
            "C'est le jour de la rencontre",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "meetingterminates",
            "meeting",
            "meetingfollowup",
            "meetingfollowup",
            0,
            24,
            "La rencontre a eu lieu.",
            "Les participants doivent faire le suivi de la rencontre",
            "to be set in meeting.service.",
            ""
        ),
        new meetingtypeitem (
            "beneficiaireterminatesfollowup",
            "meetingfollowup",
            "meetingdone",
            "meetingwithoutfollowup",
            0,
            168,
            "Le bénéficiaire a fait le suivi de la rencontre.",
            "La rencontre est terminée.",
            "to be set in meeting.service.",
            ""
        )
    ]
}