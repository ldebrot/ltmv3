//Built-in
import { Component, OnInit } from '@angular/core';

//Hand-made
import { BilanService } from './../../../../services/bilan.service';
import { DbuserinfoService } from './../../../../services/dbuserinfo.service';

@Component({
    selector: 'app-bilantemoin',
    templateUrl: './bilantemoin.component.html',
    styleUrls: ['./bilantemoin.component.css']
})
export class BilantemoinComponent implements OnInit {

    public temoinurl:string = "assets/images/profiletemoin_colored_50x50.png";

    constructor(
        public dbuserinfoservice: DbuserinfoService,
        public bilanservice : BilanService        
    ) { }
    
    ngOnInit() {
        this.bilanservice.setbilan_currentitem('allmodules','temoin');
    }
    
}
