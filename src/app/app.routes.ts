import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { loggedGuard } from './core/guards/logged/logged.guard';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
    {path:'',redirectTo:'',pathMatch:'full'},
    {path: '',component: BlankLayoutComponent,canActivate:[authGuard],
        children:[
            {path:'',redirectTo:'home',pathMatch:'full'},
            {path: 'home',component: HomeComponent,title: 'Timeline'}
    ]},
    {path:'',component: AuthLayoutComponent ,canActivate: [loggedGuard],
        children:[
            {path:'',redirectTo:'login',pathMatch:'full'},
            {path: 'login',component: LoginComponent},
            {path: 'register',component: RegisterComponent}
    ]}
   ];
