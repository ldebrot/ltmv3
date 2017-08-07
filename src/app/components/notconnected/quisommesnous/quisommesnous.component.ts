//built-in services
import { Component, OnInit } from '@angular/core';
//hand-made services
import { TitleService } from './../../../services/title.service';//makes sure menu adapts to active route


@Component({
  selector: 'app-quisommesnous',
  templateUrl: './quisommesnous.component.html',
  styleUrls: ['./quisommesnous.component.css']
})
export class QuisommesnousComponent implements OnInit {

  constructor(    
    private titleservice: TitleService,    
    ) {
        setTimeout(function (){titleservice.titlesubject.next("Qui sommes-nous ?");},500);//sets title in title service to "Qui sommes-nous" after half a second
    }

  ngOnInit() {
  }

}
