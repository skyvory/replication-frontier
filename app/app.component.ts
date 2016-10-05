import { Component } from '@angular/core';

@Component({
	selector: 'my-app',
	template: `
		<nav>
		<a routerLink="/home" routerLinkActive="active">Home</a>
		<a routerLink="/refresh" routerLinkActive="active">Refresh</a>
		<a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
		<a routerLink="/heroes" routerLinkActive="active">Heroes</a>
		</nav>
		<router-outlet></router-outlet>
	`,
	styleUrls: ['app/app.component.css'],
})

export class AppComponent {
	title = 'Tour of Heroes';
}