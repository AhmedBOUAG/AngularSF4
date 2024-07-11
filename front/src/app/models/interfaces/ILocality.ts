export interface ILocality {
    id?: number;
    codeCommune?: string;
    codePostal?: string;
    coordonneesGeo?: string;
    libelle?: string;
    nomCommune?: string;
    toString(): string;
}