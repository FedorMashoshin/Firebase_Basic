import { Injectable } from '@angular/core';
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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private angularFireStore: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

addGag(gag: Gag){
  const newName = `${new Date().getTime()}-SAMPLE.png`;
  const storageRef: AngularFireStorageReference = this.storage.ref(`/gags/${newName}`);

  // with from we transform promise into observable
  const storageObs = from(storageRef.putString(gag.image, 'base64', { contentType: 'image/png' }));
  return storageObs.pipe(
    switchMap(obj => obj.ref.getDownloadURL()),
    switchMap(url => this.angularFireStore.collection('gags').add({
        title: gag.title,
        creator: 'Fedor Mashoshin',
        image: url,
        createdAt: firebase.default.firestore.FieldValue.serverTimestamp()
      }))
  );

  }
}
