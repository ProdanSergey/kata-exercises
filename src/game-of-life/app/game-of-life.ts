import { Terran, Alive, Dead } from './terran';

type Terra<T = Terran> = T[][];

class Universe {
	constructor(private readonly terra: Terra) {}
	
	public replicate(): Universe {
		return new Universe(this.terra.map(latitude => latitude.map(terran => terran.replicate())));
	}

	public population(): Terra {
		return JSON.parse(JSON.stringify(this.terra));
	}

	public find(lat: number, long: number): Terran | undefined {
		return this.terra[lat]?.[long];
	}

	public settle(terran: Terran): void {
		this.terra[terran.lat()][terran.long()] = terran;
	}

	public [Symbol.iterator]() {
		let lat = 0, long = 0;

		const next = (lat: number, long: number): Terran | undefined => {			
			if (!this.terra[lat]) {
				return undefined;
			}

			if (this.terra[lat][long]) {
				return this.find(lat, long);
			}

			return next(lat + 1, 0);
		};
	
		return {
			next() {
				const terran = next(lat, long);

				if (terran) {
					[lat, long] = [terran.lat(), terran.long() + 1];
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
		return new Universe(terra.map((latitude, x) => latitude.map((Terran, y) => new Terran(x, y))));
	}
	
	private target: Universe;
	private readonly destination: Universe;

	constructor(universe: Universe) {
		this.target = universe;
		this.destination = universe.replicate();
	}

	public evolve(): Terra {
		for (const terran of this.target) {
			this.underpopulation(terran);
			this.stagnation(terran);
			this.reproduction(terran);
			this.overpopulation(terran);
		};

		return (this.target = this.destination.replicate()).population();
	}

	private underpopulation(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors < 2) {
			this.destination.settle((terran as Alive).die());
		}
	} 

	private stagnation(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors >= 2 && neighbors <= 3) {
			this.destination.settle(terran.replicate());
		}
	} 

	private reproduction(terran: Terran): void {
		if (Terran.is(terran, Alive)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors === 3) {
			this.destination.settle((terran as Dead).alive());
		}
	} 

	private overpopulation(terran: Terran): void {
		if (Terran.is(terran, Dead)) return;

		const neighbors = this.neighbors(terran);

		if (neighbors > 3) {
			this.destination.settle((terran as Alive).die());
		}
	} 

	private neighbors(terran: Terran): number {
		const lat = terran.lat(), long = terran.long();
		
		return [
			this.target.find(lat - 1, long - 1),
			this.target.find(lat, long - 1),
			this.target.find(lat - 1, long),
			this.target.find(lat + 1, long - 1),
			this.target.find(lat - 1, long + 1),
			this.target.find(lat + 1, long),
			this.target.find(lat, long + 1),
			this.target.find(lat + 1, long + 1),
		].filter(terran => Terran.is(terran, Alive)).length;
	}
}