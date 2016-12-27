import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home.component';
import { FolderComponent } from './folder.component';

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
		path: 'folder',
		component: FolderComponent,
	},
	{
		path: 'index',
		redirectTo: '/home',
	},
	{
		path: '**',
		redirectTo: '/home',
		// component: HomeComponent,
	}
  
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);