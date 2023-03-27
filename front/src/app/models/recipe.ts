interface IRecipe{
    title: string;
    subtitle: string;
    category: number;
    description: any;
    city: string;
    zip: string;
    price: any;
    images: any[];
    creator: IUser[];
    deletedThumbnails: any[];
  }