import { Component, OnInit, Injectable } from '@angular/core';
import { QuizzService } from "app/services/quizz.service";

@Injectable()
@Component({
    selector: 'app-cs-multiplechoice',
    templateUrl: './cs-multiplechoice.component.html',
    styleUrls: ['./cs-multiplechoice.component.css']
})
export class CsMultiplechoiceComponent implements OnInit {

    public buttonitems : any[] = [];

    public populatebuttonitems () {
        /*        this.buttonitems = [];
        for (let i = 0; i < this.quizzservice.currentcardobject.options.length; i++) {
            this.buttonitems.push(this.quizzservice.currentcardobject.options[i]);
        }
*/
    }

    constructor(
        private quizzservice : QuizzService
    ) {
    }
    
    ngOnInit() {
        this.populatebuttonitems();
    }
    
}
