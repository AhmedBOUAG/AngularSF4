import { Locality } from '../models/Locality';
import { IUser } from '../models/interfaces/IUser';
import { IImageRecipe } from '../models/interfaces/imageRecipe';
export class Recipe {
  id?: any; // type 'number' provoque une erreur dans la console. a voir plus tard
  title!: string;
  subtitle!: string;
  category!: string;
  locality!: Locality;
  price!: string;
  description?: any; // type 'text' provoque une erreur dans la console. a voir plus tard
  images: IImageRecipe[];
  deletedThumbnails?: any = [];
  creator: IUser;
  status: string;
  coverage: string;
}
