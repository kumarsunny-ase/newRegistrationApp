import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataComponent } from './company-data/company-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { SummaryComponent } from './summary/summary.component';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CompanyDataComponent,
  },
  {
    path: 'user',
    component: UserDataComponent,
    canActivate: [authGuard] // add authGuard to protect user route
  },
  {
    path: 'summary',
    component: SummaryComponent,
    canActivate: [authGuard] // add authGuard to protect summary route
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
