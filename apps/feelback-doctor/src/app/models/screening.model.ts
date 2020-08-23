export class Screening{

  constructor(){}

  id: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  language: string;
  payload: {};
  isResolved?: boolean;
  resolvedAt?: Date;
  resolveComment?: String;
}