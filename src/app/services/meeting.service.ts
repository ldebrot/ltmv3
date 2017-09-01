//This service handles the meetings based on dbuserinfo

//Firebase service
import * as firebase from 'firebase';

//Built-in stuff:
import { OnInit, Injectable } from '@angular/core';

//Hand-made
import { meetingtypeitem } from './meetingtype.model';
import { ReadwriteService } from './readwrite.service';
import { meetingitem } from './meeting.model';

//Firebase


@Injectable()
export class MeetingService implements OnInit{
    
    public meetings : any;

    constructor(
        public readwriteservice:ReadwriteService
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
        console.log(this.meetings);
        console.log("this.meetings");
        
    }
    
    public createnew(actionname:string,creatoruids:object,participantuids:object,date:string,address:string):void {
        let temp_id:number = this.createid();
        let temp_step:string = "";
        for (let i = 0; i < this.meetingtypes.length; i++) {
            if (this.meetingtypes[i].name===actionname) {
                temp_step = this.meetingtypes[i].afterstep;
            }
        }
        let temp_meeting = new meetingitem (
            temp_id,
            temp_step,
            creatoruids,
            participantuids,
            date,
            address
        )
        let temp_updates = {};
        let temp_date = Date.now();
        let temp_meetingobject = {created:temp_date, status:"creator"};
        temp_updates["/users/"+firebase.auth().currentUser.uid+"/meetings/"+temp_id]=temp_meetingobject;
        firebase.database().ref().update(temp_updates)
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
        this.createnew("invitationcreate",{bvomnxmapRSAXBDE05Gh5TU3odj1:"okay"},{YDggrswjcIfWmrGYNOdh6fBThI12:"okay"},"1709301230","9, rue du Rhin, 75010 PARIS");
    }

    public getcurrentusermeetings():void {
        this.readwriteservice.getcurrentusermeetings("creator")
        .then((input)=>{
            //console.log("input");
            //console.log(input);
            this.initiatemeetingsobject();
            for (let i = 0; i < input.length; i++) {
                if (input[i].currentstep!==""){
                    if (this.meetings.countbystep[input[i].currentstep]===""){
                        console.log("this currentstep is not registered in this.meetings");
                    }else{
                        this.meetings.countbystep[input[i].currentstep]=this.meetings.countbystep[input[i].currentstep]+1;
                        this.meetings.itemsbystep[input[i].currentstep].push(input[i]);
                    }
                }
            }
            //input holds array of meeting items

        });
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