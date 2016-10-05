import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';


import { HeroesComponent }      from './heroes.component';
import { HeroDetailComponent }      from './hero-detail.component';
import { DashboardComponent }      from './dashboard.component';

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
	},
	{
		path: 'refresh',
		redirectTo: '/home',
	},
	// {
	// 	path: '**',
	// 	component: HomeComponent,
	// },

	
{
  path: 'dashboard',
  component: DashboardComponent
},
  {
	path: 'heroes',
	component: HeroesComponent
  },
{
  path: 'detail/:id',
  component: HeroDetailComponent
},
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);