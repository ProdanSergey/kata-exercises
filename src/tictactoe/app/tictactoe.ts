import { GameStage, Mark } from "../shared";
import { Grid } from "./grid";

export class TicTacToe {
	private mark = Mark.X;

	constructor(private readonly field: Grid) {}

	turn(rowId: number, colId: number): string | void {
		if ([rowId, colId].some(id => id < 0 || id > 2)) throw new RangeError('Bad input');
		if (this.field.get({x: rowId, y: colId})) throw new Error('Occupied');

    this.field.set({x: rowId, y: colId}, this.mark);

		if (
      this.isThreeInDiagonal() || 
      this.isThreeInARow(rowId) || 
      this.isThreeInAColumn(colId)
    ) return GameStage.WIN;

		if (this.isDraw()) return GameStage.DRAW;
	}

	with(mark: Mark): TicTacToe {
		return (this.mark = mark) && this;
	}

	private isThreeInARow(rowId: number): boolean {
		return this.field.getState()[rowId].every(this.isMarked);
	}
	
	private isThreeInAColumn(colId: number): boolean {
		return this.field.getState().map(r => r[colId]).every(this.isMarked);
	}

	private isThreeInDiagonal(): boolean {
		const [row1, row2, row3] = this.field.getState();
		
		return [row1[0], row2[1], row3[2]].every(this.isMarked) 
			|| [row1[2], row2[1], row3[0]].every(this.isMarked);
	}

	private isDraw(): boolean {
		return !this.field.getState().some(row => row.includes(null));
	}

	private isMarked = (mark: Mark): boolean => mark === this.mark;
}