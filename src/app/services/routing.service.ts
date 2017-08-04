//Modules:
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import all components
import { StartNotconnectedComponent } from './../components/startnotconnected/startnotconnected.component';
import { IntrouvableComponent } from './../components/introuvable/introuvable.component';
import { SigninupComponent } from './../auth/signinup/signinup.component';
import { JedecouvrelunchtimeComponent } from './../components/notconnected/jedecouvrelunchtime/jedecouvrelunchtime.component';

//Routes:
const appRoutes: Routes = [
    { path: '', component: StartNotconnectedComponent,
    children: [
        { path: '', component: JedecouvrelunchtimeComponent },
        { path: 'signinup', component: SigninupComponent },
        { path: 'decouvrirlunchtime', component: JedecouvrelunchtimeComponent },
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