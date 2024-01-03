interface choice {
    label?: string;
    value?: string;
}

export interface IRecipeFilterSearch {
    price?: choice[];
    title?: string;
    subtitle?: string;
    city?: string;
    category?: number,

}