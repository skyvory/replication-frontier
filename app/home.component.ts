import { Component, OnInit } from '@angular/core';
import { Thread } from './thread';
import { ThreadService } from './thread.service';
import { ImageService } from './image.service';
import { SuffixService } from './suffix.service';
import { Router } from '@angular/router';

@Component({
	// moduleId: module.id,
	selector: 'home-selector',
	templateUrl: 'app/home.component.html',
	styles: [`
		.paused {
			background-color: #ffe8b7;
		}
		.closed {
			background-color: #fe94a4;
		}
		.downloading {
			background-color: #c7ccfe;
		}
		.finished {
			background-color: #a8ffb9;
		}
	`],
	styleUrls: [],
	providers: [ThreadService]
})

export class HomeComponent implements OnInit {
	threads: Thread[];
	images: any = [];
	suffixes: any[];
	timer:any;

	constructor(
		private router: Router,
		private threadService: ThreadService,
		private imageService: ImageService,
		private suffixService: SuffixService,
	) {}

	getThreads(): void {
		this.threadService.getThreads().then(threads => {
			this.threads = threads;
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
	// newImagesCount:number = 0;
	// newImagesLoadedCount = 0;
	// downloading = false;

	proceedLoadNewImages(thread):void {
		let index = this.threads.indexOf(thread);
		let nextThread = this.threads[Object.keys(this.threads)[index + 1]];
		console.log("loading next thread", nextThread);
		this.loadNewImages(nextThread);
	}

	loadNewImages(thread):void {
		// reset image count status value
		// this.newImagesCount = 0;
		// this.newImagesLoadedCount = 0;
		// this.downloading = true;

		thread.newImagesCount = 0;
		thread.newImagesLoadedCount = 0;
		thread.downloading = true;
		thread.downloadStatus = 'downloading';

		this.threadService.getNewImagesList(thread.id).then(data => {

			let newImages = data.images;
			thread.newImagesCount = data.images.length;
			// this.newImagesCount = data.images.length;

			// var i = 0;
			// define fetch as scoped function
			let fetch = (imageIndex:number) => {

				this.imageService.loadImage(thread.id, data.images[Object.keys(data.images)[thread.newImagesLoadedCount]]).then(imageMetaData => {
					console.log(imageMetaData.name + " loaded");
					let newImageMeta = {
						'id': imageMetaData.id,
						'thread_id': thread.id,
						'url': data.images[Object.keys(data.images)[thread.newImagesLoadedCount]],
						'name': imageMetaData.name,
						'size': imageMetaData.size,
						'thumbnail_url': 'http://localhost/replication-dimension/public/' + imageMetaData.thumb,
						'download_status': 1,
					};

					// not yet used indexing to append data directly to threads variable
					// let threadIndex = this.threads.indexOf(thread);

					this.images.push(newImageMeta);
					// i++;
					// this.newImagesLoadedCount++;
					// if(i < this.newImagesCount && this.downloading == true) {
					// 	fetch(i);
					// }
					thread.newImagesLoadedCount++;
					if(thread.newImagesLoadedCount < thread.newImagesCount && thread.downloading == true) {
						fetch(thread.newImagesLoadedCount);
					}
					else {
						if(thread.downloadStatus == 'downloading') {
							thread.downloading = false;
							thread.downloadStatus = 'finished';
							if(this.toggle.isTimerActive) {
								this.proceedScheduledLoadNewImages(thread);
							}
							else if(localStorage.getItem('config:auto-proceed-thread-load') == "1") {
								this.proceedLoadNewImages(thread);
							}
						}
					}
				})
				.catch((err) => {
					console.error("ERR in COMPONENT", err);
					// skip image in question
					console.log("skipping problematic image, proceeding to load next image in list");
					thread.newImagesLoadedCount++;
					if(thread.newImagesLoadedCount < thread.newImagesCount && thread.downloading == true) {
						fetch(thread.newImagesLoadedCount);
					}
				})
				;
			}
			if(thread.newImagesCount > 0) {
				fetch(thread.newImagesLoadedCount);
			}
			else {
				if(thread.downloadStatus == 'downloading') {
					thread.downloading = false;
					thread.downloadStatus = 'finished';
					if(this.toggle.isTimerActive) {
						this.proceedScheduledLoadNewImages(thread);
					}
					else if(localStorage.getItem('config:auto-proceed-thread-load') == "1") {
						this.proceedLoadNewImages(thread);
					}
				}
			}

		}).catch(error => {
			if(error.status == 404) {
				console.info("THREAD IS CLOSED", error.status, error.statusText);
				// > thread closed notification
				let index = this.threads.indexOf(thread);
				this.threads[Object.keys(this.threads)[index]].status = 3;
				this.threads[Object.keys(this.threads)[index]].downloading = false;
				this.threads[Object.keys(this.threads)[index]].downloadStatus = 'idle';
				// this.threads.splice(index, 1);
				this.threads[Object.keys(this.threads)[index]].isScheduled = false;
			}
		});
	}

	cancelDownload(thread): void {
		thread.downloading = false;
		// this.downloading = false;
		thread.downloadStatus = 'idle';
	}

	create(url: string, directory: string): void {
		this.threadService.createThread(url, directory).then(data => {
			let newThread = {
				'id': data.thread.id,
				'name': data.thread.name,
				'last_update': data.thread.last_update,
				'url': url,
				'download_directory': data.thread.download_directory,
				'status': 1,
				'isScheduled': false,
			};
			this.threads.push(newThread);
		}).catch(error => {
			if(error.status == 404) {
				console.info("THREAD IS CLOSED", error.status, error.statusText);
				// >>> thread closed notification
			}
		});
	}

	delete(thread:any): void {
		this.threadService.deleteThread(thread.id).then(() => {
			let index = this.threads.indexOf(thread);
			this.threads.splice(index, 1);
		});
	}

	excludeImage(image:any): void {
		this.imageService.exclude(image.id).then(() => {
			let index = this.images.indexOf(image);
			this.images.splice(index, 1);
		});
	}

	deleteImage(image:any): void {
		this.imageService.block(image.id).then(() => {
			let index = this.images.indexOf(image);
			this.images.splice(index, 1);
		});
	}

	getSuffixes(): void {
		this.suffixService.get().then(data => {
			this.suffixes = data;
		});
	}

	applySuffix(event:any): void {
		// console.log(event);
	}

	ngOnInit(): void {
		this.getThreads();
		this.getSuffixes();
	}

	toggle = {
		images: true,
		isTimerActive: false
	};

	toggleImagesDisplay():void {
		if(this.toggle.images === true)
			this.toggle.images = false;
		else
			this.toggle.images = true;
	}

	clearImagesDisplay():void {
		this.images = [];
	}

	getAutoProceedThreadLoadStatus():boolean {
		let autoproceedthreadValue:string = localStorage.getItem('config:auto-proceed-thread-load');
		if(autoproceedthreadValue != "1" && autoproceedthreadValue != "0") {
			localStorage.setItem('config:auto-proceed-thread-load', "1");
		}
		let status:boolean;
		if(autoproceedthreadValue == "1") {
			status = true;
		}
		else {
			status = false;
		}
		return status;
	}

	toggleAutoProceedThreadLoad():void {
		let autoproceedthreadValue = localStorage.getItem('config:auto-proceed-thread-load');
		if(autoproceedthreadValue == "1") {
			localStorage.setItem('config:auto-proceed-thread-load', "0");
		}
		else {
			localStorage.setItem('config:auto-proceed-thread-load', "1");
		}

	}

	toggleTimer():void {
		if(this.toggle.isTimerActive == false) {
			this.toggle.isTimerActive = true;
			this.timer = setInterval(() => {
				let startFromThread:any;
				for(let thread of this.threads) {
					if(thread.isScheduled == true) {
						startFromThread = thread;
						break;
					}
				}
				this.loadNewImages(startFromThread);
			}, 60*60*1000);
		}
		else {
			clearInterval(this.timer);
			this.toggle.isTimerActive = false;
		}
	}

	proceedScheduledLoadNewImages(thread):void {
		let index = this.threads.indexOf(thread);
		let nextThread;
		while(nextThread.isScheduled == false || index < this.threads.length) {
			index++;
			nextThread = this.threads[Object.keys(this.threads)[index]];
			if(nextThread.isScheduled == true) {
				break;
			}
		}
		console.log("loading next thread", nextThread);
		this.loadNewImages(nextThread);
	}

}