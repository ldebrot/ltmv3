import { Component, ViewEncapsulation, ViewChild, TemplateRef, EventEmitter, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SwipeCardsModule } from 'ng2-swipe-cards';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
@NgModule({
    imports: [BrowserModule, FormsModule, SwipeCardsModule],
    declarations: [TestComponent],
    bootstrap: [TestComponent]
})
export class TestComponent {
       

//SWIPECARD MANAGEMENT
    @ViewChild('cardLog') cardLogContainer: any;
    @ViewChild('tinderCardLog') tinderCardLogContainer: any;

    cards: any[] = [];
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
    tinderCardLogs: any = [];


    constructor() {
        for (var i = 0; i < 5; i++) {
            this.cards.push({
                id: i + 1,
                likeEvent: new EventEmitter(),
                destroyEvent: new EventEmitter(),
                url: this.getKittenUrl()
            });
            console.log(i+" : "+this.cards[i])
        }
    }

    public like(like) {
        var self = this;
        if (this.cards.length > 0) {
            self.cards[this.cardCursor++].likeEvent.emit({ like });
            // DO STUFF WITH YOUR CARD
            this.tinderCardLogs.push("callLike(" + JSON.stringify({ like }) + ")");
//            this.scrollToBottom(this.tinderCardLogContainer);
        }
    }

    public onCardLike(event) {
        var item = this.cards[this.cardCursor++];
        // DO STUFF WITH YOUR CARD
        this.tinderCardLogs.push("onLike(" + JSON.stringify(event) + ")");
//        this.scrollToBottom(this.tinderCardLogContainer);
    }

    public getKittenUrl() {
        var w = 500 - Math.floor((Math.random() * 100) + 1);
        var h = 500 - Math.floor((Math.random() * 100) + 1);
        return "http://placekitten.com/" + w + "/" + h;
    }

    public onRelease(event) {
        this.cardLogs.push("onRelease(event)");
//        this.scrollToBottom(this.tinderCardLogContainer);
}

    public onAbort(event) {
        this.cardLogs.push("onAbort(event)");
//        this.scrollToBottom(this.tinderCardLogContainer);
    }

    public onSwipe(event) {
        this.cardLogs.push("onSwipe(event)");
//        this.scrollToBottom(this.tinderCardLogContainer);
    }

    public scrollToBottom(el) {

        /*
        setTimeout(() => {
            el.nativeElement.scrollTop = el.nativeElement.scrollHeight;
        }, 100);
*/
    }

}
/*

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent {
}
*/
