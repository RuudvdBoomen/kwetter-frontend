import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MentionsComponent } from './components/mentions/mentions.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'mentions', component: MentionsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
