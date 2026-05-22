import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../../models/person';


@Injectable({
  providedIn: 'root',
})
export class PersonService  {

  private api = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  // LISTAR PESSOAS
  list(): Observable<Person[]> {
    return this.http.get<Person[]>(
      this.api + '/list',
      {
        withCredentials: true
      }
    );
  }

  // SALVAR
  create(person: Person) {
    return this.http.post(
      `${this.api}/registrarName`,
      person,
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  // EXCLUIR
  delete(id: number) {
    return this.http.delete(
      `${this.api}/list/${id}`,
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }

  // NACIONALIDADE
  findNationality(id: number) {
    return this.http.get(
      `${this.api}/findNationalityByPerson/${id}`,
      {
        responseType: 'text',
        withCredentials: true
      }
    );
  }
}

