import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ACampdialogComponent } from '../a-campdialog/a-campdialog.component';

@Component({
  selector: 'app-print-qr-code',
  templateUrl: './print-qr-code.component.html',
  styleUrls: ['./print-qr-code.component.scss']
})
export class PrintQrCodeComponent implements OnInit {

  camp_name:string;
  camp_date:string;
  camp_location:string;
  time_from:string;
  time_to:string;

  constructor(private afs: AngularFirestore,
    public authService: AuthService,
    public dialogRef: MatDialogRef<ACampdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
  

  ngOnInit(): void {
    this.camp_name = this.data.camp_name;
    this.camp_location = this.data.camp_location;
    this.camp_date =  this.data.camp_date;
    this.time_to = this.data.time_to;
    this.time_from = this.data.time_from;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  print(){
    window.print();
  }

}
