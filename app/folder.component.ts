import { Component, OnInit } from '@angular/core';
import { SuffixService } from './suffix.service';
import { Router } from '@angular/router';

@Component({
	// moduleId: module.id,
	selector: 'folder-selector',
	templateUrl: 'app/folder.component.html',
	styleUrls: [],
	providers: [SuffixService]
})

export class FolderComponent implements OnInit {
	suffixes: any[];

	constructor(
		private router: Router,
		private suffixService: SuffixService,
	) {}

	getSuffixes(): void {
		this.suffixService.get().then(data => {
			console.log(data);
			this.suffixes = data;
		});
	}

	createSuffix(name:string): void {
		this.suffixService.create(name).then(data => {
			let newSuffix = {
				'id': data.id,
				'name': data.name,
			};
			this.suffixes.push(newSuffix);
		});
	}

	deleteSuffix(suffix:any): void {
		this.suffixService.delete(suffix.id).then(() => {
			let index = this.suffixes.indexOf(suffix);
			this.suffixes.splice(index, 1);
		});
	}

	ngOnInit(): void {
		this.getSuffixes();
	}
}