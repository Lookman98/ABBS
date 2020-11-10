import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddbloodgroupDialogComponent } from 'src/app/dialog/bloodbank/addbloodgroup-dialog/addbloodgroup-dialog.component';
import { EditdialogComponent } from 'src/app/dialog/bloodbank/editdialog/editdialog.component';
//import { AddBRecDialogComponent } from 'src/app/dialog/bloodbank/add-brec-dialog/add-brec-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-bloodrecord',
  templateUrl: './bloodrecord.component.html',
  styleUrls: ['./bloodrecord.component.scss']
})
export class BloodrecordComponent implements AfterViewInit {

  query: string;
  number: number;
  name: string;
  quantity: number;

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private _route: ActivatedRoute) { }

  //browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
 
  }


  //data table column name
  displayedColumns = ['serial_no', 'bloodtype', 'rhesus', 'lastupdate', 'expiredDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //to enable paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {
    
    this.query = this._route.snapshot.queryParamMap.get('selectedBlood');

    this.afs.collection<any>('bloodbank', ref => ref.where("bloodType", "==", this.query)).valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.quantity = data.length;

    })
  }


  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }


  updateDialog(data): void {
    // console.log(blood);
    const dialogRef = this.dialog.open(EditdialogComponent, {
      width: '270px',
      height: '300px',
      data: data,

    });
  }




  addDialog(): void {
    const dialogRef = this.dialog.open(AddbloodgroupDialogComponent, {
      width: '270px',
      height: '290px'
    });
  }


  delete(id, name) {
    if (confirm("Are you sure to delete blood group: " + name + id)) {
      this.afs.collection('bloodbank').doc(id).delete()
    }
  }


  trackByUid(index, item) {
    return item.uid;
  }


}
