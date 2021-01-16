import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as faker from 'faker';
import * as firebase from 'firebase';
import { BloodType, Rh , Gender} from '../../../shared/services/blood';

@Component({
  selector: 'app-adddonation',
  templateUrl: './adddonation.component.html',
  styleUrls: ['./adddonation.component.scss']
})
export class AdddonationComponent implements OnInit {

  donation_id: string;
  donation_date:string;
  donation_bloodtype: string;
  donation_amount: number;
  donation_bloodid: string;
  donation_type:string;


  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<AdddonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


  add(donor_ic,donation_bloodtype,donation_date,donation_amount,donation_type){

    const donation = {

      donation_id: "D"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      donor_ic: donor_ic,
      donation_bloodtype: donation_bloodtype.toUpperCase(),
      donation_bloodid:"A"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      donation_date: this.authService.formatDate(donation_date),
      donation_amount: donation_amount,
      donation_type: donation_type,
      donation_status: "approve",
            
    }

    const bloodbank = {

      bloodType: donation_bloodtype.toUpperCase(),
      lastupdate: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString(),
      expiredDate: new Date(firebase.firestore.Timestamp.now().seconds*1002.1).toLocaleDateString(),
     // quantity: quantity,
      uid:donation.donation_bloodid,
    }
    this.afs.collection('bloodbank').doc(bloodbank.uid).set(bloodbank),
    this.afs.collection('donation').doc(donation.donation_id).set(donation);
    this.afs.collection('donor').doc(donation.donor_ic).update({last_donation: donation.donation_date});
    this.dialogRef.close();

  }

  
  bloodtypes: BloodType[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'O', viewValue: 'O'},
    {value: 'B', viewValue: 'B'},
    {value: 'AB', viewValue: 'AB'},
  ];

}
