//built-in services
import { NgForm } from '@angular/forms/forms';
import { Component, OnInit } from '@angular/core';

//Firebase service
import * as firebase from 'firebase';


@Component({
    selector: 'app-lesactus',
    templateUrl: './lesactus.component.html',
    styleUrls: ['./lesactus.component.css']
})
export class LesactusComponent implements OnInit {
    
    constructor() { }
    
    public ffbplaywrite(form: NgForm):void {
    /*
        firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
        var username = snapshot.val().username;
        // ...
        });    
    */
    }

    public ffbplayread(form: NgForm):void {
        let ref:any = form.value.ffbplayref;
        let value:any = form.value.ffbplayvalue;
        console.log("ref:" + ref);
        console.log("value:" + value);
        firebase.database().ref(ref).once('value').then(function(snapshot) {
            console.log(snapshot.val().skillname);
        });
    }

    ngOnInit() {
    }
    
}
