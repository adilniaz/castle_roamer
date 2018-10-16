import { HttpHandling } from './HttpHandling';
import { Room } from './Room';
import { Chest } from './Chest';

const Promise0 = require('bluebird')


export class Roamer {
	base: string;
	query: string;
	room: Room;
	chest: Chest;
	chestsWithTreasure: string[];
	httpHandling: HttpHandling;

	constructor(base: string, query: string) {
		this.base = base;
		this.query = query;

		this.httpHandling = new HttpHandling(base);

		this.chest = new Chest('', '');
		this.room = new Room('', [], []);

		this.chestsWithTreasure = [];
	}

	async beginSearching(): Promise<string[]> {
		await this.exploreRoom();

		// CHESTS
		if (this.room.chests.length > 0) {
			await Promise0.map(this.room.chests, async (chestPath: string) => {
				await this.getChest(chestPath);
			}, { concurrency: 10 });
		}

		// ROOMS
		if (this.room.rooms.length > 0) {
			await Promise0.map(this.room.rooms, async (roomPath: string) => {
				await this.getRoom(roomPath)
			}, { concurrency: 10 });
		}

		return this.chestsWithTreasure;
	}

	async exploreRoom() {
		const room = await this.httpHandling.getData(this.query);
		if (room && room.id) {
			this.room = room;
		}
	}

	async getChest(chestPath: string) {
		const chest = <Chest>await this.httpHandling.getData(chestPath);
		if (chest && !chest.status.includes('empty')) {
			this.chestsWithTreasure.push(chest.id);
		}
	}

	async getRoom(roomPath: string) {
		let roamer = new Roamer(this.base, roomPath);
		const res = await roamer.beginSearching();
		this.chestsWithTreasure = this.chestsWithTreasure.concat(res);
	}

}
