//hand-made services
import { DbotherusersService } from './../../../../services/dbotherusersservice.service';
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from 'app/services/quizz.service';
import { ScoringevaluateService } from './../../../../services/scoringevaluate.service';

//built-in stuff
import { Component, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

//ngswipecards
import { SwipeCardsModule } from 'ng2-swipe-cards';

//PrimeNG
import {DialogModule} from 'primeng/dialog';
import {ProgressBarModule} from 'primeng/progressbar';
import {TooltipModule} from 'primeng/tooltip';
import {GrowlModule} from 'primeng/growl';
import {Message} from 'primeng/api';

@Component({
    selector: 'app-cs-profile',
    templateUrl: './cs-profile.component.html',
    styleUrls: ['./cs-profile.component.css']
})
@NgModule({
    imports: [BrowserModule, FormsModule, SwipeCardsModule],
    declarations: [CsProfileComponent],
    bootstrap: [CsProfileComponent]
})
export class CsProfileComponent implements OnInit {
    
    //SWIPECARD MANAGEMENT
    @ViewChild('cardLog') cardLogContainer: any;
    @ViewChild('tinderCardLog') tinderCardLogContainer: any;
    swipecards: any[] = [];
    cardCursor: number = 0;
    orientation: string = "x";
    overlay: any = {
        like: {
            backgroundColor: '#28e93b'
        },
        dislike: {
            backgroundColor: '#e92828'
        }
    };
    cardLogs: any = [];

    //component mavariables
    public swipecardbuttoncontainerhidden : boolean = false;//says if swipecard button container is visible or not
    public maxselected : number = 0;
    public minselected : number = 0;
    public countselected : number = 0;
    public automaticheight : number = 0;
    public automaticwidth : number = 0;

    //profile dialog
    public profiledialogvisible: boolean = false;
    public currentswipecard : any = {};
    public currentcaption : string = "";
    public dialog_values : any = [];

    //valueinformation growl
    public valueinformation: Message[] = [];

    //Guide information
    public usedguide : string = "guide1";

    //picture retrieval path
    public pictureretrievalpath : string = "assets/images/"

    ngOnInit() {
        this.definewidth_and_height()
    }

    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService,
        private dbotherusersservice : DbotherusersService,
        private scoringevaluateservice : ScoringevaluateService
    ) {
        this.quizzservice.setcheckbutton(false);//set start value of check button to false
        this.populatecards();
    }

    public definewidth_and_height(){
        this.automaticwidth = (window.innerWidth * 0.9);
        this.automaticheight = this.automaticwidth;
    }
    
    public populatecards() {
        let temp_usercount : number = 0;
        let temp_useritem : any = {};
        this.swipecards = [];
        let temp_scoreitem :any = {};
        console.log("this.scoringevaluateservice.guideresults[this.usedguide].userids",this.scoringevaluateservice.guideresults[this.usedguide].userids);
        this.scoringevaluateservice.guideresults[this.usedguide].userids.forEach((value_userid, index) => {
            temp_useritem = {}//reset user item
            temp_usercount++;//increment user count
            temp_useritem["id"] = temp_usercount//assign id
            temp_useritem["likeEvent"] = new EventEmitter();
            temp_useritem["destroyEvent"] = new EventEmitter();
            temp_useritem["caption"] = this.dbotherusersservice.getpublicinfovalue_fromlocaldb(value_userid, "firstname");
            temp_useritem["image"] = this.pictureretrievalpath + this.dbotherusersservice.getpublicinfovalue_fromlocaldb(value_userid, "pictureurl");
            temp_useritem['dialog_values'] = [];
            Object.keys(this.scoringevaluateservice.guideresults[this.usedguide].users[value_userid].scores).forEach((value_scorename) => {
                temp_scoreitem = {};
                temp_scoreitem["valuename"] = this.scoringevaluateservice.getothervalueofscoreitemsbyscorename(value_scorename, "description");
                temp_scoreitem["valuevalue"] = this.scoringevaluateservice.guideresults[this.usedguide].users[value_userid].scores[value_scorename] * 100;//value must be multiplied by 100 as progressbar has max value at 100
                temp_scoreitem["valuedescription"] = this.scoringevaluateservice.getothervalueofscoreitemsbyscorename(value_scorename, "description_long");
                temp_useritem['dialog_values'].push(temp_scoreitem);
            });
            this.swipecards.push(temp_useritem);
        });
        console.log("populatecards: there are " + String(temp_usercount) + "user(s).")
        console.log("populatecards: swipecards:",this.swipecards);
    }

    public registeraction(like) {
    }

    public checkiflastcard():void{
    }

    public like(like) {
        var self = this;
        if (this.swipecards.length > 0) {
            self.swipecards[this.cardCursor++].likeEvent.emit({ like });
            this.registeraction(like);
            // DO STUFF WITH YOUR CARD
        }
    }
    
    public onCardLike(event) {
        var item = this.swipecards[this.cardCursor++];
        this.registeraction(event.like);
        // DO STUFF WITH YOUR CARD
    }
      
    public onRelease(event) {
        this.cardLogs.push("onRelease(event)");
    }
    
    public onAbort(event) {
        this.cardLogs.push("onAbort(event)");
    }
    
    public onSwipe(event) {
        this.cardLogs.push("onSwipe(event)");
    }
    
    public scrollToBottom(el) {
    }


    public showprofiledialog(tempswipecard:any) {
        this.currentswipecard = tempswipecard;
        this.currentcaption = "Profil de " + this.currentswipecard.caption;
        this.dialog_values = tempswipecard.dialog_values;
        this.profiledialogvisible = true;
    }

    public switchprofiledialogvisibility(){
        this.profiledialogvisible = !this.profiledialogvisible;
    }

    public showvalueinformationgrowl(inputtext:string){
        console.log("show growl now: "+inputtext);
        this.valueinformation = [];
        this.valueinformation.push({severity:"info", summary:"", detail:inputtext})
    }
    
}