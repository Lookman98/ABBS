import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';
import { BloodType, Rh , Gender} from '../../../shared/services/blood';
import * as faker from 'faker';
import { Time } from '@angular/common';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-adonor-dialog',
  templateUrl: './adonor-dialog.component.html',
  styleUrls: ['./adonor-dialog.component.scss']
})
export class ADonorDialogComponent implements OnInit {

  d_Name: string;
  d_Age: number;
  d_IC: string;
  d_gender: string;
  d_number: string;
  d_address1: string;
  d_address2: string;
  d_postcode: string;
  d_bloodgroup: string;
  d_rhesus: string;
  d_email: string;
  


  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<ADonorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    // const bloodType=this.afs.collection('bloodbank').get().subscribe( data => {
    //   data.docs.forEach(doc =>{
    //     console.log(doc.data())
    //   })
    // })
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }

  // 
  add(d_Name,d_IC,d_Age,d_gender,d_number,d_address1,d_address2,d_postcode,d_bloodgroup,d_rhesus):void {
    const donor = {
      donor_name: d_Name.toUpperCase(),
      donor_ic:d_IC,
      donor_age: d_Age,
      donor_gender: d_gender,
      donor_number: d_number,
      donor_address1: d_address1.toUpperCase(),
      donor_address2: d_address2.toUpperCase(),
      donor_postcode: d_postcode,
      donor_bloodgroup: d_bloodgroup.toUpperCase(),
      donor_rhesus: d_rhesus.toUpperCase(),
      uid: "DO"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
  }
    //console.log(donor);
    this.afs.collection('donor').doc(donor.donor_ic).set(donor),
    this.dialogRef.close();
  }

  genders: Gender[] = [
    {value: 'MALE', viewValue: 'Male'},
    {value: 'FEMALE', viewValue: 'Female'}
  ];

  bloodtypes: BloodType[] = [
    {value: 'A', viewValue: 'A'},
    {value: 'O', viewValue: 'O'},
    {value: 'B', viewValue: 'B'},
    {value: 'AB', viewValue: 'AB'},
  ];

  rhs: Rh[] = [
    {value: '+', viewValue: '+'},
    {value: '-', viewValue: '-'},
  ];

}

