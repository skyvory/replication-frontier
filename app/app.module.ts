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
		FolderComponent
	],
	providers: [
		ThreadService,
		ImageService,
		SuffixService
	],
	bootstrap: [ AppComponent ]
})

export class AppModule {
}