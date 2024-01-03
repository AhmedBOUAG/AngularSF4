import { Locality } from "../models/Locality";
import { ILocality } from "../models/interfaces/ILocality";

type RecipeStatus = {
  [key: string]: string;
  draft: string;
  published: string;
  rejected: string;
};
export abstract class CommonUtils {
  static readonly UPLOAD_IMAGES_DIRECTORY = "http://127.0.0.1/images/";
  static readonly recipeCategory =
    [
      { "type": "Gâteau Anniversaire", "id": 1 },
      { "type": "Pâtesserie", "id": 2 },
      { "type": "Variété", "id": 3 }
    ];
  static readonly RESPONSE_ARRAY_KEY = 'hydra:member';
  static readonly RESPONSE_TOTALITEMS_KEY = 'hydra:totalItems';
  static readonly KEY_LOCALSTORAGE_CURRENT_USER = 'info_user';
  static readonly KEY_AUTH_TOKEN = 'auth_token';
  static readonly MODIF = 'MODIF';
  static readonly CREATE = 'CREATE';
  static readonly DELETE = 'DELETE';
  static readonly ERROR = 'ERROR';
  static readonly FILTER_MODAL_TITLE = 'Filtrer les recettes';
  static readonly EDIT_RECIPE_TITLE = 'Modifier cette recette';
  static readonly POPIN_RECIPE_DELETE_MSG = 'Vous êtes sur le point de <b>supprimer</b> cette recette. Cette action est définitive et irréversible. <br /><br />Souhaitez-vous continuer?'
  static readonly LOGGED_IN_MESSAGE_ERROR = 'Vos identifiants sont incorrectes.';
  static readonly SERVER_MESSAGE_ERROR = 'Une erreur est survenue lors de l\'opération.';
  static readonly EXCLUDED_ROUTES_FROM_LOADER = ['last_three_recipes', 'login_check', 'current_user', 'create'];
  static readonly TOKEN_LESS_ROUTES = ['last_three_recipes', 'login_check', 'create'];
  static readonly PUBLISHED = 'published';
  static readonly DRAFT = 'draft';
  static readonly REJECTED = 'rejected';
  static readonly NO_AVAILABLE_IMAGE = 'no_image_available.png';
  static readonly BD_DATE_FORMAT = 'YYYY-MM-DD';
  static readonly LAST_IMAGE_WARNING = "<strong>Important:</strong> Votre recette ne contient qu'une seule image. Si vous décidez de supprimer cette dernière <u>sans</u> en chargeant une autre, votre recette sera <u>rejetée</u>."
  static readonly MIN_LENTH_TERM = 3;
  static readonly NB_ITEM_PER_PAGE = 25;
  static readonly ITEM_PER_PAGE = 'itemsPerPage';
  static readonly _PAGE = '_page';
  static readonly ORDER_PARAMETER_NAME = '_order';
  static readonly recipeStatus: RecipeStatus = {
    [CommonUtils.DRAFT]: 'Brouillon',
    [CommonUtils.PUBLISHED]: 'Publiée',
    [CommonUtils.REJECTED]: 'Rejetée'
  };
  static readonly ORDER_ITEM = { '1': 'ASC', '-1': 'DESC' };
  static localityToString(locality: ILocality) {
    return locality.libelle + ' (' + locality.codePostal + ')';
  }
  static isEmptyValue(value: any): boolean {
    return null === value || '' === value || undefined === value || Array.isArray(value) && 0 === value.length;
  }
  static readonly i18PrimeNg = {
    "fr": {
      "dayNames": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      "dayNamesShort": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      "dayNamesMin": ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      "monthNames": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      "monthNamesShort": ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
      "today": "Aujourd'hui",
      "weekHeader": "Sem.",
      "startsWith": "Commence par",
      "contains": "Contient",
      "notContains": "Ne contient pas",
      "endsWith": "Termine par",
      "equals": "Egale",
      "notEquals": "N'est égale",
      "noFilter": "Pas de filtre",
      "lt": "Plus petit",
      "lte": "Plus petit ou égale à",
      "gt": "Plus grand que",
      "gte": "Plus grand ou égale à",
      "is": "est",
      "isNot": "N'est pas",
      "before": "Avant",
      "after": "Après",
      "dateIs": "Date est",
      "dateIsNot": "Date n'est pas",
      "dateBefore": "Date est avant",
      "dateAfter": "Date est après",
      "clear": "Nettoyer",
      "apply": "Appliquer",
      "matchAll": "Correspondre à tout",
      "matchAny": "Correspondre à n'importe quel",
      "addRule": "Ajout de règle",
      "removeRule": "Suppression de règle",
      "accept": "Oui",
      "reject": "Non",
      "choose": "Choisir",
      "upload": "Télécharger",
      "cancel": "Annuler",
      "dateFormat": "dd/mm/yy",
      "firstDayOfWeek": 0,
      "weak": 'Faible',
      "medium": 'Moyen',
      "strong": 'Fort',
      "passwordPrompt": 'Entrer un mot de passe',
      "emptyMessage": 'Aucun résultat trouvé',
      "emptyFilterMessage": 'Aucun résultat trouvé'
    },
    "en": {
      "dayNames": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "dayNamesShort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      "dayNamesMin": ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      "monthNames": ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      "monthNamesShort": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      "today": "Today",
      "weekHeader": "Wk"
    }
  };

  static readonly messageToast = {
    "userRegistrationSuccess": "Votre inscription a été effectuée avec succès.",
    "recipeDeleted": "La recette a été supprimée de manière définitive.",
    "recipeUpdated": "Les modifications ont été apportées avec succès.",
    "recipeCreated": "La recette a été créée avec succès.",
    "errorOccured": "Une erreur est survenue lors de cette opération."
  };
  static invertObject<T extends string | number>(array: { [key: string]: T }): { [key in T]: string } {
    return Object.keys(array).reduce((acc, key) => {
      const value = array[key];
      acc[value] = key;
      return acc;
    }, {} as { [key in T]: string });
  }

}


