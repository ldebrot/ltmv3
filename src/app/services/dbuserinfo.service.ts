//Firebase service
import * as firebase from 'firebase';

export class DbuserinfoService {

    private meetings: object;
    private privateinfo: object;
    private publicinfo: object;
    private mobile:number;
    private email:string;
    private birthdate:string;
    private comment:string;
    private firstname:string;
    private surname:string;
    private twitter_followme:boolean;
    private twitter_id:string;
    private linkedin_followme:boolean;
    private linkedin_url:string;
    private status:string;

    constructor(
    ) {
    }

    public userinfo : any = {
        privateinfo : {
            email: "",
            mobile : "",
            birthdate: ""
        },
        publicinfo : {
            firstname : "",
            surname: "",
            twitter_followme : "",
            twitter_id: "",
            linkedin_followme : "",
            linkedin_url : "",
            status: ""
        },
        meetings : {

        }
    }
    
    //This function integrates the values passed in the inputobject into the userinfo object, which is available as a service. The inputobject usually comes from firebase.
    public integrate(inputobject:object):void {
        //loop through keys of userinfo object
        for (var key in this.userinfo) {
            if (
                this.userinfo.hasOwnProperty(key)
                && inputobject.hasOwnProperty(key)//check if inputobject has this key as well
            ) {
                console.log("both have key '"+key+"'");
                //loop through subkeys of userinfo object
                let userinfosublevel:object = this.userinfo[key];//key as object
                let subkeycount:number = 0;
                for (var subkey in userinfosublevel) {
                    if (
                        userinfosublevel.hasOwnProperty(subkey)
                        && inputobject[key].hasOwnProperty(subkey)
                    ) {
                        //console.log("both have subkey '"+subkey+"'");
                        this.userinfo[key][subkey] = inputobject[key][subkey];
                        subkeycount++;
                    }
                }
                if(subkeycount===0) {//this means they only have the key in common (therefore no common subkey)
                    this.userinfo[key] = inputobject[key];
                } else {
                    console.log("Saved "+subkeycount+" items in dbuserinfoservice!");
                }
            }
        }
        console.log("this.userinfo is now :");
        console.log(this.userinfo);
    }

    public create():void {
        this.userinfo = {
            privateinfo : {
                email: "",
                mobile : "",
                birthdate: ""
            },
            publicinfo : {
                firstname : "",
                surname: "",
                twitter_followme : "",
                twitter_id: "",
                linkedin_followme : "",
                linkedin_url : "",
                status: ""
            },
            meetings : {

            }
        }
    }

}