import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
		<nav>
		<a routerLink="/home" routerLinkActive="active">Home</a>
		<a routerLink="/folder" routerLinkActive="active">Folder</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['app/app.component.css'],
})

export class AppComponent {
	title = 'Tour of Heroes';
}