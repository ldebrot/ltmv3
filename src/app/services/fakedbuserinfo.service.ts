import { DbuserinfoService } from './dbuserinfo.service';
import { Injectable } from '@angular/core';
    
@Injectable()
export class FakedbuserinfoService {

    constructor(
        private dbuserinfoService : DbuserinfoService
    ) {}
    
    public fillinfakeuserinfo () : void {
        this.dbuserinfoService.userinfo= {
			privateinfo: {
				email: "test@test.com",
		        mobile : "0650371376",
				birthdate : "30-11-1985"
			},
			publicinfo: {
				firstname: "Lucien",
				surname: "De Brot",
				twitter_followme: "true",
				twitter_id: "ldebrot",
				linkedin_followme: "true",
				linkedin_url: "fr.linkedin.com/in/luciendebrot",
				status:"beneficiaire"
			},
			meetings: {
				_comment: "List of meeting ids, user only",
				meetingid1: "",
				meetingid3: ""
			}
        };
    }
}