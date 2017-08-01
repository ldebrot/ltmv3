//Modules
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { MenubarModule, TabMenuModule, MenuItem, DialogModule, ButtonModule, MessagesModule, ConfirmDialogModule } from 'primeng/primeng';
import { ConfirmationService } from 'primeng/primeng';

//Services
import { RoutingService } from './services/routing.service';
import { FakeAuthService } from './services/fakeauth.service';//checks if user logged in
import { authGuardService } from './services/authguard.service';//prevents routes from loading
import { AuthService } from './auth/auth.service';//actual auth service connected to firebase

//Components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SectionTopComponent } from './components/section-top/section-top.component';
import { ConnectComponent } from './components/connect/connect.component';
import { MenuNotconnectedComponent } from './components/menunotconnected/menunotconnected.component';
import { MainComponent } from './components/main/main.component';
import { IntrouvableComponent } from './components/introuvable/introuvable.component';
import { SigninupComponent } from './auth/signinup/signinup.component';

@NgModule({
    declarations: [
    AppComponent,
    TestComponent,
    SectionTopComponent,
    ConnectComponent,
    MenuNotconnectedComponent,
    MainComponent,
    IntrouvableComponent,
    SigninupComponent
    ],
    imports: [
    DialogModule,
    FormsModule,
    HttpModule,
    ConfirmDialogModule,//PrimeNG here
    BrowserModule,//PrimeNG here
    BrowserAnimationsModule,//PrimeNG here
    MessagesModule,//PrimeNG here
    NgbModule.forRoot(),//NG-Bootstrap added here
    MenubarModule,
    TabMenuModule,
    RoutingService,
    ButtonModule
    ],
    providers: [
        Title,
        FakeAuthService,//fake authentication service
        authGuardService,
        ConfirmationService,//PrimeNG here
        AuthService,
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
