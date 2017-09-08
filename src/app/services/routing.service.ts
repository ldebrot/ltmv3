//Services:
import { authGuardService } from './authguard.service';

//Modules:
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import all components
import { StartNotconnectedComponent } from './../components/startnotconnected/startnotconnected.component';
import { IntrouvableComponent } from './../components/introuvable/introuvable.component';
import { SigninupComponent } from './../auth/signinup/signinup.component';
import { JedecouvrelunchtimeComponent } from './../components/notconnected/jedecouvrelunchtime/jedecouvrelunchtime.component';
import { QuisommesnousComponent } from './../components/notconnected/quisommesnous/quisommesnous.component';
import { LesactusComponent } from './../components/notconnected/lesactus/lesactus.component';
import { StartbeneficiaireComponent } from './../components/startbeneficiaire/startbeneficiaire.component';
import { MonplanningComponent } from './../components/beneficiaire/monplanning/monplanning.component';
import { JefaislesuiviComponent } from './../components/beneficiaire/jefaislesuivi/jefaislesuivi.component';
import { JepreparemarencontreComponent } from './../components/beneficiaire/jepreparemarencontre/jepreparemarencontre.component';
import { JeprendsrendezvousComponent } from './../components/beneficiaire/jeprendsrendezvous/jeprendsrendezvous.component';
import { JefaislepointComponent } from './../components/beneficiaire/jefaislepoint/jefaislepoint.component';
import { JeconstruismonprojetComponent } from './../components/beneficiaire/jefaislepoint/jeconstruismonprojet/jeconstruismonprojet.component';
import { JeconsultemonbilanComponent } from './../components/beneficiaire/jeconsultemonbilan/jeconsultemonbilan.component';
import { JeconsultemesinvitationsComponent } from './../components/beneficiaire/jeprendsrendezvous/jeconsultemesinvitations/jeconsultemesinvitations.component';
import { JedeviensunproComponent } from './../components/beneficiaire/jedeviensunpro/jedeviensunpro.component';
import { JenvoieuneinvitationComponent } from './../components/beneficiaire/jeprendsrendezvous/jenvoieuneinvitation/jenvoieuneinvitation.component';
import { InvitationsdashboardComponent } from './../components/beneficiaire/jeprendsrendezvous/invitationsdashboard/invitationsdashboard.component';

//Routes:
const appRoutes: Routes = [
    { path: '', component: StartNotconnectedComponent,
    children: [
        { path: '', canActivate: [authGuardService], component: JedecouvrelunchtimeComponent },
        { path: 'signinup', canActivate: [authGuardService], component: SigninupComponent },
        { path: 'decouvrirlunchtime', canActivate: [authGuardService], component: JedecouvrelunchtimeComponent },
        { path: 'lesactus', canActivate: [authGuardService], component: LesactusComponent },
        { path: 'quisommesnous', canActivate: [authGuardService], component: QuisommesnousComponent },
        { path: 'introuvable', canActivate: [authGuardService], component: IntrouvableComponent}
    ]},
    { path: 'beneficiaire',  canActivate: [authGuardService], component: StartbeneficiaireComponent,
    children: [
        { path: '', canActivate: [authGuardService], pathMatch: 'prefix', redirectTo: 'monplanning'},
        { path: 'monplanning', canActivate: [authGuardService], component: MonplanningComponent},
        { path: 'jefaislepoint', canActivate: [authGuardService], component: JefaislepointComponent},
        { path: 'jeconsultemonbilan', canActivate: [authGuardService], component: JeconsultemonbilanComponent},
        { path: 'jeprendsrendezvous', canActivate: [authGuardService], component: JeprendsrendezvousComponent},
        { path: 'invitationsdashboard', canActivate: [authGuardService], component: InvitationsdashboardComponent},
        { path: 'jenvoieuneinvitation', canActivate: [authGuardService], component: JenvoieuneinvitationComponent},        
        { path: 'jeconsultemesinvitations', canActivate: [authGuardService], component: JeconsultemesinvitationsComponent},
        { path: 'jepreparemarencontre', canActivate: [authGuardService], component: JepreparemarencontreComponent},
        { path: 'jefaislesuivi', canActivate: [authGuardService], component: JefaislesuiviComponent},
        { path: 'jeconstruismonprojet', canActivate: [authGuardService], component: JeconstruismonprojetComponent},
        { path: 'jeconstruismonprojet/:step', canActivate: [authGuardService], component: JeconstruismonprojetComponent},
        { path: 'jedeviensunpro', canActivate: [authGuardService], component: JedeviensunproComponent}
    ]},
    { path: '**', redirectTo: '/introuvable'}
]

@NgModule ({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingService {
    public approutescopy : any = appRoutes;
}