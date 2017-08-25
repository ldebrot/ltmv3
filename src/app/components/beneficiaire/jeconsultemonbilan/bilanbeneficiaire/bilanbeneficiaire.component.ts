//Built-in
import { Component, OnInit } from '@angular/core';

//Hand-made
import { BilanService } from './../../../../services/bilan.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';

@Component({
    selector: 'app-bilanbeneficiaire',
    templateUrl: './bilanbeneficiaire.component.html',
    styleUrls: ['./bilanbeneficiaire.component.css']
})
export class BilanbeneficiaireComponent implements OnInit {

    public beneficiaireurl:string = "assets/images/profilebeneficiaire_colored_50x50.png";

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public bilanservice : BilanService        
    ) { }
    
    ngOnInit() {
        this.bilanservice.setbilan_currentitem('allmodules','beneficiaire');
    }
    
}
