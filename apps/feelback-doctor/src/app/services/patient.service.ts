import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetPatientsGQL,
  GetPersonGQL,
} from '../graphql/generated/feelback.graphql';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private patientService: GetPatientsGQL, private personService: GetPersonGQL) {}

  public getPatientById(id: string): Observable<any> {
    return this.personService.fetch({id}).pipe(
      map((data) => {
        return data.data.person;
      })
    )
  }

  public getOrganizations(): Observable<any>{
    return this.patientService.fetch().pipe(
      map((data) => {
        return data.data.myself.organizations.edges;
      }),
    );
  }
}
