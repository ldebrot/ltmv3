import { CsMultiplechoiceComponent } from 'app/components/beneficiaire/quizz/cs-multiplechoice/cs-multiplechoice.component';
import { Subscription } from 'rxjs/Rx';
import { QuizzService } from './../../../../services/quizz.service';
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
    
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private quizzservice: QuizzService
    ) { }
    
    ngAfterViewInit() {
        this.quizzservice.currentcardsubject.subscribe((cardposition:number)=>{
            this.loadComponent(cardposition);
            console.log("loaded card in position "+cardposition)
        });
    }
    
    ngOnDestroy() {
    }
    
    public loadComponent(cardposition:number) {
        let cardsetItem : any;        
        switch(this.quizzservice.cards.parameters[cardposition].cardcomponentname) {
            case "CsMultipleChoiceComponent":
            cardsetItem = new CardsetItem(CsMultiplechoiceComponent, {});
            default:
            console.log("cardsetcontainer : cardcomponentname does not match any Component")
        }
               
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(cardsetItem.component);
        
        let viewContainerRef = this.csHost.viewContainerRef;
        viewContainerRef.clear();
        
        let componentRef = viewContainerRef.createComponent(componentFactory);
        (<CardsetComponent>componentRef.instance).data = cardsetItem.data;
    }
    
    ngOnInit() {
    }
    
}
