export interface Instrument {
  id: string;

  name: string;
  description: string;
  type: string;

  image?: string;

  payload: object;

  rules?: object[];

  changelog?: string;
}
