export abstract class CommonUtils {
  static readonly UPLOAD_IMAGES_DIRECTORY = "http://127.0.0.1/images/";
  recipeCategory = {
    'BD_CAKE': 'Gâteau Anniversaire',
    'PASTRIES': 'Pâtesserie',
    'VARIETY': 'Variété'
  };
  static readonly LOGGED_IN_MESSAGE_ERROR = 'Vos identifiants sont incorrectes.';
  static readonly SERVER_MESSAGE_ERROR = 'Une erreur est survenue lors de l\'opération.';
  static readonly EXCLUDES_ROUTES_FROM_LOADER = ['last_three_recipes', 'login_check', 'current_user'];
  static readonly NOT_REQUIRE_TOKEN_ROUTES = ['last_three_recipes', 'login_check'];
}


