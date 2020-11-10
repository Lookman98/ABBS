import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from "../../services/auth.service";
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  isAdmin: any;
  isBBS: any;
  constructor(public authService: AuthService,
    public afAuth: AngularFireAuth,
    public afs: AngularFirestore) { }

  ngOnInit(): void {
   this.afAuth.auth.onAuthStateChanged(user => {
    //  console.log(user.uid);
      if(user){
        this.afs.doc(`users/${user.uid}`)
        .get().subscribe(usersSnapshot =>{
        if(usersSnapshot.data().role == "administrator"){
          this.isAdmin = "administrator";
        }
        else{
          this.isBBS = "bloodbankstaff"
        }
        })
      }
    })


  //   this.isBBS =  this.afAuth.auth.onAuthStateChanged(user => {
  //     if(user){
  //       this.afs.doc(`users/${user.uid}`)
  //       .get().subscribe(usersSnapshot =>{
  //         this.isBBS = usersSnapshot.data().bloodbankstaff;
  //       })
  //     }
  //   })
  // }
  }
}

  


