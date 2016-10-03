import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }      from './hero-detail.component';
import { DashboardComponent }      from './dashboard.component';

const appRoutes: Routes = [
{
  path: 'dashboard',
  component: DashboardComponent
},
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
  path: '',
  redirectTo: '/dashboard',
  pathMatch: 'full'
},
{
  path: 'detail/:id',
  component: HeroDetailComponent
},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);