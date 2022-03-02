import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Person } from '../model/person';
import { PersonService } from '../model/person.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  constructor(private route: ActivatedRoute, private personService: PersonService) {
  }

  /*
  // "alte" Version
  person?: Person;
  unsub$: Subject<unknown> = new Subject();

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => this.personService.getPerson(Number(params.get('id')))),
      takeUntil(this.unsub$)
    ).subscribe(person => this.person = person);
  }

  ngOnDestroy(): void {
    this.unsub$.next(null);
    this.unsub$.complete();
  }
  */

  person: Person = { id: 0, name: "", age: 0 };
  person$: Observable<Person> = new Observable<Person>();

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
    this.person$ = this.route.paramMap.pipe(
      switchMap(params => this.personService.getPerson(Number(params.get('id'))))
    )
  }
}
