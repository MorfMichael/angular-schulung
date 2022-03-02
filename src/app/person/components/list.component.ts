import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Person } from '../model/person';
import { PersonService } from '../model/person.service';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    constructor(private personService: PersonService) {
    }

    persons$: Observable<Person[]> = new Observable<Person[]>();

    ngOnInit(): void {
        this.persons$ = this.personService.getPersons();
    }

}
