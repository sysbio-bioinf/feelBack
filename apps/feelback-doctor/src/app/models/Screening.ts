import {Category} from "./Category";

export class Screening {
  locale: string;
  instrument: string;
  date: Date;
  result: {};
  categories: Category[];
  comment: string;
}
