import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from './person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private httpClient: HttpClient) {
    this.url = 'http://localhost:3000/persons';
  }

  url: string;

  getPersons(): Observable<Person[]> {
    return this.httpClient.get<Person[]>(this.url);
  }

  getPerson(id: number): Observable<Person> {
    return this.httpClient.get<Person>(`${this.url}/${id}`);
  }

  savePerson(person: Person) {
    if (!person.id) {
      return this.httpClient.post(this.url + '/' + person.id, person);
    } else {
      return this.httpClient.put(this.url + '/' + person.id, person);
    }
  }
}
