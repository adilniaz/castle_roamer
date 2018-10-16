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

	async beginSearching(): Promise<string[]> {
		await this.exploreRoom();

		if (this.room.id != '' && this.room.rooms.length > 0) {
			for (let roomId of this.room.rooms) {
				let roamer = new Roamer(this.base, roomId);
				this.chestsWithTreasure = this.chestsWithTreasure.concat(await roamer.beginSearching());
			}

		}
		if (this.room.id != '') {
			this.chests = this.room.chests;
			await this.verifyChests(this.chests);
		}
		if (this.chestsWithTreasure.length > 0)
			console.log(this.chestsWithTreasure);
		return this.chestsWithTreasure;
	}

	async exploreRoom() {
		let httpHandling = new HttpHandling(this.base, this.query);
		const room = await httpHandling.getData();
		if (room.id) {
			this.room = room;
		}
	}


	async verifyChests(chests: string[]) {
		if (chests.length > 0)
			for (let chestId of chests) {
				let httpHandling = new HttpHandling(this.base, chestId);
				const chest = await httpHandling.getData();
				if (!chest.status.includes('empty')) {
					this.chestsWithTreasure.push(chest.id);
				}
			}
	}

}
