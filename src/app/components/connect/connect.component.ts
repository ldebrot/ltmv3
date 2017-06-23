import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
    
    //XXXX this is a fake verification of the connection status --> to be replaced by an actual cross-component service
    private userConnected: boolean=false; 

    constructor() { }
    
    ngOnInit() {
    }
    
}
