import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from './shared/components/page-layout/page-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PageLayoutComponent,
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
