import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor } from './services/auth/token.interceptor';

import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { KweetComponent } from './components/kweet/kweet.component';
import { HeaderComponent } from './components/header/header.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MentionsComponent } from './components/mentions/mentions.component';
import { UsersModalComponent } from './components/users-modal/users-modal.component';
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TimelineComponent,
    KweetComponent,
    HeaderComponent,
    ProfileComponent,
    MentionsComponent,
    UsersModalComponent,
    RegisterComponent,
    VerifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: 'API_URL', useValue: environment.API_URL }],
  bootstrap: [AppComponent]
})
export class AppModule { }
