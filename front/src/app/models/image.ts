import { IImageRecipe } from "./interfaces/imageRecipe";

export class Image implements IImageRecipe {
  id: number;
  name: string;
  path: string;
  type: string;
  recette?: any;

  constructor(id: number, name: string, path: string, type: string) {
    this.id = id;
    this.name = name;
    this.path = path;
    this.type = type;
  }
}
