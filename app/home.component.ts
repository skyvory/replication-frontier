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
	threads: Thread[];
	images: any[];

	constructor(
		private router: Router,
		private threadService: ThreadService
	) {}

	getThreads(): void {
		this.threadService.getThreads().then(threads => {
			this.threads = threads;
			console.log(this.threads);
		});
	}

	viewImages(thread):void {
		this.threadService.getSavedImages(thread.id).then(data => {
			let availableImages = [];
			for(let i of data.images) {
				if(i.download_status == 1) {
					i.thumbnail_url = 'http://localhost/replication-dimension/public/thumbnails/' + i.thread_id + '/~thumb_' + i.name;
					availableImages.push(i);
				}
			}
			this.images = availableImages;
		});
	}

	ngOnInit(): void {
		this.getThreads();
	}
}