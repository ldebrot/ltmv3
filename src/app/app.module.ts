//Built-in Modules
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { SwipeCardsModule } from 'ng2-swipe-cards';
import 'hammerjs';
import { //PrimeNG modules here
    MenubarModule,
    TabMenuModule,
    MenuModule,
    MenuItem,
    ListboxModule,
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
    MegaMenuModule,
    ProgressBarModule,
    ConfirmationService,
    OverlayPanelModule } from 'primeng/primeng';
import { DropdownModule } from "primeng/components/dropdown/dropdown";

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
import { DbusersearchService } from './services/dbusersearch.service';//handles user (temoin and beneficiaire) search
import { QuizzService } from './services/quizz.service';
import { CardsetDirective } from './components/beneficiaire/quizz/cardset/cardset.directive';

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
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';//AngularFire2
import { environment } from '../environments/environment';//AngularFire2
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Components
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
import { JeconsultemesinvitationsComponent } from './components/beneficiaire/jeprendsrendezvous/jeconsultemesinvitations/jeconsultemesinvitations.component';
import { JenvoieuneinvitationComponent } from './components/beneficiaire/jeprendsrendezvous/jenvoieuneinvitation/jenvoieuneinvitation.component';
import { InvitationsdashboardComponent } from './components/beneficiaire/jeprendsrendezvous/invitationsdashboard/invitationsdashboard.component';
import { JetrouvedesideesdemetierComponent } from './components/beneficiaire/jefaislepoint/jetrouvedesideesdemetier/jetrouvedesideesdemetier.component';
import { JechoisismonnouveaumetierComponent } from './components/beneficiaire/jefaislepoint/jechoisismonnouveaumetier/jechoisismonnouveaumetier.component';
import { JemerenseignesurmonmetierComponent } from './components/beneficiaire/jefaislepoint/jemerenseignesurmonmetier/jemerenseignesurmonmetier.component';
import { JapprendsapresentermonprojetComponent } from './components/beneficiaire/jefaislepoint/japprendsapresentermonprojet/japprendsapresentermonprojet.component';
import { JedeveloppeetactivemonreseauComponent } from './components/beneficiaire/jefaislepoint/jedeveloppeetactivemonreseau/jedeveloppeetactivemonreseau.component';
import { JidentifiemessoutiensComponent } from './components/beneficiaire/jefaislepoint/jidentifiemessoutiens/jidentifiemessoutiens.component';
import { JemeprepareetmelanceComponent } from './components/beneficiaire/jefaislepoint/jemeprepareetmelance/jemeprepareetmelance.component';
import { JetrouvemontemoinComponent } from './components/beneficiaire/jeprendsrendezvous/jetrouvemontemoin/jetrouvemontemoin.component';
import { TemoinsearchboxComponent } from './components/beneficiaire/jeprendsrendezvous/temoinsearchbox/temoinsearchbox.component';
import { TemoinsearchresultsComponent } from './components/beneficiaire/jeprendsrendezvous/temoinsearchresults/temoinsearchresults.component';
import { QuizzComponent } from './components/beneficiaire/quizz/quizz.component';
import { CardsetcontainerComponent } from './components/beneficiaire/quizz/cardset/cardsetcontainer.component';
import { CardsetComponent } from './components/beneficiaire/quizz/cardset/cardset.component';
import { CsSwipecardComponent } from './components/beneficiaire/quizz/cs-swipecard/cs-swipecard.component';
import { CsMultiplechoiceComponent } from './components/beneficiaire/quizz/cs-multiplechoice/cs-multiplechoice.component';
import { CsReadcardComponent } from './components/beneficiaire/quizz/cs-readcard/cs-readcard.component';
import { CsAssociationComponent } from './components/beneficiaire/quizz/cs-association/cs-association.component';
import { CsOrderrelativeComponent } from './components/beneficiaire/quizz/cs-orderrelative/cs-orderrelative.component';

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
        JedeviensunproComponent,
        JeconsultemesinvitationsComponent,
        JenvoieuneinvitationComponent,
        InvitationsdashboardComponent,
        JetrouvedesideesdemetierComponent,
        JechoisismonnouveaumetierComponent,
        JemerenseignesurmonmetierComponent,
        JapprendsapresentermonprojetComponent,
        JedeveloppeetactivemonreseauComponent,
        JidentifiemessoutiensComponent,
        JemeprepareetmelanceComponent,
        JetrouvemontemoinComponent,
        TemoinsearchboxComponent,
        TemoinsearchresultsComponent,
        QuizzComponent,
        CardsetcontainerComponent,
        CardsetDirective,
        CsSwipecardComponent,
        CsMultiplechoiceComponent,
        CsReadcardComponent,
        CsAssociationComponent,
        CsOrderrelativeComponent
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
        MenuModule,//PrimeNG here
        MegaMenuModule,//PrimeNG here
        OverlayPanelModule,//PrimeNG here
        MenubarModule,//PrimeNG here
        TabMenuModule,//PrimeNG here
        ListboxModule,//PrimeNG here
        DropdownModule,//PrimeNG here
        RoutingService,
        RouterModule,
        ButtonModule,
        SwipeCardsModule,//NG SWIPE
        AngularFireModule.initializeApp(environment.firebase),//AngularFire2 
        AngularFireDatabaseModule, //AngularFire2  imports firebase/database, only needed for database features
        AngularFireAuthModule //AngularFire2  imports firebase/auth, only needed for auth features        
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
        DbusersearchService,//handles user (temoin and beneficiaire) search
        NavigationService,//handles navigation modules
        QuizzService//handles quizzes
    ],
    entryComponents: [CsSwipecardComponent, CsAssociationComponent, CsMultiplechoiceComponent, CsOrderrelativeComponent, CsReadcardComponent],
    bootstrap: [AppComponent]
})

export class AppModule { }
