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
    ConfirmDialogModule,
    TabViewModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

//Services
import { RoutingService } from './services/routing.service';
import { FakeAuthService } from './services/fakeauth.service';//checks if user logged in
import { authGuardService } from './services/authguard.service';//prevents routes from loading
import { AuthService } from './auth/auth.service';//actual auth service connected to firebase
import { TitleService } from './services/title.service'; //service which stores the current title

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

// Firebase
import * as firebase from 'firebase';

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
    JedecouvrelunchtimeComponent, LesactusComponent, QuisommesnousComponent//discover Lunchtime - used as "home" component
    ],
    imports: [
    DialogModule,
    FormsModule,
    HttpModule,
    ConfirmDialogModule,//PrimeNG here
    BrowserModule,//PrimeNG here
    BrowserAnimationsModule,//PrimeNG here
    MessagesModule,//PrimeNG here
    TabViewModule,//PrimeNG here
    NgbModule.forRoot(),//NG-Bootstrap added here
    MenubarModule,
    TabMenuModule,
    RoutingService,
    ButtonModule,
    ],
    providers: [
        Title,
        FakeAuthService,//fake authentication service
        authGuardService,
        ConfirmationService,//PrimeNG here
        AuthService,
        TitleService//service which stores the current title
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
