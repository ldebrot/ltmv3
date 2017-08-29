import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy, ViewChildren, ElementRef,Renderer2  } from '@angular/core';

//Hand-made services
import { TitleService } from './../../services/title.service';
import { ldbmenuitem } from '../../services/ldbmenuitem.model';

@Component({
    selector: 'app-menubeneficiaire',
    templateUrl: './menubeneficiaire.component.html',
    styleUrls: ['./menubeneficiaire.component.css']
})
export class MenuBeneficiaireComponent implements OnInit, OnDestroy {

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

    private itemtextobjects:any;
    private itemtextobject:any;
    private titleservicesubscription : any;


    constructor(
        private rd: Renderer2,
        private titleservice: TitleService,
        private myrouter : Router
    ) {
    }

    //IMPORTANT STUFF HERE: THIS DEFINES MENU STRUCTURE AND CORRESPONDING REROUTING:
    menuitems : any = [
    new ldbmenuitem('Mon planning', 1, '','/beneficiaire/monplanning'),
    new ldbmenuitem('Je fais le point', 2, '','/beneficiaire/jefaislepoint'),
    new ldbmenuitem('Je consulte mon bilan', 3, '','/beneficiaire/jeconsultemonbilan'),
    new ldbmenuitem('Je prends rendez-vous', 4, '','/beneficiaire/jeprendsrendezvous'),
    new ldbmenuitem('Je prépare ma rencontre', 5, '','/beneficiaire/jepreparemarencontre'),
    new ldbmenuitem('Je fais le suivi', 6, '','/beneficiaire/jefaislesuivi'),
    new ldbmenuitem('Je deviens un pro', 7, '','/beneficiaire/jedeviensunpro')
    ];

    @ViewChildren('itemtexts') el:ElementRef;

    ngAfterViewInit() {
    }
   

    public intervalhits(): void {//this is when the interval to check whether scrolling has ended hits (hence, when the scrolling has ended)
        this.scrollingintervalset = false;
        this.destinationpos = (this.determineclosestpos() * this.menuitemwidth);//set destinationpos
        this.positioningintervalexecute();
    }

    //this function sets position by using the title of the destination
    public setpositionwithtitle(title:string):void{
        this.itemtextobjects = this.el;
        this.itemtextobject = this.itemtextobjects._results.filter(function(element){
            //console.log("'"+element.nativeElement.innerText.trim()+"'");
            if (element.nativeElement.innerText.trim()==title) {
                return element.nativeElement;
            }
        });
        this.itemtextobject=this.itemtextobject[0].nativeElement;
        this.setpositionwithtarget(this.itemtextobject);
    }

    //This function passes on right target, which is the next available menu item. It is used when the user clicks on the right arrow
    public setpositiontonextitem(event:any):void {
        let newtarget:any = event.target.parentElement.parentElement.parentElement.children[1].children[0].children[0].children[1].children[0];
        this.reroutewithtarget(newtarget);
        this.setpositionwithtarget(newtarget);
    }

    //This function is triggered when the user clicks on a menuitem. It passes the target on.
    public setpositiontoclickedtarget(event:any):void {
        this.reroutewithtarget(event.target);
        this.setpositionwithtarget(event.target);
    }

    //this function sets position by receiving a the target object
    public setpositionwithtarget(target:any):void {
        this.clickobject = target;
        this.scrollingobject = this.clickobject.parentElement.parentElement.parentElement;//in this case, the scrolled element is the great-great-parent of the item-texts
        this.autopositioningtoggle = false;
        this.positioningintervalexecute();
    }

    public reroutewithtarget(target:any):void {
        let newtitle:string = target.innerText.trim();//gets new title from target object
        for (let i=0; i < this.menuitems.length;i++) {
            //console.log(this.menuitems[i].title +"vs"+ newtitle);
            if (this.menuitems[i].title === newtitle) {//checks which route corresponds to new title
                //console.log("found right title!");
                //console.log("this.menuitems[i].route: " + this.menuitems[i].route);
                this.myrouter.navigate([this.menuitems[i].route]);//reroutes to route
            }
        }        
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
        this.titleservicesubscription = this.titleservice.titlesubject.subscribe( (value) => {
            this.setpositionwithtitle(value);
        });
    }

    ngOnDestroy() {
        this.titleservicesubscription.unsubscribe();
    }
    
    
}
