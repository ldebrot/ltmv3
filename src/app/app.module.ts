import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';//add NG-Bootstrap
import { AppComponent } from './app.component';
import { TestComponent } from './components/test/test.component';
import { MenubarModule, TabMenuModule, MenuItem } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@NgModule({
    declarations: [
    AppComponent,
    TestComponent
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
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
