import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';
import { BloodType, Rh , Gender} from '../../../shared/services/blood';
import * as faker from 'faker';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-addbloodgroup-dialog',
  templateUrl: './addbloodgroup-dialog.component.html',
  styleUrls: ['./addbloodgroup-dialog.component.scss']
})
export class AddbloodgroupDialogComponent implements OnInit {
  @Input()
  bloodName: string;
  bloodRh: string;
  bloodQuantity: number;
  i: number;

  constructor(private afs: AngularFirestore,
              public dialogRef: MatDialogRef<AddbloodgroupDialogComponent>,
              authService: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // updateBlood(): void {
  //   this.afs.collection('bloodbank').doc(this.data.uid).set({ bloodgroup: this.bloodGroup,quantity: this.quantity, })
  //   this.dialogRef.close();
  // }

  addBlood(name,bloodrhesus):void {
    
  
      const bloodbank = {

        bloodType: name.toUpperCase(),
        rhesus: bloodrhesus,
        lastupdate: new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString('en-GB'),
        expiredDate: new Date(firebase.firestore.Timestamp.now().seconds*1002.1).toLocaleDateString('en-GB' ),
       // quantity: quantity,
        uid: "A"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      }
      this.afs.collection('bloodbank').doc(bloodbank.uid).set(bloodbank),
      this.dialogRef.close();
   
  }

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

