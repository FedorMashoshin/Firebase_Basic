import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import * as firebase from 'firebase/app';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface Gag {
  title: string;
  creator: string;
  id?: string;
  image: string;
  createdAt?: firebase.default.firestore.FieldValue;
}

export interface User {
  uid: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUser: User = null;
  constructor(
    private angularFireStore: AngularFirestore,
    private storage: AngularFireStorage,
    private afAuth: AngularFireAuth
  ) {
    this.afAuth.onAuthStateChanged(user => {
      this.currentUser = user;
    });
   }

  addGag(gag: Gag){
    const newName = `${new Date().getTime()}-SAMPLE.png`;
    const storageRef: AngularFireStorageReference = this.storage.ref(`/gags/${newName}`);

    // with from we transform promise into observable
    const storageObs = from(storageRef.putString(gag.image, 'base64', { contentType: 'image/png' }));
    return storageObs.pipe(
      switchMap(obj => obj.ref.getDownloadURL()),
      switchMap(url => this.angularFireStore.collection('gags').add({
          title: gag.title,
          creator: this.currentUser.uid,
          image: url,
          createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
        }))
    );
  }

  async signUp({email, password}){
    const credentials = await this.afAuth.createUserWithEmailAndPassword(email, password);

    const uid = credentials.user.uid;
    return this.angularFireStore.doc(`users/${uid}`).set({
      uid,
      email: credentials.user.email
    });
  }

  signIn({email, password}){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }
}
