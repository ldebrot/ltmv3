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
import 'hammer-timejs';
import { //PrimeNG modules here
    AutoCompleteModule,
    ButtonModule,
    CheckboxModule,
    ConfirmationService,
    ConfirmDialogModule,
    DialogModule,
    GrowlModule,
    MegaMenuModule,
    MenubarModule,
    MenuItem,
    MenuModule,
    MessagesModule,
    ListboxModule,
    OverlayPanelModule, 
    ProgressBarModule,
    SelectButtonModule,
    SelectItem,
    SidebarModule,
    SliderModule,
    TabMenuModule,
    TabViewModule,
    ToggleButtonModule,
    TooltipModule,
} from 'primeng/primeng';

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
import { CommonService } from './services/common.service';
import { MeetingService } from './services/meeting.service';
import { QuizzService } from './services/quizz.service';
import { CardsetDirective } from './components/beneficiaire/quizz/cardset/cardset.directive';
import { ConnectService } from './services/connect.service';
import { QuizzesService } from './services/quizzes.service';//stores quizzes
import { QuizzcardsService } from './services/quizzcards.service';//stores cards
import { LibrarymetiersService } from './services/library_metiers.service';//stores metier values


//Components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { StartNotconnectedComponent } from './components/startnotconnected/startnotconnected.component';
import { IntrouvableComponent } from './components/introuvable/introuvable.component';
import { SigninupComponent } from './auth/signinup/signinup.component';
import { LesactusComponent } from './components/notconnected/lesactus/lesactus.component';
import { QuisommesnousComponent } from './components/notconnected/quisommesnous/quisommesnous.component';


// Firebase
import * as firebase from 'firebase/app';
import { AngularFireModule } from 'angularfire2';//AngularFire2
import { environment } from '../environments/environment';//AngularFire2
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Sortable
import { SortablejsModule } from  'angular-sortablejs';

//Components
import { QuizzComponent } from './components/beneficiaire/quizz/quizz.component';
import { CardsetcontainerComponent } from './components/beneficiaire/quizz/cardset/cardsetcontainer.component';
import { CardsetComponent } from './components/beneficiaire/quizz/cardset/cardset.component';
import { CsSwipecardComponent } from './components/beneficiaire/quizz/cs-swipecard/cs-swipecard.component';
import { CsMultiplechoiceComponent } from './components/beneficiaire/quizz/cs-multiplechoice/cs-multiplechoice.component';
import { CsReadcardComponent } from './components/beneficiaire/quizz/cs-readcard/cs-readcard.component';
import { CsAssociationComponent } from './components/beneficiaire/quizz/cs-association/cs-association.component';
import { CsOrderrelativeComponent } from './components/beneficiaire/quizz/cs-orderrelative/cs-orderrelative.component';
import { CsOrderregularComponent } from './components/beneficiaire/quizz/cs-orderregular/cs-orderregular.component';
import { CsPlacementsimpleComponent } from './components/beneficiaire/quizz/cs-placementsimple/cs-placementsimple.component';
import { CsInfoComponent } from './components/beneficiaire/quizz/cs-info/cs-info.component';
import { CsDropdownComponent } from './components/beneficiaire/quizz/cs-dropdown/cs-dropdown.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { NotconnectedstartingpageComponent } from './components/notconnected/notconnectedstartingpage/notconnectedstartingpage.component';
import { QuizzselectionComponent } from './components/beneficiaire/quizz/quizzselection/quizzselection.component';
import { CsComputeComponent } from './components/beneficiaire/quizz/cs-compute/cs-compute.component';

//console.log("initializedApp at app.mdoule.ts level!");

@NgModule({
    declarations: [
        AppComponent,
        TestComponent,
        StartNotconnectedComponent,//starting point for not-connected user
        IntrouvableComponent,
        SigninupComponent,//sign in and sign up
        LesactusComponent,
        QuisommesnousComponent,
        QuizzComponent,
        CardsetcontainerComponent,
        CardsetDirective,
        CsSwipecardComponent,
        CsMultiplechoiceComponent,
        CsReadcardComponent,
        CsAssociationComponent,
        CsOrderrelativeComponent,
        CsOrderregularComponent,
        CsPlacementsimpleComponent,
        CsInfoComponent,
        CsDropdownComponent,
        TopbarComponent,
        NotconnectedstartingpageComponent,
        QuizzselectionComponent,
        CsComputeComponent
    ],
    imports: [
        FormsModule,
        HttpModule,
        ConfirmDialogModule,//PrimeNG here
        AutoCompleteModule,//PrimeNG here
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
        SliderModule,//PrimeNG here
        SidebarModule,//PrimeNG here
        RoutingService,
        RouterModule,
        ButtonModule,
        SwipeCardsModule,//NG SWIPE
        AngularFireModule.initializeApp(environment.firebase),//AngularFire2 
        AngularFireDatabaseModule, //AngularFire2  imports firebase/database, only needed for database features
        AngularFireAuthModule, //AngularFire2  imports firebase/auth, only needed for auth features     
        SortablejsModule.forRoot({ animation: 150 })
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
        FakedbuserinfoService,
        CommonService,//This services provides handy functions for various situations
        MeetingService,//This service handles the meetings based on dbuserinfo
        NavigationService,//handles navigation modules
        QuizzService,//handles quizzes
        ConnectService,//handles connection to firebase db
        QuizzcardsService,//stores quizz cards
        QuizzesService,//stores quizzes
        LibrarymetiersService//stores metiers values
    ],
    entryComponents: [
        CsSwipecardComponent,
        CsAssociationComponent,
        CsMultiplechoiceComponent,
        CsOrderrelativeComponent,
        CsReadcardComponent,
        CsOrderregularComponent,
        CsInfoComponent,
        CsPlacementsimpleComponent,
        CsDropdownComponent,
        CsComputeComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
