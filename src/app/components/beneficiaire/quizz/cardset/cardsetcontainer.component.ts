//COMPONENTS
import { CsPlacementsimpleComponent } from './../cs-placementsimple/cs-placementsimple.component';
import { CsDropdownComponent } from './../cs-dropdown/cs-dropdown.component';
import { CsOrderregularComponent } from './../cs-orderregular/cs-orderregular.component';
import { CsSwipecardComponent } from './../cs-swipecard/cs-swipecard.component';
import { CsOrderrelativeComponent } from 'app/components/beneficiaire/quizz/cs-orderrelative/cs-orderrelative.component';
import { CsMultiplechoiceComponent } from 'app/components/beneficiaire/quizz/cs-multiplechoice/cs-multiplechoice.component';
import { CsInfoComponent } from 'app/components/beneficiaire/quizz/cs-info/cs-info.component';

//Hand-made services
import { ReadwritebufferService } from './../../../../services/readwritebuffer.service';
import { QuizzService } from './../../../../services/quizz.service';

//Built-in and third-party
import { Subscription } from 'rxjs/Rx';
import { CardsetItem } from './cardset-item';
import { CardsetDirective } from './cardset.directive';
import { CardsetComponent } from './cardset.component'
import { Component, OnInit, AfterViewInit, OnDestroy, ComponentFactoryResolver, ViewChild, Input, Injectable } from '@angular/core';

//Cardsetcontainer includes the cardset according to the cardset service

@Injectable()
@Component({
    selector: 'app-cardset',
    templateUrl: './cardset.component.html',
    styleUrls: ['./cardset.component.css']
})
export class CardsetcontainerComponent implements AfterViewInit, OnDestroy, OnInit {
    
    @Input() cardsets: CardsetItem[];
    currentAddIndex: number = -1;
    @ViewChild(CardsetDirective) csHost: CardsetDirective;
    subscription: any;
    currentquizzsubscription : Subscription;
    public instruction : String = "";
    public questioncaption : String = "";
    public instructionpanelvisible : boolean = true;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private readwritebufferservice : ReadwritebufferService,
        private quizzservice: QuizzService
    ) { }
    
    ngAfterViewInit() {
    }
    
    ngOnDestroy() {
    }
    
    public gotonextcard() {
        this.quizzservice.gotonextcard();
    }

    public loadComponent() {
        //loads component based on currentcardobject
        this.instruction = this.quizzservice.currentcardobject.parameters.instruction;
        this.questioncaption = this.quizzservice.currentcardobject.parameters.questioncaption;

        let cardsetItem : any;
        let validcomponent : boolean = true;
        switch(String(this.quizzservice.currentcardobject.parameters.cardcomponentname)) {
            case "CsMultipleChoiceComponent":
                cardsetItem = new CardsetItem(CsMultiplechoiceComponent, {});
                console.log("loaded CsMultipleChoiceComponent");
                break
            case "CsSwipecardComponent":
                cardsetItem = new CardsetItem(CsSwipecardComponent, {});
                console.log("CsSwipecardComponent");
                break
            case "CsOrderrelativeComponent":
                cardsetItem = new CardsetItem(CsOrderrelativeComponent, {});
                console.log("CsOrderrelativeComponent");
                break
            case "CsOrderregularComponent":
                cardsetItem = new CardsetItem(CsOrderregularComponent, {});
                console.log("CsOrderregularComponent");
                break
            case "CsInfoComponent":
                cardsetItem = new CardsetItem(CsInfoComponent, {});
                console.log("CsInfoComponent");
                break
            case "CsDropdownComponent":
                cardsetItem = new CardsetItem(CsDropdownComponent, {});
                console.log("CsDropdownComponent");
                break
            case "CsPlacementsimpleComponent":
                cardsetItem = new CardsetItem(CsPlacementsimpleComponent, {});
                console.log("CsPlacementsimpleComponent");
                break
            default:
                console.log("cardsetcontainer : cardcomponentname does not match any Component")
                validcomponent = false;
                break
        }

        if (validcomponent){
            let componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardsetItem.component);
            
            let viewContainerRef = this.csHost.viewContainerRef;
            viewContainerRef.clear();
            
            let componentRef = viewContainerRef.createComponent(componentFactory);
            (<CardsetComponent>componentRef.instance).data = cardsetItem.data;
        }
    }
    
    ngOnInit() {
        this.loadComponent();
        this.quizzservice.currentcardsubject.subscribe((cardid:number)=>{
            console.log("cardsetcontainer subscribe");
            this.loadComponent();
        });
    }
    
    temp_saveit () {
        this.readwritebufferservice.transmitbuffer();        
    }

}
