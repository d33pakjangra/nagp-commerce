import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from './shared/components/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    component: PageLayoutComponent,
  },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
