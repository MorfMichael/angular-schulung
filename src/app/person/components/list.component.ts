import { Component, OnInit } from '@angular/core';
import { Person } from '../model/person';
import { PersonService } from '../model/person.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private personService: PersonService) { 
      this.persons = []
  }

  public persons: Person[];

  ngOnInit(): void {
      this.personService.getPersons().subscribe(data => this.persons = data);
  }

}
