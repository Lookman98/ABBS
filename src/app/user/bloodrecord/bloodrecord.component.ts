import { ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//import { AddBRecDialogComponent } from 'src/app/dialog/bloodbank/add-brec-dialog/add-brec-dialog.component';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-bloodrecord',
  templateUrl: './bloodrecord.component.html',
  styleUrls: ['./bloodrecord.component.scss']
})
export class BloodrecordComponent implements AfterViewInit {

  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog) { }


    number: number;
    name: string;
    //browser back button listener
    @HostListener('window:popstate', ['$event'])
    onPopState(event) {
      console.log('Back button pressed');
    }
  
    //data table column name
    displayedColumns = ['bloodgroup', 'quantity', 'edit', 'delete'];
    dataSource: MatTableDataSource<any>;
  
    //to enable sorting
    @ViewChild(MatSort) sort: MatSort;
  
    ngAfterViewInit() {
      this.afs.collection<any>('bloodbank').valueChanges().subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
  
      })
    }
  
    applyFilter(filterValue: string) {
      filterValue.trim();
      filterValue.toLocaleLowerCase();
      this.dataSource.filter = filterValue;
    }
  
    // updateDialog(data): void {
    //   const dialogRef = this.dialog.open(EditBRecDialogComponent, {
    //     width: '270px',
    //     height: '260px',
    //     data: data,
    //   });
    // }
  
    // addDialog(): void {
    //   const dialogRef = this.dialog.open(AddBRecDialogComponent, {
    //     width: '270px',
    //     height: '260px'
    //   });
    // }
  
  
    delete(id) {
      this.afs.collection('bloodbank').doc(id).delete()
    }
  
    trackByUid(index, item) {
      return item.uid;
    }
}
