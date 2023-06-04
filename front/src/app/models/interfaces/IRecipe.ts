import { ILocality } from './ILocality';
import { ICreator } from './creator';
interface IRecipe {
  title: string;
  subtitle?: string;
  category: number;
  description?: any;
  locality: ILocality;
  price: any;
  images?: any[];
  creator: ICreator;
  deletedThumbnails?: any[];
  status?: string;
  coverage?: string;
}