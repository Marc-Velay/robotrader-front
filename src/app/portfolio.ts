import { Item } from './item';
//Portfolio model, used when importing it from database.
//We use the Item model too as we store the list of items in the portfolio in this object.
export class Portfolio {
  id: number;
  user_id: number;
  name: string;
  items: Item[];
}
