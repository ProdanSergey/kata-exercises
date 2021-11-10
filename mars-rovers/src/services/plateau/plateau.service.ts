import { IPlateau } from "./plateau.definition";

export class Plateau implements IPlateau {
	constructor(
		private readonly rows: number,
		private readonly cols: number,
	) {}
	
	includes(x: number, y: number): boolean {
		return (x >= 0 && x <= this.rows) && (y >= 0 && y <= this.cols);
	}
}