import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Thread } from './thread';

@Injectable()
export class ThreadService {
	
	constructor(private http: Http) {}

	private threadUrl = 'http://localhost/replication-dimension/public/api/thread';

	getThreads(): Promise<void> {
		console.warn("AAA");
		return this.http.get(this.threadUrl).toPromise().then(function(response) {
			console.warn(response);
		}).catch(e => {console.warn(e);});
		// return this.http.get('http://localhost/replication-dimension/public/api/thread')
		// 	.toPromise()
		// 	.then(response => response.json().data as Thread[])
		// 	.catch(this.handleError);
	}

	private headers = new Headers({'Content-Type': 'application/json'});

	private handleError(error: any): Promise<any> {
		console.warn('An error occurred', error);
		return Promise.reject(error.message || error);
	}
}