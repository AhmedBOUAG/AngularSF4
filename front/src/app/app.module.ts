import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
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
import { ConfirmationMatModalComponent } from './shared/confirmation-mat-modal/confirmation-mat-modal.component';
import { CalendarModule } from 'primeng/calendar';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { SpeedDialModule } from 'primeng/speeddial';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { NgSelectModule } from '@ng-select/ng-select';
import { register } from 'swiper/element/bundle';
import { SwiperDirective } from './directives/swiper.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AuthStatusService } from './services/auth-status.service';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MessagesDatatableComponent } from './datatables/messages-datatable/messages-datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';
import { PaginatorModule } from 'primeng/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { MessagesModule } from './messages/messages.module';

register();

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
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
        NgSelectModule,
        OverlayModule,
        MatDialogModule,
        MatCardModule,
        MatToolbarModule,
        MatButtonModule,
        ButtonModule,
        RippleModule,
        FontAwesomeModule,
        CalendarModule,
        PasswordModule,
        DividerModule,
        CardModule,
        SpeedDialModule,
        TagModule,
        AvatarModule,
        SwiperDirective,
        NgxSkeletonLoaderModule,
        LeafletModule,
        MdbCheckboxModule,
        NgxDatatableModule,
        MatTabsModule
    ],
    providers: [
        LoaderService,
        MessageService,
        AuthStatusService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: MatDialogRef, useValue: {} },
        DatePipe,
        TokenStorageService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        registerLocaleData(fr.default, 'fr');
    }
}
