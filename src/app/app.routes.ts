import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Cart } from './pages/cart/cart';

export const routes: Routes = [
  { path: '', component: Home },      
  { path: 'cart', component: Cart }   
];
