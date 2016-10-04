import { Component, OnInit } from '@angular/core';
import { Thread } from './thread';
import { ThreadService } from './thread.service';
import { Router } from '@angular/router';

@Component({
	moduleId: module.id,
	selector: 'home-selector',
	templateUrl: 'home.component.html',
	styleUrls: [],
	providers: [ThreadService]
})

export class HomeComponent implements OnInit {
	nothread: Thread[];
	threads: Thread[];

	constructor(
		private router: Router,
		private threadService: ThreadService
	) {}

	// getThreads(): void {
	// 	this.threadService.getThreads().then(function(threads) {
	// 		console.log(threads);
	// 		threads => this.threads = threads;
	// 	});
	// }

	getThreads(): void {
		this.threadService.getThreads();
	}

	ngOnInit(): void {
		this.getThreads();
	}
}