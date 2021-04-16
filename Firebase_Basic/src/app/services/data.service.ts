import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

export interface Gag {
  title: string;
  creator: string;
  id?: string;
  image: string;
  createdAt?: firebase.default.firestore.FieldValue;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private angularFireStore: AngularFirestore
  ) { }

  addGag(gag: Gag){
    return this.angularFireStore.collection('gags').add({
      title: gag.title,
      creator: 'Fedor Mashoshin',
      image: null,
      createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
    });
  }
}
