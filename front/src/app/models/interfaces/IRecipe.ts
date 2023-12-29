import { ILocality } from './ILocality';
import { IUser } from './IUser';
interface IRecipe {
  title: string;
  subtitle?: string;
  category: number;
  description?: any;
  locality: ILocality;
  price: any;
  images?: any[];
  creator: IUser;
  deletedThumbnails?: any[];
  status?: string;
  coverage?: string;
}