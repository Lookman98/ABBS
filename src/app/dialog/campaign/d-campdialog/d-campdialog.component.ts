import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';

import * as faker from 'faker';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-d-campdialog',
  templateUrl: './d-campdialog.component.html',
  styleUrls: ['./d-campdialog.component.scss']
})
export class DCampdialogComponent implements OnInit {

  camp_name: string;
  camp_location: string;
  camp_date: string;
  time_from: string;
  time_to: string;

  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<DCampdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.camp_name = this.data.camp_name;
    this.camp_location = this.data.camp_location;
    this.camp_date = new Date(this.data.camp_date).toLocaleDateString("en-UK");
    this.time_from = this.data.time_from;
    this.time_to = this.data.time_to;

  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  update(campName, campLocation, campDate, timeFrom, timeTo): void {

      this.camp_name = campName.toUpperCase(),
      this.camp_location = campLocation.toUpperCase(),
      this.camp_date = campDate,
      this.time_from = timeFrom,
      this.time_to = timeTo

    if (this.camp_name == "" || this.camp_location == "" || this.camp_date == "")
    alert("There is empty field");
    else {

      // console.log(campaign);
      this.afs
        .collection('campaign')
        .doc(this.data.uid)
        .update({
          camp_name: this.camp_name.toUpperCase(),
          camp_location: this.camp_location.toUpperCase(),
          camp_date: this.authService.formatDate(campDate),
          time_from: this.time_from,
          time_to: this.time_to,
        });
      this.dialogRef.close();
    }
  }


}
  






