export class Terran {
	static is(target: unknown, Constructor: typeof Terran): boolean {
		return target instanceof Constructor;
	}

	constructor(private readonly x: number, private readonly y: number) {}
	
	public lat(): number {
		return this.x;
	}
	public long(): number {
		return this.y;
	}
	public replicate(): Terran {
		return new (this.constructor as typeof Terran)(this.lat(), this.long());
	}
}

export class Alive extends Terran {
	readonly condition = 'alive';

	public die(): Dead {
		return new Dead(this.lat(), this.long());
	}
}

export class Dead extends Terran {
	readonly condition = 'dead';

	public alive(): Alive {
		return new Alive(this.lat(), this.long());
	}
}