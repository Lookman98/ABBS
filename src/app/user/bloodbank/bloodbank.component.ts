
import { HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
//import component

import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EditdialogComponent } from '../../dialog/bloodbank/editdialog/editdialog.component';
import { AddbloodgroupDialogComponent } from '../../dialog/bloodbank/addbloodgroup-dialog/addbloodgroup-dialog.component';
import * as faker from 'faker';


@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.scss']
})
export class BloodbankComponent implements AfterViewInit {

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog) { }

  

  //browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

  
  //data table column name
  displayedColumns = ['serial_no','bloodtype','lastupdate','expiredDate','edit','delete', 'more'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.afs.collection<any>('bloodbank',ref => ref.where('bloodType','==','A+')).valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  updateDialog(data): void {
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '270px',
      height: '260px',
      data: data,
    });
  }

  addDialog(): void {
    const dialogRef = this.dialog.open(AddbloodgroupDialogComponent, {
      width: '270px',
      height: '260px'
    });
  }


  delete(id,name) {
    if(confirm("Are you sure to delete blood group: "+name)){
      this.afs.collection('bloodbank').doc(id).delete()
    }
    
  }

  trackByUid(index, item) {
    return item.uid;
  }

  
}

