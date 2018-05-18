import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        pathMatch: 'full'
    },
    {
        path: 'security-questions',
        loadChildren: 'app/modules/security-questions/security-questions.module#SecurityQuestionsModule'
    },
    {
        path: 'password-reset',
        loadChildren: 'app/modules/password-reset/password-reset.module#PasswordResetModule'
    },
    {
        path: 'calendar',
        loadChildren: 'app/modules/calendar/calendar.module#CalendarModule'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
