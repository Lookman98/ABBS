import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { DefaultComponent } from './layout/default/default.component';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { BloodbankComponent } from './user/bloodbank/bloodbank.component';
import { CampaignComponent } from './user/campaign/campaign.component';
import { DonationComponent } from './user/donation/donation.component';
import { DonorComponent } from './user/donor/donor.component';
import { AuthGuard } from "./shared/guard/auth.guard";
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { NotfoundComponent } from '../app/shared/notfound/notfound.component';

const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'sign-in', component: LoginComponent},
  {path: 'verifyuser', component: VerifyEmailComponent,canActivate: [AuthGuard]},
  { path: 'dashboard', component:DefaultComponent,canActivate: [AuthGuard],
  children: [
    {path: 'administrator', component:DashboardAdminComponent, canActivate: [AuthGuard] },
    {path: 'register', component:RegisterUserComponent, canActivate: [AuthGuard] },
    {path: 'bloodbank', component:BloodbankComponent, canActivate: [AuthGuard] },
    {path: 'campaign', component:CampaignComponent,canActivate: [AuthGuard] },
    {path: 'donation', component:DonationComponent,canActivate: [AuthGuard] },
    {path: 'donor', component:DonorComponent, canActivate: [AuthGuard]},
    {path: 'register-user', component: RegisterUserComponent,canActivate: [AuthGuard]},
    {path: 'bloodrecord', component: RegisterUserComponent,canActivate: [AuthGuard]},
    // {path: '404', component: NotfoundComponent},
    // {path: '**', redirectTo: '/404'}
   ]
  },
  { path: 'forgot-password', component: ForgotpasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
