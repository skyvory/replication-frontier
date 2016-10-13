import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SuffixService {

	constructor(private http: Http) {}

	private headers = new Headers({'Content-Type': 'application/json'});

	get(): Promise<any[]> {
		return this.http.get('http://localhost/replication-dimension/public/api/suffix')
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	create(name:string): Promise<any> {
		return this.http.post('http://localhost/replication-dimension/public/api/suffix', 
			JSON.stringify({
				name: name
			}), {
				headers: this.headers
			})
			.toPromise()
			.then(response => response.json().data as any[])
			.catch(this.handleError);
	}

	delete(id:number): Promise<any> {
		return this.http.delete(`http://localhost/replication-dimension/public/api/suffix/${id}`)
			.toPromise()
			.then(() => null)
			.catch(this.handleError);
	}

	private handleError(error:any): Promise<any> {
		console.error('An error occured', error);
		return Promise.reject(error.message || error);
	}
}