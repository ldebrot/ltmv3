//Built-in
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//PrimeNG

//Home-grown:

@Component({
    selector: 'app-jetrouvemontemoin',
    templateUrl: './jetrouvemontemoin.component.html',
    styleUrls: ['./jetrouvemontemoin.component.css']
})
export class JetrouvemontemoinComponent implements OnInit {
    
    constructor(
        public activatedroute:ActivatedRoute
    ) { }
    
    ngOnInit() {
        if (this.activatedroute.snapshot.params['userid']!==undefined) {
            if (this.activatedroute.snapshot.params['userid'].toString()!==""){
                //do something with the userid here
            }
        }
    }
    
    
   
}
