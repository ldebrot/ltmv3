//Built-in stuff
import { Component, OnInit } from '@angular/core';

//home-grown pure-quality services
import { TitleService } from './../../../services/title.service';
import { NavigationService } from './../../../services/navigation.service';
import { BilanService } from './../../../services/bilan.service';

//PrimeNG
import { ProgressBarModule } from 'primeng/primeng';


@Component({
    selector: 'app-jeconsultemonbilan',
    templateUrl: './jeconsultemonbilan.component.html',
    styleUrls: ['./jeconsultemonbilan.component.css']
})
export class JeconsultemonbilanComponent implements OnInit {

    public beneficiaireurl:string = "assets/images/profilebeneficiaire_colored_50x50.png";
    public temoinurl:string = "assets/images/profiletemoin_colored_50x50.png";
    public currentmodule:string = "";

    constructor(
        public titleservice : TitleService,//used to set corresponding title
        public navigationservice : NavigationService,//used to find items of jefaislepoint
        public bilanservice : BilanService//this one prepares the elements of the situation recap (bilan)
    ) {
        
    }
    
    public activatemodule(etape):void{
        console.log("etape");
        console.log(etape);
        if (this.currentmodule===etape){
            this.currentmodule="";
        }else{
            this.currentmodule=etape;
        }
        console.log("this.currentmodule");
        console.log(this.currentmodule);        
    }

    ngOnInit() {
        this.titleservice.titlesubject.next("Je consulte mon bilan");//sets title in title service to "Je consulte mon bilan" after half a second        
        this.bilanservice.assesslevel();
    }
    
}
