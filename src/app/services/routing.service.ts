//Services:
import { authGuardService } from './authguard.service';

//Modules:
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//import all components
import { StartNotconnectedComponent } from './../components/startnotconnected/startnotconnected.component';
import { IntrouvableComponent } from './../components/introuvable/introuvable.component';
import { SigninupComponent } from './../auth/signinup/signinup.component';
import { QuisommesnousComponent } from './../components/notconnected/quisommesnous/quisommesnous.component';
import { LesactusComponent } from './../components/notconnected/lesactus/lesactus.component';
import { QuizzComponent } from './../components/beneficiaire/quizz/quizz.component';
import { CardsetcontainerComponent } from './../components/beneficiaire/quizz/cardset/cardsetcontainer.component';
import { TestComponent } from './../components/test/test.component';
import { NotconnectedstartingpageComponent } from 'app/components/notconnected/notconnectedstartingpage/notconnectedstartingpage.component';
import { QuizzselectionComponent } from '../components/beneficiaire/quizz/quizzselection/quizzselection.component';

//Routes:
const appRoutes: Routes = [
    { path: '', component: StartNotconnectedComponent,
    children: [
        { path: '', canActivate: [authGuardService], component: NotconnectedstartingpageComponent },
        { path: 'signinup', canActivate: [authGuardService], component: SigninupComponent },
        { path: 'lesactus', canActivate: [authGuardService], component: LesactusComponent },
        { path: 'quisommesnous', canActivate: [authGuardService], component: QuisommesnousComponent },
        { path: 'introuvable', canActivate: [authGuardService], component: IntrouvableComponent},
        { path: 'test', component: TestComponent},//test component to try out things
        { path: 'quizz', component: QuizzComponent},//quizz component showing cardsetcontainer>cardsets
        { path: 'quizzselection', component: QuizzselectionComponent}//quizz selection component showing available quizzes
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