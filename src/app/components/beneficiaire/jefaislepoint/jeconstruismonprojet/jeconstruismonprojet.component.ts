import { Component, OnInit } from '@angular/core';

//PrimeNG
import {ProgressBarModule,CheckboxModule} from 'primeng/primeng';

//Home-grown:
import { NavigationService } from './../../../../services/navigation.service';

@Component({
    selector: 'app-jeconstruismonprojet',
    templateUrl: './jeconstruismonprojet.component.html',
    styleUrls: ['./jeconstruismonprojet.component.css']
})
export class JeconstruismonprojetComponent implements OnInit {
    
    public selectedValues:string;

    constructor(
        private navigationservice: NavigationService,
        privavte 
    ) { }

    ngOnInit() {
    }
    
}
