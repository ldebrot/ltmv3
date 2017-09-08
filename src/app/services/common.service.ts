//This services provides handy functions for various situations


//Built-in stuff:
import { OnInit, Injectable } from '@angular/core';

//Hand-made


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

    public getdateasaphrasefrommilliseconds(milliseconds:number):string{
        let temp_date = new Date(milliseconds);
        let year = temp_date.getFullYear().toString();
        let month = temp_date.getMonth().toString().length >1 ? temp_date.getMonth().toString() : "0"+ temp_date.getMonth().toString();
        let day = temp_date.getDate().toString().length >1 ? temp_date.getDate().toString() : "0"+ temp_date.getDate().toString();
        return day + "/" + month + "/"+ year;
    }        

    public getdeadlineasaphrasefrommilliseconds(milliseconds:number):string{
        let temp_basedate = new Date(0);
        let temp_date = new Date(milliseconds);
        
        let str_years : string = "";
        let str_months : string = "";
        let str_days : string = "";
        let str_hours : string = "";
        let str_minutes : string = "";
        
        let add_hours : number = 0;
        let add_days : number = 0;
        let add_months : number = 0;
        let add_years : number = 0;
        
        //minutes
        let temp_minutes = ( Number(temp_date.getMinutes()) - Number(temp_basedate.getMinutes()) );
        if (temp_minutes < 0) {
            let temp_minutes_mod = 60 + temp_minutes;
            add_hours = 1;
            str_minutes = " " + temp_minutes_mod.toString() + " "+ this.singulierpluriel(temp_minutes_mod, "minute", "minutes");
        } else if (temp_minutes === 0) {
            str_minutes = "";
        } else if (temp_minutes > 0) {
            str_minutes = " " + temp_minutes.toString() + " "+ this.singulierpluriel(temp_minutes, "minute", "minutes");
        }

        //hours
        let temp_hours = ( Number(temp_date.getHours()) - Number(temp_basedate.getHours()) + add_hours );
        if (temp_hours < 0) {
            let temp_hours_mod = 24 + temp_hours;
            add_days = 1;
            str_hours = " " + temp_hours_mod.toString() + " "+ this.singulierpluriel(temp_hours_mod, "heure", "heures");
        } else if (temp_hours === 0) {
            str_hours = "";
        } else if (temp_hours > 0) {
            str_hours =  " " + temp_hours.toString() + " "+ this.singulierpluriel(temp_hours, "heure", "heures");
        }

        //days
        let temp_days = ( Number(temp_date.getDate()) - Number(temp_basedate.getDate()) + add_days );
        if (temp_days < 0) {
            let daysofcurrentmonth : number = 30;
            if (temp_date.getDate()===1 ||
                temp_date.getDate()===3 ||
                temp_date.getDate()===5 ||
                temp_date.getDate()===7 ||
                temp_date.getDate()===8 ||
                temp_date.getDate()===10 ||
                temp_date.getDate()===12
            ) {
                daysofcurrentmonth = 31;
            }
            let temp_days_mod = daysofcurrentmonth + temp_days;
            add_months = 1;
            str_days = " " + temp_days_mod.toString() + " "+ this.singulierpluriel(temp_days_mod, "jour", "jours");
        } else if (temp_days === 0) {
            str_days = "";
        } else if (temp_days > 0) {
            str_days =  " " + temp_days.toString() + " "+ this.singulierpluriel(temp_days, "jour", "jours");
        }

        //months
        let temp_months = ( Number(temp_date.getMonth()) - Number(temp_basedate.getMonth()) + add_months );
        if (temp_months < 0) {
            let temp_months_mod = 12 + temp_months;
            add_years = 1;
            str_months = " " + temp_months_mod.toString() + " mois";
        } else if (temp_months === 0) {
            str_months = "";
        } else if (temp_months > 0) {
            str_months =  " " + temp_months.toString() + " mois";
        }
        
        //years
        let temp_years = ( Number(temp_date.getFullYear()) - Number(temp_basedate.getFullYear()) + add_years );
        if (temp_years < 0) {
            let temp_years_mod = 12 + temp_years;
            add_years = 1;
            str_years = " " + temp_years_mod.toString() + " "+ this.singulierpluriel(temp_years_mod, "année", "années");
        } else if (temp_years === 0) {
            str_years = "";
        } else if (temp_years > 0) {
            str_years =  " " + temp_years.toString() + " "+ this.singulierpluriel(temp_years, "année", "années");
        }
        return str_years + str_months + str_days+ str_hours + str_minutes;
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