import { Injectable, NgZone } from '@angular/core';
import { User } from "../services/user";
import { auth, Unsubscribe } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  user$: Observable<User>;
  role: any;
  cUserRole: any;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));

      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    })

   
  }

  async adminSignIn(email,password){
    try {
      
      const result = this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(() => {
        this.router.navigate(['administrator']);
      });
      this.SetUserData((await result).user);
    } catch (error) {
      window.alert(error.message);
    }
  }


  // Sign in with email/password
  async SignIn(email, password) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(email, password);
      this.ngZone.run(async () => {
        this.router.navigate(['dashboard']);
      },
      this.SetUserData((await result).user));
    } catch (error) {
      window.alert(error.message);
    }
  }

  // Sign up with email/password
  // async SignUp(email,password) {
  //   try {
  //     const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  //     /* Call the SendVerificaitonMail() function when new user sign
  //     up and returns promise */
  //     this.SendVerificationMail();
  //     // this.SetUserData(result.user);
  //   } catch (error) {
  //     window.alert(error.message);
  //   }
  // }

  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {
        window.alert("You have been successfully registered!");
        this.SetUserData(result.user);
        console.log(result.user)
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Send email verfificaiton when new user sign up
  async SendVerificationMail() {
    await this.afAuth.auth.currentUser.sendEmailVerification();
    this.router.navigate(['verify-email-address']);
  }

  // Reset Forggot password
  async ForgotPassword(passwordResetEmail) {
    try {
      await this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return (user !== null) ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth logic to run auth providers
  async AuthLogin(provider) {
    try {
      const result = await this.afAuth.auth.signInWithPopup(provider);
      this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
      });
      this.SetUserData(result.user);
    } catch (error) {
      window.alert(error);
    }
  }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

   //determines if user has matching role
  //  checkAuthorization(user: User, allowedRoles: string[]): boolean {
  //   if (!user) return false
  //   for (const role of allowedRoles) {
  //     if ( user.role[role] ) {
  //       return true
  //     }
  //   }
  //   return false
  // }


  // Sign out 
  SignOut() {
    this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['sign-in']);
  }

  formatDate(date: Date): string{
    const day =  new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();
    return `${day}/${month}/${year}`;
  }

}
