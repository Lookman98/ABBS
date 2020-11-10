import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layout/default/default.module';

import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AuthService } from "./shared/services/auth.service";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AdminloginComponent } from './admin/adminlogin/adminlogin.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { MatSelectModule } from '@angular/material/select';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { UserupdateComponent } from './admin/userupdate/userupdate.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    VerifyEmailComponent,
    AdminloginComponent,
    ForgotpasswordComponent,
    UserupdateComponent,
    

    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,   
    MatFormFieldModule,
    MatInputModule,
    AngularFireAuthModule,
    MDBBootstrapModule,
    AngularFireAuthModule,
    MDBBootstrapModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    
  ],
  providers: [AuthService,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
