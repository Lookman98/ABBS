import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Rh, BloodType, Gender }  from  '../../../shared/services/blood';
import * as firebase from 'firebase';
import { from } from 'rxjs';


@Component({
  selector: 'app-edonor-dialog',
  templateUrl: './edonor-dialog.component.html',
  styleUrls: ['./edonor-dialog.component.scss']
})
export class EDonorDialogComponent implements OnInit {
  
  donor_name: string;
  donor_ic: string;
  donor_age: number;
  donor_gender: string;
  donor_number: string
  donor_address1: string;
  donor_address2: string;
  donor_postcode: string;
  donor_bloodtype: string;
  donor_rhesus: string;
  last_donate: string;

  //variable to access pass donor data from donor component
  bloodType : string;
  rh: string;

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EDonorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {
  
    //get donor data from donor component
    this.donor_name  = this.data.donor_name;
    this.donor_ic = this.data.donor_ic;
    this.donor_age = this.data.donor_age;
    this.donor_gender = this.data.donor_gender;
    this.donor_number = this.data.donor_number;
    this.donor_address1 = this.data.donor_address1;
    this.donor_address2 = this.data.donor_address2;
    this.donor_postcode = this.data.donor_postcode;
    this.donor_bloodtype = this.data.donor_bloodgroup;
    this.donor_rhesus =  this.data.donor_rhesus;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  update(name,ic,age,gender,number,add1,add2,postcode,bloodtype,rhesus) {

    
      this.donor_name = name.toUpperCase(),
      this.donor_ic = ic,
      this.donor_age = age,
      this.donor_gender =  gender,
      this.donor_number = number,
      this.donor_address1 = add1.toUpperCase(),
      this.donor_address2 = add2.toUpperCase(),
      this.donor_postcode = postcode,
      this.donor_bloodtype = bloodtype,
      this.donor_rhesus =  rhesus,
      //this.last_donate  = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString(),

    
  
    this.afs.collection('donor')
            .doc(this.data.donor_ic)
            .update({donor_name: this.donor_name,
                    donor_ic: this.donor_ic,
                    donor_age: this.donor_age,
                    donor_gender: this.donor_gender,
                    donor_number: this.donor_number,
                    donor_address1: this.donor_address1,
                    donor_address2: this.donor_address2,
                    donor_postcode: this.donor_postcode,
                    donor_bloodgroup: this.donor_bloodtype,
                    donor_rhesus: this.donor_rhesus,
                    //last_donation: this.last_donate
                    })
    this.dialogRef.close();
  }

  
  rhs: Rh[] = [
    {value: '+', viewValue: '+'},
    {value: '-', viewValue: '-'},
  ];

  bloodtypes: BloodType[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'O', viewValue: 'O'},
    {value: 'B', viewValue: 'B'},
    {value: 'AB', viewValue: 'AB'},
  ];
  
  
  genders: Gender[] = [
    {value: 'FEMALE', viewValue: 'FEMALE'},
    {value: 'MALE', viewValue: 'MALE'},
  ];
  
  
}

