import * as request from 'request-promise-native';

export class HttpHandling {

	base: string;

	constructor(base: string) {
		this.base = base;
	}

	async getData(base: string): Promise<any> {
		let options = {
			url: "http://" + this.base + base
		};

		try {
			const response = await request(options);
			return Promise.resolve(JSON.parse(response));
		}
		catch (error) { }
	}
}
