//this directive adapts the width of an element to the width of the browser window
import {
  Directive, ElementRef, AfterViewChecked, 
  Input, HostListener
} from '@angular/core';

@Directive({
  selector: '[adaptwidthtowindowwidth]'
})
export class AdaptwidthtowindowwidthDirective {

    // this is the input variable. in the html code, the proportion is assigned to this variable, which weirdly must have the same name as the selector
    @Input()
    adaptwidthtowindowwidth: any;
    
    constructor(private el: ElementRef) {
    }
    
    //after viewcheck, the object is resized
    ngAfterViewChecked() {
        this.adaptwidth(this.el.nativeElement, this.adaptwidthtowindowwidth);
    }
    
    //each time the window is resized, the object is resized too
    @HostListener('window:resize') 
    onResize() {
        this.adaptwidth(this.el.nativeElement, this.adaptwidthtowindowwidth);
    }
    
    //this is a simple function which redefines the size of the element, which uses the selector in the HTML code:
    public adaptwidth(element: HTMLElement, proportion : any) {
        let newwidth = Number(window.innerWidth) * Number(proportion)
        element.style.width = String(Math.round(newwidth))+"px";
    }
}
