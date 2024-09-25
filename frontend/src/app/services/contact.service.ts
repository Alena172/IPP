import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import Contact from '../type/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = 'http://localhost:8080';
  httpClient = inject(HttpClient);
  constructor() { }

  getContacts() {
    return this.httpClient.get<Contact[]>(this.apiUrl + '/v1/contact');
  }

  addContact(contact: Contact) {
    return this.httpClient.post<Contact>(this.apiUrl + '/v1/contact', contact);
  }

  getContact(id:string) {
    return this.httpClient.get<Contact>(this.apiUrl + '/v1/contact/' + id);
  }

  editContact(id:string, contact:Contact) {
    return this.httpClient.put<Contact>(this.apiUrl + '/v1/contact/' + id, contact);
  }

  deleteContact(id:string) {
    return this.httpClient.delete<Contact>(this.apiUrl + '/v1/contact/' + id);
  }
}

