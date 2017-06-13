import { Component } from '@angular/core';
import { Title }     from '@angular/platform-browser';//This is the Title service

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    
    public constructor(private titleService: Title ) {
        this.titleService.setTitle('Lunchtime Version 1');//Sets title
     }
    

}

