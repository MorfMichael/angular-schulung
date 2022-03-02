import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, find, mergeAll, Observable, of, tap } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/persons';
  }

  url: string;

  persons: Person[] = [];
  persons$: BehaviorSubject<Person[]> = new BehaviorSubject(this.persons);

  getPersons(): Observable<Person[]> {
    if (this.persons.length == 0) {
      return this.initialLoad();
    } else {
      return this.persons$;
    }
  }

  getPerson(id: number): Observable<Person | undefined> {
    if (id == -1) {
      return of({ id: Math.max(...this.persons.map(x => x.id)) + 1, name: '', age: 5 })
    } else {
      let el = this.persons.find(x => x.id == id);
      return of(el);
    }
  }

  savePerson(person: Person): Observable<Person | undefined> {
    let filtered = this.persons.filter(el => el.id != person.id);
    let isNew = !this.persons.some(x => x.id == person.id);
    this.persons = [...filtered, person];
    this.persons$.next(this.persons);

    if (isNew) {
      this.httpClient.post(this.url, person).subscribe();
    } else {
      this.httpClient.put(this.url + '/' + person.id, person).subscribe();
    }

    return of(person);
  }

  initialLoad(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url).pipe(
      tap(
        data => {
          this.persons = data;
          this.persons$.next(this.persons);
        })
    )
  }
}
