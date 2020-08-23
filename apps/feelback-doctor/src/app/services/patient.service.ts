import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  GetPatientsGQL,
  GetPersonGQL,
} from '../graphql/generated/feelback.graphql';
import {Organization} from '../models/organization.model'
import { Patient } from '../models/patient.model';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private patientService: GetPatientsGQL, private personService: GetPersonGQL) {}

  public getPatientById(id: string): Observable<Patient> {
    return this.personService.fetch({id}).pipe(
      map((data) => {
        return data.data.person;
      })
    )
  }

  public getOrganizations(): Observable<Organization[]>{
    return this.patientService.fetch().pipe(
      map((data) => {
        const organizations: Organization[] = [];
        for(const organization of data.data.myself.organizations.edges){
          const patients: Patient[] = [];
          for(const patient of organization.node.persons.edges){
            patients.push({
              id: patient.node.id,
              pseudonym: patient.node.pseudonym,
            });
          }
          organizations.push({
            id: organization.node.id,
            name: organization.node.name,
            patients: patients
          });
        }
        return organizations;
      }),
    );
  }
}
