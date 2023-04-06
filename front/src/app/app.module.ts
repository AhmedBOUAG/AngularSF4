import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { LoaderComponent } from './loader/loader/loader.component';
import { LoaderInterceptor } from './services/loader-interceptor.service';
import { LoaderService } from './services/loader.service';
import { RegistrationComponent } from './registration/registration.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

import { RecipeModule } from './recipe/recipe.module';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor'
import { TokenStorageService } from './services/token-storage.service';
import { LastRecipesComponent } from './home/last-recipes/last-recipes.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSkeletonComponent } from './loader/loading-skeleton/loading-skeleton.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationMatModalComponent } from './sharing/confirmation-mat-modal/confirmation-mat-modal.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        HomeComponent,
        FooterComponent,
        LoaderComponent,
        RegistrationComponent,
        LoginComponent,
        LastRecipesComponent,
        LoadingSkeletonComponent,
        ConfirmationMatModalComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,
        NgbModule,
        RecipeModule,
        OverlayModule,
        MatDialogModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        ButtonModule,
        RippleModule,
        FontAwesomeModule,
        CalendarModule
    ],
    providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        DatePipe,
        TokenStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
