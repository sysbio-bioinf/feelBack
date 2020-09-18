import { Patient } from './patient.model';

export class Organization {
  id: string;
  name: string;
  patients: Patient[];
}
