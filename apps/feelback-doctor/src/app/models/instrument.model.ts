export class Instrument {
  constructor() {}

  id: string;
  name: string;
  description: string;
  version: number;
  image: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  diagram?: {};
  payload?: {};
  rules?: {};
}
