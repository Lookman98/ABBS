import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from "../shared/services/auth.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {


  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

    // Sign up with email/password
    // async SignUp(email,password) {
    //   try {
    //     const result = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    //     /* Call the SendVerificaitonMail() function when new user sign
    //     up and returns promise */
    //     this.authService.SendVerificationMail();
    //     // this.SetUserData(result.user);
    //     this.dialogRef.close();
    //   } catch (error) {
    //     window.alert(error.message);
    //   }
    // }
  

}
