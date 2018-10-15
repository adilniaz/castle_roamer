import { URL } from 'url';

import { Roamer } from './Roamer';

const url = 'http://castles.poulpi.fr/castles/1/rooms/entry';

// import * as Roamer from './Roamer';

export async function run() {

	const query = new URL(url).pathname;

	const base = new URL(url).hostname;

	console.log(new Date());
	let roamer = new Roamer(base, query);
	roamer.beginSearching();
}

run();
