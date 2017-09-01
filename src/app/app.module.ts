import { RouterModule } from '@angular/router';
//Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { //PrimeNG modules here
    MenubarModule,
    TabMenuModule,
    MenuItem,
    DialogModule,
    ButtonModule,
    MessagesModule,
    GrowlModule,
    ConfirmDialogModule,
    TooltipModule,
    TabViewModule,
    CheckboxModule,
    SelectButtonModule,
    ToggleButtonModule,
    SelectItem,
    ProgressBarModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

//Services
import { DbuserinfoService } from './services/dbuserinfo.service';//handles down- and upload of userinformation from DB
import { RoutingService } from './services/routing.service';
import { CheckauthService } from './services/checkauth.service';//checks if user logged in
import { authGuardService } from './services/authguard.service';//prevents routes from loading
import { FirebaseauthService } from './services/firebaseauth.service';//actual auth service connected to firebase
import { TitleService } from './services/title.service'; //service which stores the current title
import { ReadwriteService } from './services/readwrite.service';//service handling read and write operations with Firebase
import { ReadwritebufferService } from './services/readwritebuffer.service';
import { FakedbuserinfoService } from './services/fakedbuserinfo.service';//TEMPORARY serivce filling in dbuserinfo with a data set (for offline moments...)
import { NavigationService } from './services/navigation.service';//handles navigation modules
import { BilanService } from './services/bilan.service';//This service handles the situation recap ("bilan") of the jefaislepoint module
import { CommonService } from './services/common.service';
import { MeetingService } from './services/meeting.service';

//Components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SectionTopComponent } from './components/section-top/section-top.component';
import { ConnectComponent } from './components/connect/connect.component';
import { MenuNotconnectedComponent } from './components/menunotconnected/menunotconnected.component';
import { MenuBeneficiaireComponent } from './components/menubeneficiaire/menubeneficiaire.component';
import { MenuTemoinComponent } from './components/menutemoin/menutemoin.component';
import { StartNotconnectedComponent } from './components/startnotconnected/startnotconnected.component';
import { IntrouvableComponent } from './components/introuvable/introuvable.component';
import { SigninupComponent } from './auth/signinup/signinup.component';
import { JedecouvrelunchtimeComponent } from './components/notconnected/jedecouvrelunchtime/jedecouvrelunchtime.component';
import { LesactusComponent } from './components/notconnected/lesactus/lesactus.component';
import { QuisommesnousComponent } from './components/notconnected/quisommesnous/quisommesnous.component';
import { StartbeneficiaireComponent } from './components/startbeneficiaire/startbeneficiaire.component';

// Firebase
import * as firebase from 'firebase';
import { MonplanningComponent } from './components/beneficiaire/monplanning/monplanning.component';
import { JefaislepointComponent } from './components/beneficiaire/jefaislepoint/jefaislepoint.component';
import { JeprendsrendezvousComponent } from './components/beneficiaire/jeprendsrendezvous/jeprendsrendezvous.component';
import { JepreparemarencontreComponent } from './components/beneficiaire/jepreparemarencontre/jepreparemarencontre.component';
import { JefaislesuiviComponent } from './components/beneficiaire/jefaislesuivi/jefaislesuivi.component';
import { JeconstruismonprojetComponent } from './components/beneficiaire/jefaislepoint/jeconstruismonprojet/jeconstruismonprojet.component';
import { JeconsultemonbilanComponent } from './components/beneficiaire/jeconsultemonbilan/jeconsultemonbilan.component';
import { BilantemoinComponent } from './components/beneficiaire/jeconsultemonbilan/bilantemoin/bilantemoin.component';
import { BilanbeneficiaireComponent } from './components/beneficiaire/jeconsultemonbilan/bilanbeneficiaire/bilanbeneficiaire.component';
import { BilanratioComponent } from './components/beneficiaire/jeconsultemonbilan/bilanratio/bilanratio.component';
import { BilandisqualifyComponent } from './components/beneficiaire/jeconsultemonbilan/bilandisqualify/bilandisqualify.component';
import { JedeviensunproComponent } from './components/beneficiaire/jedeviensunpro/jedeviensunpro.component';

export const firebaseconfig = {
    apiKey: "AIzaSyCdWffhlLWk5olASIDHMw0Y7rzXsc_Sxu8",
    authDomain: "ltmv1-8873c.firebaseapp.com",
    databaseURL: "https://ltmv1-8873c.firebaseio.com",
    projectId: "ltmv1-8873c",
    storageBucket: "ltmv1-8873c.appspot.com",
    messagingSenderId: "605451735287"
};

firebase.initializeApp(firebaseconfig);
//console.log("initializedApp at app.mdoule.ts level!");

@NgModule({
    declarations: [
    AppComponent,
    TestComponent,
    SectionTopComponent,
    ConnectComponent,
    MenuNotconnectedComponent,//menu for not-connected user
    MenuBeneficiaireComponent,//menu for connected beneficiaire
    MenuTemoinComponent,//menu for témoins
    StartNotconnectedComponent,//starting point for not-connected user
    IntrouvableComponent,
    SigninupComponent,//sign in and sign up
    JedecouvrelunchtimeComponent,//discover Lunchtime - used as "home" component
    LesactusComponent,
    QuisommesnousComponent,
    StartbeneficiaireComponent,
    MonplanningComponent,
    JefaislepointComponent,
    JeprendsrendezvousComponent,
    JepreparemarencontreComponent,
    JefaislesuiviComponent,
    JeconstruismonprojetComponent,
    JeconsultemonbilanComponent,
    BilantemoinComponent,
    BilanbeneficiaireComponent,
    BilanratioComponent,
    BilandisqualifyComponent,
    JedeviensunproComponent
    ],
    imports: [
    FormsModule,
    HttpModule,
    ConfirmDialogModule,//PrimeNG here
    BrowserModule,//PrimeNG here
    BrowserAnimationsModule,//PrimeNG here
    MessagesModule,//PrimeNG here
    TabViewModule,//PrimeNG here
    GrowlModule,//PrimeNG here
    DialogModule,//PrimeNG here
    TooltipModule,//PrimeNG here
    ProgressBarModule,//PrimeNG here
    CheckboxModule,//PrimeNG here
    SelectButtonModule,//PrimeNG here
    ToggleButtonModule,//PrimeNG here
    NgbModule.forRoot(),//NG-Bootstrap added here
    MenubarModule,
    TabMenuModule,
    RoutingService,
    RouterModule,
    ButtonModule,
    ],
    providers: [
        Title,
        DbuserinfoService,//handles down- and upload of userinformation from DB
        CheckauthService,//fake authentication service
        authGuardService,
        ConfirmationService,//PrimeNG here
        ReadwriteService,//handles read and write operations with Firebase
        ReadwritebufferService,//handles buffer between user mofidications and Firebase readwrite operations
        FirebaseauthService,//handles Firebase authentication
        TitleService,//service which stores the current title
        BilanService,//This service handles the situation recap ("bilan") of the jefaislepoint module
        FakedbuserinfoService,
        CommonService,//This services provides handy functions for various situations
        MeetingService,//This service handles the meetings based on dbuserinfo
        NavigationService//handles navigation modules
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
