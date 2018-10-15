import { HttpHandling } from './HttpHandling';
import { Room } from './Room';

export class Roamer {
	base: string;
	query: string;
	url: string;
	room: Room;
	chests: string[];
	chestsWithTreasure: string[];


	constructor(base: string, query: string) {
		this.base = base;
		this.query = query;
		this.url = base + query;
		this.room = new Room('', [], []);
		this.chests = [];
		this.chestsWithTreasure = [];
	}

	async beginSearching() {
		console.log('<')
		await this.exploreRoom();

		console.log(this.room.id);

		this.chests = this.room.chests;
		await this.verifyChests(this.chests);

		if (this.room.rooms.length >= 1) {
			for (let roomId of this.room.rooms) {
				let roamer = new Roamer(this.base, roomId);
				roamer.beginSearching();
			}

		}

		console.log(this.chestsWithTreasure + '\n>');
		console.log(new Date());
	}

	async exploreRoom() {
		let httpHandling = new HttpHandling(this.base, this.query);
		const room = await httpHandling.getData();
		this.room = room;
	}


	async verifyChests(chests: string[]) {
		console.log('-');
		for (let chestId of chests) {
			let httpHandling = new HttpHandling(this.base, chestId);
			const chest = await httpHandling.getData();
			if (!chest.status.includes('empty')) {
				this.chestsWithTreasure.push(chest.id);
			}
		}
		console.log('-');
	}

}
