import { query } from '@angular/animations';
import { initializeApp } from 'firebase/app';
import { Injectable } from '@angular/core';
import { addDoc, collection, doc, DocumentData, DocumentReference, Firestore, getDoc, getDocs, getFirestore, where } from "firebase/firestore";
import { environment } from 'src/environments/environment';
import { ReplaySubject, Observable } from 'rxjs';

export interface Message {
  id?: string
  text: string
  sender: string
  styleSrc: string
}

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly DB_COLLECTION = 'messages'
  app = initializeApp(environment.firebase);
  db?: Firestore = undefined
  
  constructor() { 
    this.db = getFirestore(this.app);
  }

  addMessage(text: string, sender: string, styleSrc: string): Promise<DocumentReference<DocumentData>> {
    return addDoc(collection(this.db!!, this.DB_COLLECTION), {
      text,
      sender,
      styleSrc
    } as Message)
  }
  
  getMessages(): Observable<Message[]> {
    const subject = new ReplaySubject<Message[]>()
    getDocs(collection(this.db!!, this.DB_COLLECTION)).then(data => {
      const messages: Message[] = []
      data.forEach(doc => {
        messages.push(doc.data() as Message)
      })
      subject.next(messages)
    })

    return subject.asObservable()
  }
}
