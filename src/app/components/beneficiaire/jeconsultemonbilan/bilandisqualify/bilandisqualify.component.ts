import { BilanService } from './../../../../services/bilan.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-bilandisqualify',
    templateUrl: './bilandisqualify.component.html',
    styleUrls: ['./bilandisqualify.component.css']
})
export class BilandisqualifyComponent implements OnInit {
    
    constructor(
        public bilanservice : BilanService
    ) { }
    
    ngOnInit() {
    }
    
}
