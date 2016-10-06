import { Component, OnInit } from '@angular/core';
import { Thread } from './thread';
import { ThreadService } from './thread.service';
import { ImageService } from './image.service';
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
		private threadService: ThreadService,
		private imageService: ImageService,
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

	// assigned as global variable for progress status on UI
	newImagesCount:number = 0;
	newImagesLoadedCount = 0;

	loadNewImages(thread):void {
		// reset image count status value
		this.newImagesCount = 0;
		this.newImagesLoadedCount = 0;

		this.threadService.getNewImagesList(thread.id).then(data => {

			let newImages = data.images;
			this.newImagesCount = data.images.length;

			// console.log(data.images[Object.keys(data.images)[0]]);
			// console.info(thread);

			var i = 0;
			// fetch as scoped function
			let fetch = (imageIndex:number) => {
				console.warn(data.images[Object.keys(data.images)[i]]);

				this.imageService.loadImage(thread.id, data.images[Object.keys(data.images)[i]]).then(imageMetaData => {
					console.log("IMAGE LOADED");
					let newImageMeta = {
						'id': imageMetaData.id,
						'thread_id': thread.id,
						'url': data.images[Object.keys(data.images)[i]],
						'name': imageMetaData.name,
						'size': imageMetaData.size,
						'thumbnail_url': 'http://localhost/replication-dimension/public/' + imageMetaData.thumb,
						'download_status': 1,
					};
					
					// not yet used indexing to append data directly to threads variable
					// let threadIndex = this.threads.indexOf(thread);

					this.images.push(newImageMeta);
					i++;
					this.newImagesLoadedCount++;
					if(i < this.newImagesCount) {
						fetch(i);
					}
				});
			}
			fetch(i);

			// for(let img of data.images) {
			// 	this.imageService.loadImage(img.thread_id, img.url).then(data => {
			// 		let newImageMeta = {
			// 			'id': data.id,
			// 			'thread_id': thread.id,
			// 			'url': img.url,
			// 			'name': data.name,
			// 			'size': data.size,
			// 			'thumb': data.thumb,
			// 			'download_status': 1,
			// 		};
			// 		thread.images.push(newImageMeta);
			// 	});
			// }
		});
	}

	// doLoadImage(image):void {
	// 	this.oij
	// }

	ngOnInit(): void {
		this.getThreads();
	}
}