//this directive 
import {
    Directive, ElementRef, AfterViewChecked, 
    Input, HostListener
} from '@angular/core';

@Directive({
    selector: '[adaptheighttowindowwidth]'
})
export class AdaptheighttowindowwidthDirective implements AfterViewChecked {
    
    // this is the input variable. in the html code, the proportion is assigned to this variable, which weirdly must have the same name as the selector
    @Input()
    adaptheighttowindowwidth: any;
    
    constructor(private el: ElementRef) {
    }
    
    //after viewcheck, the object is resized
    ngAfterViewChecked() {
        this.adaptheight(this.el.nativeElement, this.adaptheighttowindowwidth);
    }
    
    //each time the window is resized, the object is resized too
    @HostListener('window:resize') 
    onResize() {
        this.adaptheight(this.el.nativeElement, this.adaptheighttowindowwidth);
    }
    
    //this is a simple function which redefines the size of the element, which uses the selector in the HTML code:
    adaptheight(element: HTMLElement, proportion : any) {
        let newheight = Number(window.innerWidth) * Number(proportion)
        element.style.height = String(Math.round(newheight))+"px";
        //console.log("new height : "+String(newheight)+ " // windowinnerwidth: "+window.innerWidth + " // proportion:" + proportion);
    }
    
}


