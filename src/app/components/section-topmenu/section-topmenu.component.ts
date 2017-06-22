import { ldbmenuitem } from './ldbmenuitem.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-section-topmenu',
    templateUrl: './section-topmenu.component.html',
    styleUrls: ['./section-topmenu.component.css']
})
export class SectionTopmenuComponent implements OnInit {

    public menuitemwidth:number=150;//this is the width of each menu element

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

    menuitems: ldbmenuitem[] = [
    new ldbmenuitem('Moi et la reconversion', 1, ''),
    new ldbmenuitem('Je m\'inspire d\'autrui', 2, ''),
    new ldbmenuitem('Je valorise ma reconversion', 3, ''),
    new ldbmenuitem('Je rencontre un mentor/é', 4, ''),
    new ldbmenuitem('Je découvre la communauté', 5, '')
    ];
        
    constructor() {
    }
    
    public tagueule(): void {//this happens when you click the right arrow
        alert("Ta gueule!");
    }

    public intervalhits(): void {//this is when the interval to check whether scrolling has ended hits (hence, when the scrolling has ended)
        clearInterval(this.scrollinginterval);
        this.scrollingintervalset = false;
        this.destinationpos = (this.determineclosestpos() * this.menuitemwidth);//set destinationpos
        this.positioningintervalexecute();
    }

    public setposition(event:any):void {
        this.clickobject = event.target;
        this.scrollingobject = event.target.parentElement.parentElement.parentElement;//in this case, the scrolled element is the great-great-parent of the item-texts
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
        clearInterval(this.positioninginterval);

        if (!this.autopositioningtoggle){
            this.destinationpos = this.menuitemwidth*2;
            if(this.clickobject.parentElement.parentElement.children[1].children[0].id == this.clickobject.id){
                this.destinationpos = 150;
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

            this.positioninginterval = setInterval(() => { this.positioningintervalexecute(); }, temp_time);        
        }

    }

    public autoposition(event:any): void {//this method is constantly executed during scrolling events

        if(this.autopositioningtoggle){

            if(this.scrollingintervalset) {
                clearInterval(this.scrollinginterval);
            }
            if(this.positioningintervalset) {//in case the scroll element is currently being positioned, the automatic positioning has to be stopped
                clearInterval(this.positioninginterval);
            }

            this.scrollinginterval = setInterval(() => { this.intervalhits(); }, this.scrollingintervaltime);
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
