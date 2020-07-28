export class Patient {
  id: string;
  pseudonym: string;
  organization: string;
  consultation?: boolean;
  rating?: number;
  instruments?: number;
  screenings?: number;
}
