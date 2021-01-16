import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Approve, BloodType } from '../../../shared/services/blood';
import { EditdonationComponent } from '../../donation/editdonation/editdonation.component';
import { DonationForm } from '../../../shared/services/user'
import * as firebase from 'firebase';
import { DonationFormService } from 'src/app/shared/services/donation-form.service';

@Component({
  selector: 'app-approvedialog',
  templateUrl: './approvedialog.component.html',
  styleUrls: ['./approvedialog.component.scss']
})
export class ApprovedialogComponent implements OnInit {

  donation_status: string;
  donation_id: string;
  donationforms: DonationForm[];
  one: string;

  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<EditdonationComponent>,
    private donationFormService: DonationFormService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }


  ngOnInit(): void {  
    this.donation_id = this.data.donation_id

    // this.donationFormService.getDonationForms(this.data.donation_id).subscribe(data => {
    //   this.donationforms = data.map(e => {
    //     return {
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data()
    //     } as DonationForm;
    //   })
    // })

    this.afs.collection('donationForm').doc(this.donation_id).get().toPromise().then(function(doc){
        console.log(doc.data());
    });


  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  update(status) {

      this.donation_status = status

      const bloodbank = {
        bloodType: this.data.donation_bloodtype,
        lastupdate: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString('en-GB'),
        expiredDate: new Date(firebase.firestore.Timestamp.now().seconds*1002.1).toLocaleDateString('en-GB'),
        uid: this.data.donation_bloodid,

      }

      if(this.donation_status == "approve"){
        this.afs.collection('bloodbank').doc(this.data.donation_bloodid).set(bloodbank)
      }
  
      this.afs.collection('donation')
              .doc(this.data.donation_id)
              .update({donation_status: this.donation_status});
      this.dialogRef.close();
      
   
    }


  approvals: Approve[] = [
    {value: 'approve', viewValue: 'Approve'},
    {value: 'not approve', viewValue: 'Not Approve'},

  ];



}
