import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './routes/home/home.component';
import { MainappComponent } from './routes/mainapp/mainapp.component';

const routes: Routes = [
  {path: "home", component: HomeComponent},
  {path: "mainapp", component: MainappComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
