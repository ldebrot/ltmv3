import { ldbmenuitem } from '../../services/ldbmenuitem.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-menubeneficiaire',
    templateUrl: './menubeneficiaire.component.html',
    styleUrls: ['./menubeneficiaire.component.css']
})
export class MenuBeneficiaireComponent implements OnInit {

    public menuitemwidth:number=180;//this is the width of each menu element

    public scrollingobject;//this variable holds the element to be scrolled (instead of accessing the DOM directly)
    public clickobject;//this is the object the user has clicked on

    private scrollinginterval;//this is the scrolling interval element for the SetInterval method
    private scrollingintervaltime:number=1000;//this is how long the interval waits before checking whether scroll has ended
    private scrollingintervalset:boolean = false;//has a scrollinginterval been set (to check whether scroll has ended?)

    private positioninginterval;//this is the positioning interval element
    private positioningintervalset:boolean = false;//has the positining interval been set?
    private positioningintervaldistance:number=50;//minimal distance between scrollpos and destination above which full speed is applied
    private positioningintervaltimemin:number=1;//This is the shortest interval, applied at full speed
    private positioningintervaltimemax:number=30;//This is the longest interval, applied at lowest speed
    private positioningintervalmove:number=3;//This is how many pixels the scroll elements moves at each interval

    private destinationpos:number=0;//this is the destinationpos
    private destinationclickpos:number=0;//this is the destinationpos which originates from a click

    private autopositioningtoggle:boolean=true;//is autoset on or off?

    public logourl:string = "assets/images/lunchtime-logo-60x60.png";

    menuitems: ldbmenuitem[] = [
    new ldbmenuitem('Je découvre Lunchtime', 1, ''),
    new ldbmenuitem('Qui sommes-nous ?', 2, ''),
    new ldbmenuitem('Les actus Lunchtime', 3, ''),
    new ldbmenuitem('Se connecter', 4, ''),
    ];
        
    constructor() {
    }
    
    public intervalhits(): void {//this is when the interval to check whether scrolling has ended hits (hence, when the scrolling has ended)
        this.scrollingintervalset = false;
        this.destinationpos = (this.determineclosestpos() * this.menuitemwidth);//set destinationpos
        this.positioningintervalexecute();
    }

    public setposition(event:any):void {
        this.clickobject = event.target;
        this.scrollingobject = this.clickobject.parentElement.parentElement.parentElement;//in this case, the scrolled element is the great-great-parent of the item-texts
        this.autopositioningtoggle = false;
        this.positioningintervalexecute();
    }

    public nextposition(event:any):void {
        this.clickobject = event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[0];
        this.scrollingobject = event.target.parentElement.parentElement.parentElement.children[1].children[0];//in this case, the scrolled element is the great-great-parent of the item-texts
        this.autopositioningtoggle = false;
        this.positioningintervalexecute();
    }

    public determineclosestpos(): number {//this method returns the closest position (0,1,etc.)
        //console.log("scrollpos: "+this.scrollitem.scrollLeft);
        //console.log("scrollpos - half: "+(this.scrollingobject.scrollLeft - (this.menuitemwidth / 2)));
        //console.log("Menuitem: "+ Math.ceil(((this.scrollingobject.scrollLeft - (this.menuitemwidth / 2)))/this.menuitemwidth));
        return ( Math.ceil(((this.scrollingobject.scrollLeft - (this.menuitemwidth / 2)))/this.menuitemwidth));
    }

    public positioningintervalexecute():void {
        //Check if 

        if (!this.autopositioningtoggle){
            this.destinationpos = this.menuitemwidth*2;
            if(this.clickobject.parentElement.parentElement.children[1].children[0].id == this.clickobject.id){
                this.destinationpos = this.menuitemwidth;
            }
            if(this.clickobject.parentElement.parentElement.children[0].children[0].id == this.clickobject.id){
                this.destinationpos = 0;
                this.autopositioningtoggle = true;
            }
        }

        //console.log("sL:"+this.scrollingobject.scrollLeft+"dpos:"+this.destinationpos+"ivm:"+this.positioningintervalmove)

        //Check if object has arrived within reach of move distance (whether it should stop or keep being moved)
        if (Math.abs(this.scrollingobject.scrollLeft-this.destinationpos)>=this.positioningintervalmove){

            //Move the scroll object
            let temp_direction = ((this.scrollingobject.scrollLeft-this.destinationpos)/Math.abs(this.scrollingobject.scrollLeft-this.destinationpos));
            let temp_move = temp_direction * this.positioningintervalmove;
            this.scrollingobject.scrollLeft = this.scrollingobject.scrollLeft - temp_move;
            //console.log("temp_direction: "+temp_direction);

            //Determine time laps until the next 
            let temp_time:number;
            let temp_ratio:number;
            if((Math.abs(this.scrollingobject.scrollLeft-this.destinationpos))>this.positioningintervaldistance) {
                temp_time = this.positioningintervaltimemin;
            } else {
                temp_ratio = (1-(Math.pow(Math.abs(this.scrollingobject.scrollLeft-this.destinationpos)/this.positioningintervaldistance,2)));
                temp_time = temp_ratio * this.positioningintervaltimemax;
                temp_move = Math.ceil(temp_ratio*temp_move);    
            }

            //console.log("DistanceToPos: "+Math.abs(this.scrollingobject.scrollLeft-this.destinationpos));
            //console.log("DestinationPos: "+this.destinationpos);
            //console.log("scrollLeft: "+this.scrollingobject.scrollLeft);
            //console.log("Temp_ratio: "+temp_ratio);
            //console.log("Temp_time: "+temp_time);

            this.positioninginterval = setTimeout(() => { this.positioningintervalexecute(); }, temp_time);        
        }

    }

    public autoposition(event:any): void {//this method is constantly executed during scrolling events

        if(this.autopositioningtoggle){

            this.scrollinginterval = setTimeout(() => { this.intervalhits(); }, this.scrollingintervaltime);
            this.scrollingintervalset = true;

            this.scrollingobject = event.target;//this designates which element is actually being scrolled

        }

        if(event.target.scrollLeft >= this.menuitemwidth){
            this.menuitems.push(this.menuitems[0]);
            this.menuitems.splice(0,1);
            event.target.scrollLeft=0;
        }

        if(event.target.scrollLeft > this.menuitemwidth){
        }
    
    }
    
    ngOnInit() {
    }
    
    
}
