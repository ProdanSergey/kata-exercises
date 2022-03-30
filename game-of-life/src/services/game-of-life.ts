type Props = { x: number, y: number };

class Terran {
	static is(target: unknown, TargetType: typeof Terran): boolean {
		return target instanceof TargetType;
	}

	private readonly props: Props;
	
	constructor(props: Props) {
		this.props = props;
	}
	
	public x() {
		return this.props.x;
	}
	public y() {
		return this.props.y;
	}
}

export class Alive extends Terran {
	public die(): Dead {
		return new Dead({ x: this.x(), y: this.y()})
	}
}
export class Dead extends Terran {
	public alive(): Alive {
		return new Alive({ x: this.x(), y: this.y()})
	}
}

type Terra<T = Terran> = T[][];

class Universe {
	constructor(private readonly terra: Terra) {}

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
		return new Universe(terra.map((row, x) => row.map((Terran, y) => new Terran({x, y}))));
	}

	private static copy(universe: Universe): Universe {
		return GameOfLive.terraform(universe.population().map(row => row.map(() => Dead)));
	}
	
	private target: Universe;
	private readonly destination: Universe;

	constructor(universe: Universe) {
		this.target = universe;
		this.destination = GameOfLive.copy(universe);
	}

	public evolve(): Terra {
		for (const terran of this.target) {
			this.spare(terran)
			this.resurrect(terran)
		};

		this.target = this.destination;

		return this.target.population();
	}

	private spare(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors >= 2 && neighbors <= 3) {
			this.destination.populate(terran)
		}
	} 

	private resurrect(terran: Terran): void {
		if (Terran.is(terran, Alive)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors === 3) {
			this.destination.populate((terran as Dead).alive())
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