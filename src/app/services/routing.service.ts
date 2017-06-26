import { SigninupComponent } from './../auth/signinup/signinup.component';
//Modules:
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import all components
import { MainComponent } from './../components/main/main.component';
import { IntrouvableComponent } from './../components/introuvable/introuvable.component';
import { SignupComponent } from './../auth/signup/signup.component';
import { SigninComponent } from './../auth/signin/signin.component';

//Routes:
const appRoutes: Routes = [
    { path: '', component: MainComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'signin', component: SigninComponent},
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