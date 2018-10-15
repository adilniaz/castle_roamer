import * as request from 'request-promise-native';

export class HttpHandling {

	url: string;

	constructor(base: string, query: string) {
		this.url = base + query;
	}

	async getData(): Promise<any> {
		let options = {
			url: "http://" + this.url
		};
		const res = await request.get(options);
		const response = JSON.parse(res);

		return response;
	}
}
