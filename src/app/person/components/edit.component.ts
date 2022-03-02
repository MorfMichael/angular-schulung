import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, switchMap, takeUntil } from 'rxjs';
import { Person } from '../model/person';
import { PersonService } from '../model/person.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private fb: FormBuilder) {
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
  person$: Observable<Person | undefined> = new Observable<Person | undefined>();
  personForm: FormGroup = this.fb.group({
    id: [0],
    name: ['', Validators.required],
    age: [0, [Validators.min(4), Validators.max(150)]],
  }, { validator: this.myValidator })
  subscription?: Subscription;

  ngOnInit(): void {
    this.person$ = this.route.paramMap.pipe(
      switchMap(params => this.personService.getPerson(Number(params.get('id'))))
    )

    this.subscription = this.person$.subscribe(person => {
      if (person) {
        this.personForm?.setValue(person);
      }
    });
  }

  savePerson() {
    if (this.personForm.valid) {
      console.log('personForm', this.personForm);
      this.personService.savePerson(this.personForm.value).subscribe();
      this.router.navigate([''], { relativeTo: this.route });
    } else {
      console.error('invalid to save!!!');
    }
  }

  myValidator(form: FormGroup) {
    if (form.controls['name'].value === 'Hubert' && form.controls['age'].value === 49) {
      return { invalid: true }
    }

    return null;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
