export enum Mark { X = 'X', O = 'O'};


export class TicTacToe {
	private mark = Mark.X;

	constructor(private readonly field: Mark[][] = [
		[null, null, null],
		[null, null, null],
		[null, null, null]
	]) {}

	turn(rowId: number, colId: number): string | void {
		if ([rowId, colId].some(id => id < 0 || id > 2)) {
			throw new RangeError('Bad input');
		}
		if (this.field[rowId][colId]) {
			throw new Error('Occupied');
		}
		this.field[rowId][colId] = this.mark;

		if (this.isWin(rowId, colId)) return 'WIN';
		if (this.isDraw()) return 'DRAW';
	}

	with(mark: Mark): TicTacToe {
		return (this.mark = mark) && this;
	}

	private isWin(rowId: number, colId: number): boolean {
		return this.isThreeInDiagonal() || 
			this.isThreeInARow(rowId) || 
			this.isThreeInAColumn(colId);
	}

	private isThreeInARow(index: number): boolean {
		return this.field[index].every(this.isMarked);
	}
	
	private isThreeInAColumn(index: number): boolean {
		return this.field.map(r => r[index]).every(this.isMarked);
	}

	private isThreeInDiagonal(): boolean {
		const { field: [row1, row2, row3] } = this;
		
		return [row1[0], row2[1], row3[2]].every(this.isMarked) 
			|| [row1[2], row2[1], row3[0]].every(this.isMarked);
	}

	private isDraw(): boolean {
		return !this.field.some(row => row.includes(null));
	}

	private isMarked = (mark: Mark): boolean => mark === this.mark;
}