import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { MenubarModule, TabMenuModule, MenuItem } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { SectionTopComponent } from './components/section-top/section-top.component';
import { TitleComponent } from './components/title/title.component';
import { ConnectComponent } from './components/connect/connect.component';

@NgModule({
    declarations: [
    AppComponent,
    TestComponent,
    SectionTopComponent,
    TitleComponent,
    ConnectComponent
    ],
    imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),//NG-Bootstrap added here
    MenubarModule,
    TabMenuModule,
    ButtonModule
    ],
    providers: [
        Title
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
