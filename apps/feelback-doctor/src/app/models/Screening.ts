import {Category} from "./Category";

export class Screening {
  locale: string;
  instrument: string;
  date: string;
  result: {};
  categories: Category[];
  comment: string;
}
