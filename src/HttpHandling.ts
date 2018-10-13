import * as request from 'request-promise-native';
import { Room } from './Room';

export async function getData(base: string, query: string): Promise<Room> {

	const baseUrl = base;
	const queryString = query;
	const url = "http://" + baseUrl + queryString;

	var options = {
		url: url
	};
	const res = await request.get(options);
	const response = JSON.parse(res);

	return new Room(response.id, response.rooms, response.chests);
}
