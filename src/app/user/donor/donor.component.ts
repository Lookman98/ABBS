
import { HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';

//import component

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ACampdialogComponent } from '../../dialog/campaign/a-campdialog/a-campdialog.component';
import { DCampdialogComponent } from '../../dialog/campaign/d-campdialog/d-campdialog.component';
import * as faker from 'faker'; //fake API to populate data
import { ADonorDialogComponent } from 'src/app/dialog/donor/adonor-dialog/adonor-dialog.component';
import { EDonorDialogComponent } from 'src/app/dialog/donor/edonor-dialog/edonor-dialog.component';


@Component({
  selector: 'app-donor',
  templateUrl: './donor.component.html',
  styleUrls: ['./donor.component.scss']
})
export class DonorComponent implements AfterViewInit {


  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog) { }

  

  //browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

  // 
  //data table column name
  displayedColumns = ['donor_name', 'donor_ic','donor_age', 'donor_gender', 'donor_number','donor_address1','donor_address2','donor_postcode','donor_bloodgroup','donor_rhesus','last_donate','edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //to enable paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.afs.collection<any>('donor').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

    })
  }

 applyFilter(filterValue: string) {
  filterValue.trim();
  filterValue.toLocaleLowerCase();
  this.dataSource.filter = filterValue;
}

updateDialog(data): void {
  const dialogRef = this.dialog.open(EDonorDialogComponent, {
    width: '270px',
    height: '260px',
    data: data,
  });
}

addDialog(): void {
  const dialogRef = this.dialog.open(ADonorDialogComponent, {
    width: '300px',
    height: '780px'
  });
}


delete(id) {
  this.afs.collection('donor').doc(id).delete()
}

trackByUid(index, item) {
  return item.uid;
}


}

