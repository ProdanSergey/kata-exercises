
class Terran {
	static is(target: unknown, TargetType: typeof Terran): boolean {
		return target instanceof TargetType;
	}

	private readonly _x: number;
	private readonly _y: number;
	
	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;
	}
	
	public x() {
		return this._x;
	}
	public y() {
		return this._y;
	}
}

export class Alive extends Terran {
	readonly _type = 'alive';

	public die(): Dead {
		return new Dead(this.x(), this.y())
	}
}
export class Dead extends Terran {
	readonly _type = 'dead';

	public alive(): Alive {
		return new Alive(this.x(), this.y())
	}
}

export type Terra<T = Terran> = T[][];

class Universe {
	constructor(private readonly terra: Terra) {}
	
	public copy(): Universe {
		return new Universe(this.terra.map(row => row.map(terran => terran)));
	}

	public population(): Terra {
		return JSON.parse(JSON.stringify(this.terra));
	}

	public find(x: number, y: number): Terran | undefined {
		return this.terra[x]?.[y];
	}

	public populate(terran: Terran) {
		this.terra[terran.x()][terran.y()] = terran;
	}

	public [Symbol.iterator]() {
		let rowId = 0, colId = 0;

		const next = (rowId: number, colId: number): Terran | undefined => {			
			if (!this.terra[rowId]) {
				return undefined;
			}

			if (this.terra[rowId][colId]) {
				return this.find(rowId, colId);
			}

			return next(rowId + 1, 0);
		};
	
		return {
			next() {
				const terran = next(rowId, colId);

				if (terran) {
					[rowId, colId] = [terran.x(), terran.y() + 1];
				}
 
				return {
					done: !terran,
					value: terran
				}
			}
		}
	}
}

export class GameOfLive {
	static terraform(terra: Terra<typeof Terran>): Universe {
		return new Universe(terra.map((row, x) => row.map((Terran, y) => new Terran(x, y))));
	}
	
	private target: Universe;
	private readonly destination: Universe;

	constructor(universe: Universe) {
		this.target = universe;
		this.destination = universe.copy();
	}

	public evolve(): Terra {
		for (const terran of this.target) {
			this.underpopulation(terran)
			this.survive(terran)
			this.reproduction(terran)
			this.overpopulation(terran)
		};

		return (this.target = this.destination.copy()).population();
	}

	private underpopulation(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors < 2) {
			this.destination.populate((terran as Alive).die())
		}
	} 

	private survive(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors >= 2 && neighbors <= 3) {
			this.destination.populate(terran)
		}
	} 

	private reproduction(terran: Terran): void {
		if (Terran.is(terran, Alive)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors === 3) {
			this.destination.populate((terran as Dead).alive())
		}
	} 

	private overpopulation(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors > 3) {
			this.destination.populate((terran as Alive).die())
		}
	} 

	private neighbors(terran: Terran): number {
		const rowId = terran.x(), colId = terran.y();
		
		return [
			this.target.find(rowId - 1, colId - 1),
			this.target.find(rowId, colId - 1),
			this.target.find(rowId - 1, colId),
			this.target.find(rowId + 1, colId - 1),
			this.target.find(rowId - 1, colId + 1),
			this.target.find(rowId + 1, colId),
			this.target.find(rowId, colId + 1),
			this.target.find(rowId + 1, colId + 1),
		].filter(terran => Terran.is(terran, Alive)).length;
	}
}