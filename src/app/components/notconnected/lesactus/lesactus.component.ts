//built-in services
import { NgForm } from '@angular/forms/forms';
import { Component, OnInit } from '@angular/core';

//Home-grown man-made services
import { ReadwriteService } from './../../../services/readwrite.service';
import { DbuserinfoService } from './../../../services/dbuserinfo.service';

//Firebase service
import * as firebase from 'firebase';


@Component({
    selector: 'app-lesactus',
    templateUrl: './lesactus.component.html',
    styleUrls: ['./lesactus.component.css']
})
export class LesactusComponent implements OnInit {
    
    constructor(
        private readwriteservice:ReadwriteService,
        private dbuserinfoservice:DbuserinfoService
    ) { }
    
    public ffbplaywrite(form: NgForm):void {
        this.readwriteservice.getcurrentuserinfo()
        .then((currentuserinfo) => {
            console.log("currentuserinfo:");
            console.log(currentuserinfo);
            this.dbuserinfoservice.integrate(currentuserinfo);
        });
        

/*
        let ref:any = form.value.ffbplayref;
        let child:any = form.value.ffbplaychild;
        let value:any = form.value.ffbplayvalue;
        console.log("ref:" + ref);
        console.log("value:");
        console.log(JSON.parse(value));
        firebase.database().ref(ref).set(JSON.parse(value))
        .then( function() {
                console.log("worked just fine!");
        })
        .catch( function(error) {
                console.log("playground error: "+error.message);
        });
*/
    }

    public ffbplayread(form: NgForm):void {
        let ref:any = form.value.ffbplayref;
        let child:any = form.value.ffbplaychild;
        let value:any = form.value.ffbplayvalue;
        console.log("ref:" + ref);
        console.log("child:" + child);
        console.log("value:" + value);
        firebase.database().ref(ref).once('value')
        .then(function(snapshot) {
            
            if (child !== "") {
                console.log("get child...");
                console.log(snapshot.child(child).val());
            } else {
                console.log("get snapshot without the kids...");
                console.log(snapshot.val());
            }
        })
        .catch(function(error) {
            console.log("playground error: "+error.message);
        });
    }

    ngOnInit() {
    }
    
}
