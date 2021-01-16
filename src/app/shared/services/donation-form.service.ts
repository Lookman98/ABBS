import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { DonationForm } from '../services/user'
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";



@Injectable({
  providedIn: 'root'
})
export class DonationFormService {

  donationFormCollection: AngularFirestoreCollection<DonationForm>;
  donationform: Observable<DonationForm[]>

  constructor(public afs: AngularFirestore) { 

  }


  getDonationForms(donationID: DonationForm){
    this.donationFormCollection = this.afs.collection('donationForm/${donationID.donation_id}');
    return this.donationFormCollection.snapshotChanges()

    // .pipe(map(changes =>{
    //   return changes.map(a => {
    //     const data = a.payload.doc.data() as DonationForm;
    //     data.donationform_id = a.payload.doc.id;
    //     return data;
    //   });
    // }));
  }

 
}

