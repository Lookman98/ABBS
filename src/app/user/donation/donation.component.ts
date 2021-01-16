import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as faker from 'faker'; //fake API to populate data
import * as firebase from 'firebase';
import { AdddonationComponent } from 'src/app/dialog/donation/adddonation/adddonation.component';
import { EditdonationComponent } from 'src/app/dialog/donation/editdonation/editdonation.component';


@Component({
  selector: 'app-donation',
  templateUrl: './donation.component.html',
  styleUrls: ['./donation.component.scss']
})
export class DonationComponent implements AfterViewInit {

  donation_id: string;
  donor_id:string;
  donation_date:string;
  donation_bloodtype: string;
  donation_amount: number;
  donation_bloodid: string;
  donation_type:string;

  
  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private _router: Router) { }

  

  //browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }


  //data table column name
  displayedColumns = ['donor_id', 'donation_date','donation_bloodtype', 'donation_bloodid' , 'donation_amount' ,'donation_type' , 'edit', 'delete'];
  dataSource: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //to enable paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;


  ngAfterViewInit() {

    this.afs.collection<any>('donation', ref => ref.where("donation_status", "==", "approve")).valueChanges().subscribe(data => {
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
    const dialogRef = this.dialog.open(EditdonationComponent, {
      width: '390px',
      height: '420px',
      data: data,
    });
  }
  
  addDialog(): void {
    const dialogRef = this.dialog.open(AdddonationComponent, {
      width: '390px',
      height: '490px',
    });
  }
  

  addFakeData(){
    const donation = {

      donation_id: "D"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      donor_ic: "980807015227",
      donation_bloodtype: "A",
      donation_bloodid:"A"+faker.random.alphaNumeric(2) + Math.floor(Math.random() * (100 - 1 + 1)) + 1,
      donation_date: new Date(firebase.firestore.Timestamp.now().seconds*1002.1).toLocaleDateString(),
      donation_amount: Math.floor(Math.random() * (10 - 1 + 1)) + 1,
      donation_type: "walk-in",
            
    }
     //  console.log(donation);
    this.afs.collection('donation').doc(donation.donation_id).set(donation);
    // this.afs.collection('donor').doc(donation.donor_ic).update({last_donation: donation.donation_date});


  }
  
  delete(id) {
    this.afs.collection('donation').doc(id).delete()
  }
  
  trackByUid(index, item) {
    return item.uid;
  }

}
