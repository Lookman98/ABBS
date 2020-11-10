import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';
import * as firebase from 'firebase';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { Rh, BloodType }  from  '../../../shared/services/blood';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent implements OnInit {


  rh: string;
  bloodtype: string;
  lastupdate: string;
  editForm: FormGroup;
  dialogrh: string;
  dialogblood: string;


  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

  ngOnInit() {

    this.dialogblood = this.data.bloodType;
   
   }

  onNoClick(): void {
    this.dialogRef.close();
  }



  update(bloodtype,rhesus): void {
    console.log(bloodtype, rhesus);
    this.bloodtype = bloodtype;
    this.rh = rhesus;
    this.lastupdate = new Date(firebase.firestore.Timestamp.now().seconds*1000).toLocaleDateString(),
    this.afs.collection('bloodbank').doc(this.data.uid).update({ bloodType: this.bloodtype,rhesus: this.rh , lastupdate: this.lastupdate})
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


}

