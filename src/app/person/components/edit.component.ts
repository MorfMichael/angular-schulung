import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  person?: Person;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.personService.getPerson(Number(params.get('id'))).subscribe(person => {
        this.person = person;
      });
    });
  }
}
