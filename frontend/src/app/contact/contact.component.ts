import { Component, inject } from '@angular/core';
import Contact from '../type/contact';
import { ContactService } from '../services/contact.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  contacts: Contact[] = [];
  contactService = inject(ContactService);
  ngOnInit() {
    this.contactService.getContacts().subscribe(result =>{
      this.contacts = result
      console.log(this.contacts)
    });
  }

  deleteContact(id:string) {
    const ok = confirm("Are you sure you want to delete?");
    if (ok){
      this.contactService.deleteContact(id).subscribe(result => {
        alert("Contact deleted successfully");
        this.contacts = this.contacts.filter(contact => contact._id !== id);
      })
    }
  }
}
