import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './components/person.component';
import { ListComponent } from './components/list.component';
import { EditComponent } from './components/edit.component';


@NgModule({
  declarations: [
    PersonComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
