import { HostListener, ViewChild } from '@angular/core';
import { Component, AfterViewInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { RegisterUserComponent } from 'src/app/register-user/register-user.component';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UserupdateComponent } from '../userupdate/userupdate.component';
import { User } from "../../shared/services/user";
// import * as admin from '../../../assets/js/adminservice';




@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.scss']
})
export class DashboardAdminComponent implements AfterViewInit {

  sideBarOpen = true;
  db: any;
  PATH: string;
 
  constructor(public authService: AuthService,
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    public dialog: MatDialog,
    public _router: Router) { }


  //backpress listener
  @HostListener('window:popstate', ['$event'])
  onPopState() {
    console.log('Back button pressed');
  }

  //declare table column
  displayedColumns: string[] = ['name', 'email', 'verify', 'delete'];
  dataSource: MatTableDataSource<any>;
  // 'role',
  //to enable sorting
  @ViewChild(MatSort) sort: MatSort;
  //table paginator
  @ViewChild(MatPaginator, {static:true} ) paginator: MatPaginator;

  
  ngAfterViewInit(){
    this.afs.collection<any>('users').valueChanges().subscribe( data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
    
  console.log(this.authService.userData);
  }

  applyFilter(filterValue: string){
    filterValue.trim();
    filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  editUser(data){
    this.dialog.open(UserupdateComponent,{
      width:'350px',
      height:'350px'
    });
  }

  // addDialog(){
  //   this._router.navigate(['dashboard/bloodrecord']
  // }

  delete(id){
    this.afs.doc(`users/${id}`).delete();
    // admin.auth().deleteUser(id);
  
  }

  // remove(user: any, path: string) { 
  //   return this.db.list(this.PATH + path).remove(user.key) .then(() => { 
  //     firebase.auth(  ).signInWithEmailAndPassword(user.email, user.password) .then(function (info) { 
  //       var user = firebase.auth().currentUser; 
  //       user.delete(); 
  //     }); 
  //   }); 
  // }
  
  trackByUid(item) {
    return item.uid;
  }


}


