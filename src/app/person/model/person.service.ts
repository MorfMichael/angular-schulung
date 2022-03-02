import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, find, mergeAll, Observable, of } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/persons';
    this.initialLoad();
  }

  url: string;

  persons: Person[] = [];
  persons$: BehaviorSubject<Person[]> = new BehaviorSubject(this.persons);

  getPersons(): Observable<Person[]> {
    return this.persons$;
  }

  getPerson(id: number): Observable<Person | undefined> {
    return this.persons$.pipe(mergeAll(), find(x => x.id == id));
  }

  savePerson(person: Person): Observable<Person | undefined> {

    console.log(person.id);
    let filtered = this.persons.filter(el => el.id != person.id);
    let isNew = !this.persons.some(x => x.id == person.id);
    this.persons = [...filtered, person];
    this.persons$.next(this.persons);

    console.log(isNew);

    if (isNew) {
      console.log('post');
      this.httpClient.post(this.url, person).subscribe();
    } else {
      console.log('put');
      this.httpClient.put(this.url + '/' + person.id, person).subscribe();
    }

    return of(person);
  }

  initialLoad() {
    this.httpClient.get<Person[]>(this.url).subscribe(
      data => {
        this.persons = data;
        this.persons$.next(this.persons);
      }
    )
  }
}
