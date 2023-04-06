import { ICreator } from './interfaces/creator';
interface IRecipe {
  title: string;
  subtitle?: string;
  category: number;
  description?: any;
  city: string;
  zip: string;
  price: any;
  images?: any[];
  creator: ICreator;
  deletedThumbnails?: any[];
  state?: string;
  coverage?: string;
}