import * as request from 'request-promise-native';

export async function getData(base: string, query: string) {

	const baseUrl = base;
	const queryString = query;
	const url = "http://" + baseUrl + queryString;

	var options = {
		url: url
	};
	const res = await request.get(options);
	const response = JSON.parse(res);
}
