import { ILocality } from './interfaces/ILocality';

export class Locality implements ILocality {

    constructor(
        public id: number,
        public codeCommune?: string,
        public codePostal?: string,
        public coordonneesGeo?: string,
        public libelle?: string,
        public nomCommune?: string,
    ) {

    }
}