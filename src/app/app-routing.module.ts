import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { PageLayoutComponent } from './shared/components/page-layout/page-layout.component';
import { AuthGuard } from './shared/guards/auth.guard';

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
      {
        path: 'cart',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/cart/cart.module').then((m) => m.CartModule),
      },
      {
        path: 'orders',
        canActivate: [AuthGuard],
        loadChildren: () => import('./modules/order/order.module').then((m) => m.OrderModule),
      },
    ],
  },
  { path: 'login', loadChildren: () => import('./modules/login/login.module').then((m) => m.LoginModule) },
  { path: '**', redirectTo: 'products' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top', preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
