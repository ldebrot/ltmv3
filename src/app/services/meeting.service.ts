//This service handles the meetings based on dbuserinfo

//Firebase service
import * as firebase from 'firebase';

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

    public createnew(actionname:string,creatoruids:object,participantuids:object,meetingdate:string,address:string):any {
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
            meetingdate,
            temp_deadline,
            address
        )
        let temp_updates = {};
        let temp_date = Date.now();
        let temp_meetingobject = {created:temp_date, status:"creator"};
        temp_updates["/users/"+firebase.auth().currentUser.uid+"/meetings/"+temp_id]=temp_meetingobject;
        return firebase.database().ref().update(temp_updates)
        .then(()=> {
            temp_updates={};
            temp_updates["/meetings/"+temp_id]=temp_meeting;
            return firebase.database().ref().update(temp_updates);
        })
        .catch( function(error) {
                console.log("meeting service createnew error 1:");
                console.log(error);
        })
        .then(() => {
            console.log("createnew : updates okay");
        })
        .catch( function(error) {
                console.log("meeting service createnew error 2:");
                console.log(error);
        });
    }

    public tryme_createnew():void {
        this.createnew("invitationcreate",{bvomnxmapRSAXBDE05Gh5TU3odj1:"okay"},{YDggrswjcIfWmrGYNOdh6fBThI12:"okay"},"201710301230","9, rue du Rhin, 75010 PARIS")
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

    public meetingtypes : any = [
        new meetingtypeitem (
            "invitationcreate",
            "",
            "invitationsent",
            "invitationexpired",
            0,
            168,
            "Le bénéficiaire a envoyé une invitation.",
            "Le témoin doit accepter l'invitation."
        ),
        new meetingtypeitem (
            "temoinaddsnewavailability",
            "",
            "availabilityopen",
            "availabilityexpired",
            0,
            -360,//date of the availability - this amount = deadline
            "Le témoin a ajouté un nouveau créneau.",
            "Un bénéficiaire doit choisir ce créneau."
        ),
        new meetingtypeitem (
            "beneficiaireconfirmsavailability",
            "availabilityopen",
            "availabilityconfirmed",
            "availabilityopen",
            0,
            48,
            "Le bénéficiaire a choisi le créneau.",
            "Le témoin doit confirmer le rendez-vous dans les 48h."
        ),
        new meetingtypeitem (
            "temoinconfirmsmeeting",
            "availabilityconfirmed",
            "preparationbeneficiaire",
            "",
            0,
            -144,//144hrs before meeting 
            "Le témoin a confirmé le rendez-vous.",
            "Le bénéficiaire doit préparer la rencontre."
        ),
        new meetingtypeitem (
            "beneficiaireterminatespreparation",
            "preparationbeneficiaire",
            "preparationtemoin",
            "meetingautocancelledbeneficiaire",//beneficiaire has not prepared the meeting
            0,
            -72,//72hrs before meeting
            "Le bénéficiaire a terminé sa préparation.",
            "Le témoin doit préparer la rencontre."
        ),
        new meetingtypeitem (
            "temointerminatespreparation",
            "preparationtemoin",
            "meeting",
            "meeting",
            0,
            0,//dead line = meeting date
            "Le témoin a fini la préparation de la rencontre",
            "C'est le jour de la rencontre"
        ),
        new meetingtypeitem (
            "meetingterminates",
            "meeting",
            "meetingfollowup",
            "meetingfollowup",
            0,
            24,
            "La rencontre a eu lieu.",
            "Les participants doivent faire le suivi de la rencontre"
        ),
        new meetingtypeitem (
            "beneficiaireterminatesfollowup",
            "meetingfollowup",
            "meetingdone",
            "meetingwithoutfollowup",
            0,
            168,
            "Le bénéficiaire a fait le suivi de la rencontre.",
            "La rencontre est terminée."
        )
    ]
}