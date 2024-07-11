# DuFaitMaison

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.3.

## Pre-installation environment

**Folder "src/environment"** :

- Create your environment local file **"environment.ts"**, and if needed define your IP address in **"apiBaseUrl"** variable.

- To adapt your application to your environment, Create the local file **"ports.ts"** from the file **"ports.default.ts"**.
  Follow the instructions in the comments to adapt your port for the API's calls for exemple. (8000 is the port by default for the symfony backend server).

- Run `npm i` for installing all dependencies of the project

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
