import { Alive as A, Dead as D, GameOfLive } from "./game-of-life";

describe("Game of Life", () => {
	const universe = GameOfLive.terraform([
		[D, D, A, D, D],
		[D, A, A, A, D],
		[D, D, A, D, D],
		[D, D, D, D, D],
		[D, D, D, D, D]	
	]);

	const game = new GameOfLive(universe);

	const testCases = [
		[[
			[D, A, A, A, D],
			[D, A, D, A, D],
			[D, A, A, A, D],
			[D, D, D, D, D],
			[D, D, D, D, D]	
		]],
		[[
			[D, A, D, A, D],
			[A, D, D, D, A],
			[D, A, D, A, D],
			[D, D, A, D, D],
			[D, D, D, D, D]	
		]],
		[[
			[D, D, D, D, D],
			[A, A, D, A, A],
			[D, A, A, A, D],
			[D, D, A, D, D],
			[D, D, D, D, D]	
		]],
		[[
			[D, D, D, D, D],
			[A, A, D, A, A],
			[A, D, D, D, A],
			[D, A, A, A, D],
			[D, D, D, D, D]	
		]]
	];

	test.each(testCases)("universe evolve", (given) => {
		const expected = GameOfLive.terraform(given).population();
		
		expect(game.evolve()).toEqual(expected);
	})
})