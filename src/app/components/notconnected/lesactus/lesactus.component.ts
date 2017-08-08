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
