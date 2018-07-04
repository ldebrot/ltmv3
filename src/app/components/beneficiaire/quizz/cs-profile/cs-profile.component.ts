//hand-made services
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from 'app/services/quizz.service';

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

    ngOnInit() {
        this.definewidth_and_height()
    }

    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService
    ) {
        this.quizzservice.setcheckbutton(false);//set start value of check button to false
        this.populatecards();
    }

    public definewidth_and_height(){
        this.automaticwidth = (window.innerWidth * 0.9);
        this.automaticheight = this.automaticwidth;
    }
    
    public populatecards() {
        this.swipecards.push({
            id: 1,
            likeEvent: new EventEmitter(),
            destroyEvent: new EventEmitter(),
            caption:"Marie",
            image:"assets/images/mariemugler.jpg",
            backgroundclass: "profile_swipecard profile_cardbackground",
            iconcontainerclass: "iconcontainer",
            iconclass:"mdi mdi-factory gradientnew5 swipecardicon",
            dialog_values : [
                {
                    valuename : "First value",
                    valuedescription : "This is the first value. It means this and that but also whatever.",
                    valuevalue : 50,
                },
                {
                    valuename : "Second value",
                    valuedescription : "This is the first value. It means this and that but also whatever.",
                    valuevalue : 20,
                }
            ]

    });
        this.swipecards.push({
            id: 2,
            likeEvent: new EventEmitter(),
            destroyEvent: new EventEmitter(),
            caption:"Lucien",
            image:"assets/images/man1.png",
            backgroundclass: "profile_swipecard profile_cardbackground",
            iconcontainerclass: "iconcontainer",
            iconclass:"mdi mdi-factory gradientnew5 swipecardicon",
            dialog_values : [
                {
                    valuename : "First value",
                    valuevalue : 80,
                },
                {
                    valuename : "Second value",
                    valuevalue : 33,
                }
            ]
        });
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