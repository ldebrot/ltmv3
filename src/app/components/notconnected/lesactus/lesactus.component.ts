//built-in services
import { NgForm } from '@angular/forms/forms';
import { Component, OnInit } from '@angular/core';

//Home-grown man-made services
import { ReadwriteService } from './../../../services/readwrite.service';
import { DbuserinfoService } from './../../../services/dbuserinfo.service';

@Component({
    selector: 'app-lesactus',
    templateUrl: './lesactus.component.html',
    styleUrls: ['./lesactus.component.css']
})
export class LesactusComponent implements OnInit {
    
    constructor(
        private readwriteservice:ReadwriteService,
        private dbuserinfoservice:DbuserinfoService
    ) { 
    }
  
    ngOnInit() {
    }
    
}
