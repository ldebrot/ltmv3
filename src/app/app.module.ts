import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { MenubarModule, TabMenuModule, MenuItem } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';

//Routing service
import { RoutingService } from './services/routing.service';

//Components
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { SectionTopComponent } from './components/section-top/section-top.component';
import { TitleComponent } from './components/title/title.component';
import { ConnectComponent } from './components/connect/connect.component';
import { SectionTopmenuComponent } from './components/section-topmenu/section-topmenu.component';
import { ConnectShortComponent } from './components/connect-short/connect-short.component';
import { MainComponent } from './components/main/main.component';
import { IntrouvableComponent } from './components/introuvable/introuvable.component';

@NgModule({
    declarations: [
    AppComponent,
    TestComponent,
    SectionTopComponent,
    TitleComponent,
    ConnectComponent,
    SectionTopmenuComponent,
    ConnectShortComponent,
    MainComponent,
    IntrouvableComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),//NG-Bootstrap added here
    MenubarModule,
    TabMenuModule,
    RoutingService,
    ButtonModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
