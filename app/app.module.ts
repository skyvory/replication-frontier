import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent }        from './app.component';
import { routing } from './app.routing';

import { ThreadService } from './thread.service';
import { ImageService } from './image.service';
import { SuffixService } from './suffix.service';
import { HomeComponent } from './home.component';
import { FolderComponent } from './folder.component';






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
		FolderComponent,


		DashboardComponent,
		HeroDetailComponent,
		HeroesComponent,
		HeroSearchComponent
	],
	providers: [
		ThreadService,
		ImageService,
		SuffixService,


		HeroService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}