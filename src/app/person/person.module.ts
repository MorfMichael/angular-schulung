import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './components/person.component';
import { ListComponent } from './components/list.component';
import { EditComponent } from './components/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonComponent,
    ListComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }
