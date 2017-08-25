//Built-in
import { Component, OnInit } from '@angular/core';

//Hand-made
import { BilanService } from './../../../../services/bilan.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';

@Component({
    selector: 'app-bilanratio',
    templateUrl: './bilanratio.component.html',
    styleUrls: ['./bilanratio.component.css']
})
export class BilanratioComponent implements OnInit {
    
    public temoingrayurl:string = "assets/images/profiletemoin_gray_50x50.png";
    public beneficiairegrayurl:string = "assets/images/profilebeneficiaire_gray_50x50.png";
    
    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public bilanservice : BilanService        
    ) { }
    
    ngOnInit() {
        this.bilanservice.setbilan_currentitem('allmodules','ratio');
    }
    
}
