import { DbuserinfoService } from './dbuserinfo.service';
import { ReadwriteService } from './readwrite.service';
import { FirebaseauthService } from 'app/services/firebaseauth.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable()
export class ConnectService implements OnDestroy{
    
    public firebaseitemsubscription:Subscription;


    constructor(
        private firebaseauthservice : FirebaseauthService,
        private readwriteservice : ReadwriteService,
        private dbuserinfoservice : DbuserinfoService
    ) { }
    
    ngOnDestroy() {
        if (this.firebaseitemsubscription!==undefined){
            this.firebaseitemsubscription.unsubscribe();
        }
    }

    signin(email, password){
        this.firebaseauthservice.signinUser(email, password)
        .then(
            (response) => {
                this.firebaseauthservice.setToken();
                console.log("signinup: firebase signin successful");
                this.readwriteservice.getcurrentuserinfo();
                this.firebaseitemsubscription = this.readwriteservice.firebaseitem.valueChanges().subscribe(snapshot=>{
                    this.dbuserinfoservice.integrate(snapshot);
                    this.dbuserinfoservice.currentuserid=this.firebaseauthservice.angularfireauth.auth.currentUser.uid;
                });
            }
        )
        .catch(
            (firebaseerror) => {
                console.log("signinup: firebase signin failed!")
                console.log(firebaseerror);
            }
        );
    }
    
}
