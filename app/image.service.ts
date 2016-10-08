import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ImageService {

	constructor(private http: Http) {}

	private headers = new Headers({'Content-Type': 'application/json'});

	loadImage(threadId:number, imageUrl:string): Promise<any> {
		return this.http.post(`http://localhost/replication-dimension/public/api/image/load`, JSON.stringify({thread_id: threadId, url: imageUrl}), {headers: this.headers})
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	exclude(imageId:number): Promise<any> {
		return this.http.delete(`http://localhost/replication-dimension/public/api/image/${imageId}/exclude`)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	block(imageId:number): Promise<any> {
		return this.http.delete(`http://localhost/replication-dimension/public/api/image/${imageId}/block`)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.warn('An error occured', error);
		return Promise.reject(error.message || error);
	}	
}