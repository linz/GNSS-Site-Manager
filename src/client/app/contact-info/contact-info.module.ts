import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactInfoComponent } from './contact-info.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ContactInfoComponent],
  exports: [ContactInfoComponent],
})
export class ContactInfoModule { }
