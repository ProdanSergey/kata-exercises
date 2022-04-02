import { GameStage, Mark } from "../shared";
import { Grid } from "./grid";
import { TicTacToe } from "./tictactoe";

const { X, O } = Mark;

describe("Tic Tac Toe", () => {
	
	it.each([
		[X, 0, 0],
		[X, 1, 0],
		[X, 1, 1],
		[O, 0, 0],
		[O, 0, 1],
		[O, 1, 1]
	])("should put an %s mark at %s:%s", (mark, rowId, colId) => {		
		const grid = Grid.build();

		const game = new TicTacToe(grid);

		game.with(mark).turn(rowId, colId);

		expect(grid.get({ x: rowId, y: colId })).toBe(mark);
	});

	describe('Win', () => {
		test.each([
			[X, 0, 2, [
				[X, X, null],
				[O, O, X],
				[X, O, O]
			]],
			[X, 2, 0, [
				[X, O, X],
				[X, O, O],
				[null, X, O]
			]],
			[X, 2, 2, [
				[X, O, O],
				[O, X, X],
				[X, O, null]
			]]
		])("player with %s mark makes a turn at %s:%s game should be won", (mark, rowId, colId, state) => {		
			const game = new TicTacToe(Grid.build(state));
	
			expect(
				game.with(mark).turn(rowId, colId)
			).toBe(GameStage.WIN);
		});
	})

	describe('DRAW', () => {
		test.each([
			[O, 2, 1, [
				[X, O, O],
				[O, X, X],
				[X, null, X]
			]],
			[X, 2, 1, [
				[X, O, O],
				[O, X, X],
				[X, null, O]
			]],
		])("player with %s mark makes a turn at %s:%s should be draw", (mark, rowId, colId, state) => {		
			const game = new TicTacToe(Grid.build(state));
	
			expect(
				game.with(mark).turn(rowId, colId)
			).toBe(GameStage.DRAW);
		});
	})

	describe('Exceptions', () => {
		test.each([
			[O, 0, 0, [
				[X, null, null],
				[null, null, null],
				[null, null, null]
			]],
			[X, 0, 0, [
				[O, null, null],
				[null, null, null],
				[null, null, null]
			]],
		])('player with %s mark makes a turn at %s:%s should throw an occupied error', (mark, rowId, colId, state) => {
			const game = new TicTacToe(Grid.build(state));
	
			expect(
				() => game.with(mark).turn(rowId, colId)
			).toThrowError('Occupied');
		});

		test.each([
			[X, 3, 0],
			[X, 0, 3],
			[O, 2, -1],
			[O, -1, 2],
			[X, -1, 3],
		])('player with %s mark makes a turn at %s:%s should throw a range error', (mark, rowId, colId) => {
			const game = new TicTacToe(Grid.build());
	
			expect(
				() => game.with(mark).turn(rowId, colId)
			).toThrowError(expect.any(RangeError));
		});
	});
})