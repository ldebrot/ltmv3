import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from 'app/services/quizz.service';
import { Component, OnInit, IterableDiffers } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs'
import { checkbuttontooltipmodel } from '../../../../services/checkbuttontooltipmodel.model';

@Component({
    selector: 'app-cs-orderregular',
    templateUrl: './cs-orderregular.component.html',
    styleUrls: ['./cs-orderregular.component.css']
})
export class CsOrderregularComponent implements OnInit {

    public buttonclassbasic : String = "csorderregular_buttonitem";
    public buttonitems : any[] = [];//holds button options, but stored according to position (not id!)
    public button_value : any = {};//holds values of each button, uses option id (not position!)
    public button_class : any = {};//holds classes of each button, uses option id (not position!)
    iterableDiffer : any;

    constructor(
        private quizzservice : QuizzService,
        private readwritebufferservice : ReadwritebufferService,
        private _iterableDiffers : IterableDiffers
    ) { 
        this.iterableDiffer = this._iterableDiffers.find([]).create(null);
    }
    
    ngOnInit() {
        this.populatebuttonitems();
        this.setupbuttonservice();
        this.quizzservice.setcheckbutton(true);
        let temp_instructions = new checkbuttontooltipmodel ("Clique ici quand tu as réarrangé les éléments",4000,8000);
        setTimeout(()=>{this.quizzservice.setcheckbuttontt(temp_instructions)});
    }

    ngDoCheck() {
        let changes = this.iterableDiffer.diff(this.buttonitems);
        if (changes) {
            this.updaterwbuffer();
        }
    }
    
    public populatebuttonitems () {
        this.buttonitems = [];
        let temp_itemnumbersequence = this.quizzservice.currentcardobject.parameters.options;
        //shuffle is said so in parameters
        if (this.quizzservice.currentcardobject.parameters.csorderregularshuffle===true){
            temp_itemnumbersequence = this.givemerandomizednumbers(temp_itemnumbersequence);
        }

        for (let i = 0; i < this.quizzservice.currentcardobject.parameters.options.length; i++) {
            let temp_optionid = this.quizzservice.currentcardobject.parameters.options[i];
            this.buttonitems.push(this.quizzservice.currentcardobject["option"+String(temp_optionid)]);
        }
    }

    public givemerandomizednumbers (numberarray:any) : any {
        let temp_currentindex = numberarray.length
        let temp_value;
        let temp_randomindex;
        
        // While there remain elements to shuffle...
        while (0 !== temp_currentindex) {
        
            // Pick a remaining element...
            temp_randomindex = Math.floor(Math.random() * temp_currentindex);
            temp_currentindex -= 1;
        
            // And swap it with the current element.
            temp_value = numberarray[temp_currentindex];
            numberarray[temp_currentindex] = numberarray[temp_randomindex];
            numberarray[temp_randomindex] = temp_value;
        }
        
        return numberarray;
    }

    public updaterwbuffer():void{
        let temp_length = this.buttonitems.length;
        for (let i = 0; i < temp_length; i++ ){
            let temp_button_id = this.buttonitems[i].id;
            let temp_button_value = i;//value passed on is in fact the position within the buttonitem array
            let temp_option_id = String(this.quizzservice.currentquizzid) + "-" + String(this.quizzservice.currentcardid) +"-" + String(temp_button_id);
            this.readwritebufferservice.updatebuffer(temp_option_id,temp_button_value,"update");            
        }
    }

    public setupbuttonservice () {
        for (let i = 0; i < this.buttonitems.length; i++) {
            let temp_optionid = this.buttonitems[i].id;
            this.button_value[temp_optionid]=this.quizzservice.currentcardobject["option"+String(temp_optionid)].optionvalue;
            this.button_class[temp_optionid]=this.quizzservice.currentcardobject["option"+String(temp_optionid)].basicclass + " " + this.buttonclassbasic;          
        }
    }

}
