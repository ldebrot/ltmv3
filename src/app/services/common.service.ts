//This services provides handy functions for various situations


//Built-in stuff:
import { OnInit, Injectable } from '@angular/core';

//Hand-made

//Firebase


@Injectable()
export class CommonService implements OnInit{
    
    constructor(
    ) {
        
    }

    ngOnInit() {
    }

    //This one takes a correctly formatted date (YYYYMMDDHHmm) and sends back an object
    public getdatematrix(meetingdate:string):any {
        let datematrix : any = {};
        datematrix.complete = meetingdate;
        datematrix.year = Number(meetingdate.substr(0,4));
        datematrix.month = Number(meetingdate.substr(4,2));
        datematrix.day = Number(meetingdate.substr(6,2));
        datematrix.hours = Number(meetingdate.substr(8,2));
        datematrix.minutes = Number(meetingdate.substr(8,2));
        datematrix.validdate = datematrix.month.toString()
        +"/"+datematrix.day.toString()
        +"/"+datematrix.year.toString()
        +" "+datematrix.hours.toString()
        +":"+datematrix.minutes.toString()+":00";
        let temp_date = new Date(datematrix.validdate);
        datematrix.inmilliseconds = Number(temp_date.getTime());
        return datematrix;
    }

    //this one takes a date in milliseconds and returns a correctly formatted date (YYYYMMDDHHmm)
    public getformatteddate(milliseconds:number):string{
        let temp_date = new Date(milliseconds);
        let year = temp_date.getFullYear().toString();
        let month = temp_date.getMonth().toString().length >1 ? temp_date.getMonth().toString() : "0"+ temp_date.getMonth().toString();
        let day = temp_date.getDate().toString().length >1 ? temp_date.getDate().toString() : "0"+ temp_date.getDate().toString();
        let hours = temp_date.getHours().toString().length >1 ? temp_date.getHours().toString() : "0"+ temp_date.getHours().toString();
        let minutes = temp_date.getMinutes().toString().length >1 ? temp_date.getMinutes().toString() : "0"+ temp_date.getMinutes().toString();
        return year + month + day + hours + minutes;
    }

    //this one returns either the singular or plural form depending on chiffre
    public singulierpluriel(chiffre:number,singulier:string,pluriel:string):string{
        let okay : boolean = false;
        if(Number.isInteger){
            okay = true;
        } else {
            if(!Number.isNaN(Number(chiffre))){
                chiffre = Number(chiffre);
            }
        }
        if (okay) {
            if(chiffre>1||chiffre===0) {
                return pluriel;
            } else {
                return singulier;
            }
        }
    }


}