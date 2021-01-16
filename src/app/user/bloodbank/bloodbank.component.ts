
import { HostListener, ViewChild, AfterViewInit, Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from "../../shared/services/auth.service";
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AddbloodgroupDialogComponent } from 'src/app/dialog/bloodbank/addbloodgroup-dialog/addbloodgroup-dialog.component';


@Component({
  selector: 'app-bloodbank',
  templateUrl: './bloodbank.component.html',
  styleUrls: ['./bloodbank.component.scss']
})
export class BloodbankComponent implements AfterViewInit {

  
  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private _router: Router) { }

  

  //browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    console.log('Back button pressed');
  }

  // 'serial_no','lastupdate','expiredDate','edit','delete',
  //data table column name
  displayedColumns = ['bloodtype','more'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {
    this.afs.collection<any>('bloodtype').valueChanges().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    })
    
  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue.toLocaleLowerCase();
    this.dataSource.filter = filterValue;
  }

  updateDialog(): void {
  }

  addDialog(): void {
    const dialogRef = this.dialog.open(AddbloodgroupDialogComponent, {
      width: '270px',
      height: '290px'
    });
  }


  delete(id,name) {
    if(confirm("Are you sure to delete blood group: "+name+id)){
      this.afs.collection('bloodbank').doc(id).delete()
    }
    
  }

  trackByUid(item) {
    return item.uid;
  }

  //put extra data to redirect page
  viewRecord(bloodType){
      // console.log(bloodType),
      this._router.navigate(['dashboard/bloodrecord'],
      {
        queryParams:{
          'selectedBlood': bloodType,
        }
      }
    
      );
  }
  
}

