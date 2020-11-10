import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';
import * as faker from 'faker';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-a-campdialog',
  templateUrl: './a-campdialog.component.html',
  styleUrls: ['./a-campdialog.component.scss']
})
export class ACampdialogComponent implements OnInit {

  campName: string;
  campLocation: string;
  campDate: string;
  timeFrom: string;
  timeTo: string;


  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<ACampdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  add(campName, campLocation, campDate, timeFrom, timeTo): void {
    const campaign = {

      camp_name: campName.toUpperCase(),
      camp_location: campLocation.toUpperCase(),
      camp_date: this.authService.formatDate(campDate),
      time_from: timeFrom,
      time_to: timeTo,
      uid: faker.random.alphaNumeric(16)
    }
    // console.log(campaign);
    this.afs.collection('campaign').doc(campaign.uid).set(campaign),
      this.dialogRef.close();
  }

}
