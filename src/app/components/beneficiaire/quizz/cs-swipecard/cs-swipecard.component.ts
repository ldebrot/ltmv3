
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

@Component({
    selector: 'app-cs-swipecard',
    templateUrl: './cs-swipecard.component.html',
    styleUrls: ['./cs-swipecard.component.css']
})
@NgModule({
    imports: [BrowserModule, FormsModule, SwipeCardsModule],
    declarations: [CsSwipecardComponent],
    bootstrap: [CsSwipecardComponent]
})
export class CsSwipecardComponent implements OnInit {
    
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

    ngOnInit() {
    }
    
    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService
    ) {
        this.quizzservice.setcheckbutton(false);//set start value of check button to false
        this.populatecards();
    }
    
    public populatecards() {
        this.maxselected = (this.quizzservice.currentcardobject.parameters.maxselected == null) ? this.quizzservice.currentcardobject.parameters.options.length : this.quizzservice.currentcardobject.parameters.maxselected;
        this.minselected = (this.quizzservice.currentcardobject.parameters.minselected == null) ? 0 : this.quizzservice.currentcardobject.parameters.minselected;
        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++){
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.swipecards.push({
                id: i + 1,
                likeEvent: new EventEmitter(),
                destroyEvent: new EventEmitter(),
                caption:  this.quizzservice.currentcardobject["option"+String(temp_optionid)].caption,
                backgroundclass: this.quizzservice.currentcardobject["option"+String(temp_optionid)].backgroundclass,
                iconcontainerclass: this.quizzservice.currentcardobject["option"+String(temp_optionid)].iconcontainerclass,
                iconclass:this.quizzservice.currentcardobject["option"+String(temp_optionid)].iconclass
            });
            //console.log("i"+String(i));
        }
        for (var i = 0; i < 5; i++) {
            //console.log(i+" : "+this.swipecards[i])
        }
    }

    public registeraction(like) {
        if (this.countselected < this.maxselected) {
            this.checkiflastcard();
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[this.cardCursor - 1];//because cardCursor is always one ahead!!
            //console.log("temp_optionid");
            //console.log(temp_optionid);
            //console.log("like");
            //console.log(like);
            if (like == true) {
                this.countselected++;
            }
            let button_id = String(this.quizzservice.currentquizzid) + "-" + String(this.quizzservice.currentcardid) +"-" + String(temp_optionid);
            this.readwritebufferservice.updatebuffer(button_id,like,"update");
        }
}

    public checkiflastcard():void{
        if (this.countselected >= this.maxselected) {
            setTimeout(()=>{
                this.quizzservice.gotonextcard();//it's the last swipecard so let's move on to the next card in the quizz
            },1000);
    }else{
            if (this.cardCursor == this.swipecards.length){
                console.log("reached end of swipecard set");
                this.swipecardbuttoncontainerhidden = true;
                setTimeout(()=>{
                    this.quizzservice.gotonextcard();//it's the last swipecard so let's move on to the next card in the quizz
                },1000);
            }    
        }
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
}
