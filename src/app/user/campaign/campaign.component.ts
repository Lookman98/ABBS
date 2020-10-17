
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

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements AfterViewInit {



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
  displayedColumns = ['camp_name', 'camp_date', 'camp_location', 'time_from', 'time_to','edit', 'delete' , 'detail'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //to enable paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    this.afs.collection<any>('campaign').valueChanges().subscribe(data => {
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
  const dialogRef = this.dialog.open(DCampdialogComponent, {
    width: '270px',
    height: '260px',
    data: data,
  });
}

addDialog(): void {
  const dialogRef = this.dialog.open(ACampdialogComponent, {
    width: '300px',
    height: '470px'
  });
}


delete(id) {
  this.afs.collection('campaign').doc(id).delete()
}

trackByUid(index, item) {
  return item.uid;
}


}
