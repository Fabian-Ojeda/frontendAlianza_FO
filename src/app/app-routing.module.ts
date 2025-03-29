import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientsPageComponent} from "./pages/clients-page/clients-page.component";
import {UnavailablePageComponent} from "./pages/unavailable-page/unavailable-page.component";

const routes: Routes = [
  { path: '', redirectTo: '/clients', pathMatch: 'full' },
  { path: 'clients', component: ClientsPageComponent },
  { path: 'unavailablePage', component: UnavailablePageComponent },
  { path: '**', redirectTo: 'unavailablePage' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
