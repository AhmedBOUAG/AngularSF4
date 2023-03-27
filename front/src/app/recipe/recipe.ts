import { ICreator } from  '../models/interfaces/creator';
import { IImageRecipe } from '../models/interfaces/imageRecipe';
export class Recipe {
  id?: any; // type 'number' provoque une erreur dans la console. a voir plus tard
  title!: string;
  subtitle!: string;
  category!: string;
  city!: string;
  zip!: string;
  price!: string;
  description?: any; // type 'text' provoque une erreur dans la console. a voir plus tard
  images: IImageRecipe[];
  deletedThumbnails?: any = [];
  creator: ICreator;
}
