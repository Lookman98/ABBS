import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-editdialog',
  templateUrl: './editdialog.component.html',
  styleUrls: ['./editdialog.component.scss']
})
export class EditdialogComponent implements OnInit {

  newQuantity: number;
  newName: string;

  constructor(
    private afs: AngularFirestore,
    public dialogRef: MatDialogRef<EditdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateQuantity(): void {
    this.afs.collection('bloodbank').doc(this.data.uid).update({ blood: this.newName,quantity: this.newQuantity })
    this.dialogRef.close();
  }
}
