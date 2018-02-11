import { Component, OnInit } from '@angular/core';
import {SidebarModule} from 'primeng/sidebar';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
    
    public display : boolean = false;

    constructor() { }
    
    ngOnInit() {
    }
    
}
