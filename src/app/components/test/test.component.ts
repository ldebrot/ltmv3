import { Component, OnInit } from '@angular/core';
import { TabMenuModule, MenuItem } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
    
    constructor() { }
    
    public items: MenuItem[];
    public activeItem: MenuItem;

    ngOnInit() {
        this.items = [
            {label: 'Stats', icon: 'fa-bar-chart'},
            {label: 'Calendar', icon: 'fa-calendar'},
            {label: 'Documentation', icon: 'fa-book'},
            {label: 'Support', icon: 'fa-support'},
            {label: 'Social', icon: 'fa-twitter'}
        ];
        
        this.activeItem = this.items[2];
    }

}
