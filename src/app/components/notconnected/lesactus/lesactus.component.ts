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
    
    public ffbplaypush(form: NgForm):void {
        let ref:any = form.value.ffbplayref;
        let child:any = form.value.ffbplaychild;
        let value:any = form.value.ffbplayvalue;
        console.log("ref:" + ref);
        console.log("value:");
        console.log(JSON.parse(JSON.stringify(value)));
        let listreference = firebase.database().ref(ref);
        let newref = listreference.push();
        newref.set(JSON.parse(JSON.stringify(value)))
        .then( function() {
                console.log("worked just fine!");
        })
        .catch( function(error) {
                console.log("playground error: "+error.message);
        });
    }

    public ffbplayset(form: NgForm):void {
        let ref:any = form.value.ffbplayref;
        let child:any = form.value.ffbplaychild;
        let value:any = form.value.ffbplayvalue;
        console.log("ref:" + ref);
        console.log("value:");
        console.log(JSON.parse(JSON.stringify(value)));
        firebase.database().ref(ref).set(JSON.parse(JSON.stringify(value)))
        .then( function() {
                console.log("worked just fine!");
        })
        .catch( function(error) {
                console.log("playground error: "+error.message);
        });
    }

    public ffbplaytryme(form: NgForm):void {
        let ref:any = form.value.ffbplayref;
        let child:any = form.value.ffbplaychild;
        let value:any = form.value.ffbplayvalue;

        console.log("ref:" + ref);
        console.log("value:");
        console.log(JSON.parse(JSON.stringify(value)));
        
        let ref1 = ref + "/number1";
        let ref2 = ref + "/number2";
        let updates = {};
        updates[ref1] = JSON.parse(JSON.stringify(value));
        updates[ref2] = JSON.parse(JSON.stringify(value));

        firebase.database().ref().update(updates)
        .then( function() {
                console.log("worked just fine!");
        })
        .catch( function(error) {
                console.log("playground error: "+error.message);
        });
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
