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

//Routes:
const appRoutes: Routes = [
    { path: '', component: StartNotconnectedComponent,
    children: [
        { path: '', component: JedecouvrelunchtimeComponent },
        { path: 'signinup', component: SigninupComponent },
        { path: 'decouvrirlunchtime', component: JedecouvrelunchtimeComponent },
        { path: 'lesactus', component: LesactusComponent },
        { path: 'quisommesnous', component: QuisommesnousComponent },
        { path: 'introuvable', component: IntrouvableComponent}
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
    
}