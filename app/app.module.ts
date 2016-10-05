import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }        from './app.component';
import { routing } from './app.routing';

import { ThreadService } from './thread.service';
import { HomeComponent } from './home.component';






import './rxjs-extensions';

// Imports for loading & configuring the in-memory web api
// import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService }  from './in-memory-data.service';


import { DashboardComponent }     from './dashboard.component';
import { HeroesComponent }     from './heroes.component';
import { HeroSearchComponent }     from './hero-search.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService }         from './hero.service';


@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,

		// InMemoryWebApiModule.forRoot(InMemoryDataService),
	],
	declarations: [
		AppComponent,
		HomeComponent,


		DashboardComponent,
		HeroDetailComponent,
		HeroesComponent,
		HeroSearchComponent
	],
	providers: [
		ThreadService,


		HeroService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}