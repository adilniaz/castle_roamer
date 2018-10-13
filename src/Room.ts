interface IRoom {
	id: string;
	rooms: string[];
	chests: string[];
}

export class Room implements IRoom {
	id: string;
	rooms: string[];
	chests: string[];
	constructor(id: string, rooms: string[], chests: string[]) {
		this.id = id;
		this.rooms = rooms;
		this.chests = chests;
	}
}
