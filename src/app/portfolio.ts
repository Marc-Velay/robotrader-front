import { Item } from './item';

export class Portfolio {
  id: number;
  user_id: number;
  name: string;
  items: Item[];
}
