type RecipeStatus = {
  [key: string]: string;
  draft: string;
  published: string;
  rejected: string;
};
export abstract class CommonUtils {
  static readonly UPLOAD_IMAGES_DIRECTORY = "http://127.0.0.1/images/";
  static readonly recipeCategory = {
    'BD_CAKE': 'Gâteau Anniversaire',
    'PASTRIES': 'Pâtesserie',
    'VARIETY': 'Variété'
  };

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
  static readonly recipeStatus: RecipeStatus = {
    [CommonUtils.DRAFT]: 'Brouillon',
    [CommonUtils.PUBLISHED]: 'Publiée',
    [CommonUtils.REJECTED]: 'Rejetée'
  };
  static readonly i18PrimeNg = {
    "fr": {
      "dayNames": ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
      "dayNamesShort": ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"],
      "dayNamesMin": ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
      "monthNames": ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
      "monthNamesShort": ["Jan", "Fév", "Mar", "Avr", "Mai", "Jui", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
      "today": "Aujourd'hui",
      "weekHeader": "Sem."
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
  static invertObject<T extends string | number>(array: { [key: string]: T }): { [key in T]: string } {
    return Object.keys(array).reduce((acc, key) => {
      const value = array[key];
      acc[value] = key;
      return acc;
    }, {} as { [key in T]: string });
  }

}


