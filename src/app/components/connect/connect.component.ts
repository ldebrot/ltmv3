//Built-in
import { Component, OnInit } from '@angular/core';
//Home-made
import { AuthService } from './../../auth/auth.service';


@Component({
    selector: 'app-connect',
    templateUrl: './connect.component.html',
    styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
    
    constructor(
        private authService: AuthService
        ) { }
    
    ngOnInit() {
    }
    
}
