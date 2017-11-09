//Built-in
import { Component, OnInit } from '@angular/core';
//PrimeNG
import {ListboxModule} from 'primeng/primeng';
import {SelectItem} from 'primeng/primeng';

@Component({
    selector: 'app-temoinsearchbox',
    templateUrl: './temoinsearchbox.component.html',
    styleUrls: ['./temoinsearchbox.component.css']
})
export class TemoinsearchboxComponent implements OnInit {
        
    criteria: SelectItem[];
    
    selectedcriterion: string;
    
    public hidden : boolean = false;

    constructor() {
        this.criteria = [];
        this.criteria.push({label: 'Localisation', value: {id:'localisation', class:'mdi mdi-earth'}});
        this.criteria.push({label: 'Anciens métiers', value: {id:'anciensmetiers', class:'mdi mdi-debug-step-out'}});
        this.criteria.push({label: 'Métier actuel', value: {id:'metieractuel', class:'mdi mdi-debug-step-into'}});
        this.criteria.push({label: 'Compétences', value: {id:'competences', class:'mdi mdi-android-studio'}});
        this.criteria.push({label: 'Secteur', value: {id:'secteur', class:'mdi mdi-crosshairs'}});
    }
            
    ngOnInit() {
    }
}
