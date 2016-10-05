import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Thread } from './thread';

@Injectable()
export class ThreadService {
	
	constructor(private http: Http) {}

	private headers = new Headers({'Content-Type': 'application/json'});
	// private threadUrl = 'http://localhost/replication-dimension/public/api/thread';

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


	private handleError(error: any): Promise<any> {
		console.warn('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}