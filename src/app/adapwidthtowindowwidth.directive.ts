//this directive adapts the width of an element to the width of the browser window
import {
  Directive, ElementRef, AfterViewChecked, 
  Input, HostListener
} from '@angular/core';

@Directive({
  selector: '[adapwidthtowindowwidth]'
})
export class AdapwidthtowindowwidthDirective {

    // this is the input variable. in the html code, the proportion is assigned to this variable, which weirdly must have the same name as the selector
    @Input()
    adapwidthtowindowwidth: any;
    
    constructor(private el: ElementRef) {
    }
    
    //after viewcheck, the object is resized
    ngAfterViewChecked() {
        this.adaptheight(this.el.nativeElement, this.adapwidthtowindowwidth);
    }
    
    //each time the window is resized, the object is resized too
    @HostListener('window:resize') 
    onResize() {
        this.adaptheight(this.el.nativeElement, this.adapwidthtowindowwidth);
    }
    
    //this is a simple function which redefines the size of the element, which uses the selector in the HTML code:
    adaptheight(element: HTMLElement, proportion : any) {
        let newwidth = Number(window.innerWidth) * Number(proportion)
        element.style.width = String(Math.round(newwidth))+"px";
    }
}
