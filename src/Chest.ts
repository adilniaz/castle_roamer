export interface IChest {
	id: string;
	status: string;
}

export class Chest implements IChest {
	status: string;
	id: string;

	constructor(id: string, status: string) {
		this.id = id;
		this.status = status;
	}
}
