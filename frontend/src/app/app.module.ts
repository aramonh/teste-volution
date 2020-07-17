
import { HomeModule } from './home/home.module';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { AuthService } from './auth/services/auth.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

import { AuthInterceptor } from '../app/services/interceptor/AuthInterceptor'
@NgModule({
  declarations: [AppComponent, NavbarComponent,   PageNotFoundComponent],
  imports: [
   
    HomeModule,
    BrowserModule,
    
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
  ],
  providers: [AuthService,{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, ],
  bootstrap: [AppComponent],
})
export class AppModule {}
