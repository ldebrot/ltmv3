//Modules:
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import all components
import { MainComponent } from './../components/main/main.component';
import { IntrouvableComponent } from './../components/introuvable/introuvable.component';
import { SigninupComponent } from './../auth/signinup/signinup.component';

//Routes:
const appRoutes: Routes = [
    { path: '', component: MainComponent},
    { path: 'signinup', component: SigninupComponent},
    { path: 'introuvable', component: IntrouvableComponent},
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