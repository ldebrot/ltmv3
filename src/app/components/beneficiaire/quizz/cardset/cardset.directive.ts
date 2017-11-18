import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[dir-cardset]',
})
export class CardsetDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}