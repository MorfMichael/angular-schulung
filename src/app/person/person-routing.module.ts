import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './components/edit.component';
import { ListComponent } from './components/list.component';
import { PersonComponent } from './components/person.component';

const routes: Routes = [
  {
    path: '',
    component: PersonComponent,
    children: [
      { path: '', component: ListComponent },
      { path: ':id', component: EditComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonRoutingModule {}
