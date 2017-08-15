//The regular stuff
import { Component, OnInit } from '@angular/core';

//import Services
import { DbuserinfoService } from './../../../services/dbuserinfo.service';
import { FakedbuserinfoService } from './../../../services/fakedbuserinfo.service';
import { NavigationService } from './../../../services/navigation.service';
import { TitleService } from './../../../services/title.service';

@Component({
    selector: 'app-monplanning',
    templateUrl: './monplanning.component.html',
    styleUrls: ['./monplanning.component.css']
})
export class MonplanningComponent implements OnInit {

    constructor(
        private dbuserinfoservice : DbuserinfoService,
        private fakedbuserinfoservice : FakedbuserinfoService,
        private navigationservice : NavigationService,
        private titleservice:TitleService
    ) { 
        this.titleservice.titlesubject.next("Mon planning");//sets title in title service to "Mon planning" after half a second
    }

    ngOnInit() {
        //TEMPORARY FAKELOGIN FOR OFFLINE WORK
        //this.fakedbuserinfoservice.fillinfakeuserinfo();
        this.navigationservice.preparemonplanningitems();//sets up the list of button in the monplanning menu.
        this.navigationservice.setnexttask();//sets the next important task, also shown in the mon planning menu.
    }
    


}
