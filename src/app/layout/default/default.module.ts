import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { BloodbankComponent } from 'src/app/user/bloodbank/bloodbank.component';
import { CampaignComponent } from 'src/app/user/campaign/campaign.component';
import { DonationComponent } from 'src/app/user/donation/donation.component';
import { DonorComponent } from 'src/app/user/donor/donor.component';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule } from '@angular/forms';
import { DashboardAdminComponent } from 'src/app/admin/dashboard-admin/dashboard-admin.component';
import { RegisterUserComponent } from 'src/app/register-user/register-user.component';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EditdialogComponent } from '../../dialog/bloodbank/editdialog/editdialog.component';
import { AddbloodgroupDialogComponent } from '../../dialog/bloodbank/addbloodgroup-dialog/addbloodgroup-dialog.component';
import { BloodrecordComponent } from 'src/app/user/bloodrecord/bloodrecord.component';
import { EditBRecDialogComponent } from 'src/app/dialog/bloodbank/edit-brec-dialog/edit-brec-dialog.component';
//import { AddBRecDialogComponent } from 'src/app/dialog/bloodbank/add-brec-dialog/add-brec-dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { ACampdialogComponent } from 'src/app/dialog/campaign/a-campdialog/a-campdialog.component';
import { DCampdialogComponent } from 'src/app/dialog/campaign/d-campdialog/d-campdialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ADonorDialogComponent } from 'src/app/dialog/donor/adonor-dialog/adonor-dialog.component';
import { EDonorDialogComponent } from 'src/app/dialog/donor/edonor-dialog/edonor-dialog.component';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [
   DashboardComponent,
   DefaultComponent,
   BloodbankComponent,
   CampaignComponent,
   DonationComponent,
   DonorComponent,
   DashboardAdminComponent,
   RegisterUserComponent,
   EditdialogComponent,
   AddbloodgroupDialogComponent,
   BloodrecordComponent,
   //AddBRecDialogComponent,
   EditBRecDialogComponent,
   ACampdialogComponent,
   DCampdialogComponent,
   ADonorDialogComponent,
   EDonorDialogComponent,

   
 
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatSidenavModule,
    MatDividerModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    MDBBootstrapModule,
    FormsModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatSelectModule
   
    
    
  ],
  entryComponents: [EditdialogComponent,AddbloodgroupDialogComponent],
})
export class DefaultModule { }
