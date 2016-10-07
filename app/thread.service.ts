import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Thread } from './thread';

@Injectable()
export class ThreadService {
	
	constructor(private http: Http) {}

	private headers = new Headers({'Content-Type': 'application/json'});

	getThreads(): Promise<any[]> {
		return this.http.get('http://localhost/replication-dimension/public/api/thread')
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	getSavedImages(threadId:number): Promise<any> {
		return this.http.get(`http://localhost/replication-dimension/public/api/thread/${threadId}/images`)
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	getNewImagesList(threadId:number): Promise<any> {
		return this.http.get(`http://localhost/replication-dimension/public/api/thread/${threadId}/load`)
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	createThread(url:string, directory:string): Promise<any> {
		return this.http.post('http://localhost/replication-dimension/public/api/thread/new', JSON.stringify({url: url, download_directory: directory}), {headers: this.headers})
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	deleteThread(threadId:number): Promise<any> {
		return this.http.delete(`http://localhost/replication-dimension/public/api/thread/${threadId}`)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}



	private handleError(error: any): Promise<any> {
		console.warn('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}