import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResponsiblePartyComponent } from './responsible-party.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [ ResponsiblePartyComponent ],
  exports: [ ResponsiblePartyComponent ],
})
export class ResponsiblePartyModule { }
