import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { TimelineComponent } from './components/timeline/timeline.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'timeline', component: TimelineComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
