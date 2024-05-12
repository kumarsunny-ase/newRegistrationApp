import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDataComponent } from './company-data/company-data.component';
import { UserDataComponent } from './user-data/user-data.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  {
    path: 'company',
    component: CompanyDataComponent,
  },
  {
    path: 'user',
    component: UserDataComponent,
  },
  {
    path: 'summary',
    component: SummaryComponent,
  },
  {
    path: '',
    component: CompanyDataComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
