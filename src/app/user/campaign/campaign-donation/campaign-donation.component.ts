import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { HostListener } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import * as faker from 'faker'; //fake API to populate data
import * as firebase from 'firebase';
import { EditdonationComponent } from 'src/app/dialog/donation/editdonation/editdonation.component';
import { ApprovedialogComponent } from 'src/app/dialog/campaign/approvedialog/approvedialog.component';

@Component({
  selector: 'app-campaign-donation',
  templateUrl: './campaign-donation.component.html',
  styleUrls: ['./campaign-donation.component.scss']
})
export class CampaignDonationComponent implements AfterViewInit {

query: string;

 constructor(public authService: AuthService,
              private afs: AngularFirestore,
              public dialog: MatDialog,
              private _route: ActivatedRoute) {}


//browser back button listener
  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    console.log('Back button pressed');
  }

  
  //data table column name
  displayedColumns = ['donor_id', 'donation_date','donation_bloodtype', 'donation_bloodid' , 'donation_amount' ,'donation_type' , 'edit', 'delete'];

  dataSourceApprove: MatTableDataSource<any>;
  dataSourceNotYetApprove: MatTableDataSource<any>;

  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //to enable paginator
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit(): void {

    this.query = this._route.snapshot.queryParamMap.get('campaign_id');

    this.afs.collection<any>('donation', ref => ref.where("campaign_id", "==", this.query).where("donation_status", "==" ,"approve")).valueChanges().subscribe(data => {
      this.dataSourceApprove = new MatTableDataSource(data);
      this.dataSourceApprove.sort = this.sort;
      this.dataSourceApprove.paginator = this.paginator;

    })

    this.afs.collection<any>('donation', ref => ref.where("campaign_id", "==", this.query).where("donation_status", "==" ,"notyet")).valueChanges().subscribe(data => {
      this.dataSourceNotYetApprove = new MatTableDataSource(data);
      this.dataSourceNotYetApprove.sort = this.sort;
      this.dataSourceNotYetApprove.paginator = this.paginator;

    })

  }

  applyFilter(filterValue: string){
    filterValue.trim()
    filterValue.toLowerCase();
    this.dataSourceApprove.filter = filterValue
    
  }
  
  applyFilterNeedAproval(filterValue: string){
    filterValue.trim()
    filterValue.toLowerCase();
    this.dataSourceNotYetApprove.filter = filterValue
    
  }

  updateDialog(data): void {
    const dialogRef = this.dialog.open(EditdonationComponent, {
      width: '390px',
      height: '420px',
      data: data,
    });
  }

  approveDialog(data): void{
    const dialogRef = this.dialog.open(ApprovedialogComponent, {
      width: '700px',
      height: '700px',
      data: data,
    });
  }

  delete(id) {
    this.afs.collection('donation').doc(id).delete()
    this.afs.collection('donationForm').doc(id).delete()
  }
  
  trackByUid(index, item) {
    return item.uid;
  }

  

}
