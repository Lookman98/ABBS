
import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as faker from 'faker';
import * as firebase from 'firebase';
import { BloodType, Rh, Gender } from '../../../shared/services/blood';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';

@Component({
  selector: 'app-editdonation',
  templateUrl: './editdonation.component.html',
  styleUrls: ['./editdonation.component.scss']
})
export class EditdonationComponent implements OnInit {

  donation_id: string;
  ic: string;
  donation_date: string;
  donation_bloodtype: string;
  donation_amount: number;
  donation_bloodid: string;
  donation_type: string;

  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<EditdonationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.donation_id = this.data.donation_id;
    this.ic = this.data.donor_ic;
    this.donation_date = this.data.donation_date;
    this.donation_bloodtype = this.data.donation_bloodtype;
    this.donation_amount = this.data.donation_amount;
    this.donation_type = this.data.donation_type;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  update(donor_ic, BloodType, amount, type) {

    if(donor_ic == "" || BloodType == "" ||  amount == "" || type == "")
      alert("There is empty field");
      else{
        this.donation_id = this.data.donation_id;
        this.ic = donor_ic;
        // this.donation_date = this.authService.formatDate(date);
        this.donation_bloodtype = BloodType;
        this.donation_amount = amount;
        this.donation_type = type;
    
          this.afs.collection('donation')
            .doc(this.donation_id)
            .update(
              {
                donor_ic: this.ic,
                // donation_date: this.donation_date,
                donation_bloodtype: this.donation_bloodtype,
                donation_amount: this.donation_amount,
              
              });
              this.dialogRef.close();
      }
   
    }
          


bloodtypes: BloodType[] = [
  { value: 'A', viewValue: 'A' },
  { value: 'O', viewValue: 'O' },
  { value: 'B', viewValue: 'B' },
  { value: 'AB', viewValue: 'AB' },
];

}
