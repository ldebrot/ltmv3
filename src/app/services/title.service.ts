//Modules:
import { NgModule } from '@angular/core';

//ReactiveX
import "rxjs/Rx";
import { Subject } from "rxjs/Subject";

export class TitleService {

    public titlesubject : Subject<string> = new Subject();
    public titlecurrentvalue : string = "mumu";

    constructor(){
    }


}