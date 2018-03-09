import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

    public classarray : string[] = [];
    public classprefixes : string[] = ["gradient", "gradientnew", "unselected", "selected", "unselectednew", "selectednew", "background_", "backgroundnew_"]

    constructor() {
    }

    ngOnInit(){
        this.populateclassarray();
    }

    public populateclassarray():void{
        let numberarray = this.givemearray(1,9,null);
        this.classprefixes.map((prefixvalue, prefixindex)=>{
            numberarray.forEach((numbervalue,numberindex)=>{
                this.classarray.push(prefixvalue+numbervalue);
            });
        });
        console.log ("this.classarray");
        console.log (this.classarray);
    }

    public givemearray(start?:number, end?:number, number?:number):any{
        let temp_result = [];
        if (start!=null && end==null && number!=null){
            temp_result = Array.from(Array(number).keys()).map(function(value, index){return value+start;});        
        }
        if (start==null && end!=null && number!=null){
            temp_result = Array.from(Array(number).keys()).map(function(value, index){return value+end-number;});                    
        }
        if (start!=null && end!=null && number==null){
            temp_result = Array.from(Array(end-start+1).keys()).map(function(value, index){return value+start;});                    
        }
        return temp_result;
    }

}  
