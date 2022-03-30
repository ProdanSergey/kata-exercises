import { Alive as A, Dead as D, GameOfLive } from "./game-of-life";

describe("Game of Life", () => {
	describe("Dies", () => {
		const testCases = [
			{ 
				given: [
					[D, D, D, D, D],
					[D, A, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[D, A, D, A, D],
					[D, D, D, D, D],
					[D, A, D, A, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[D, A, D, A, D],
					[D, D, A, D, D],
					[D, A, D, A, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, D, A, D, D],
					[D, A, D, A, D],
					[D, D, A, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[A, A, A, A, A],
					[D, D, A, D, D],
					[A, A, A, A, A],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, A, A, A, D],
					[D, A, A, A, D],
					[D, D, D, D, D],
					[D, A, A, A, D],
					[D, A, A, A, D]	
				]
			},
		]

		test.each(testCases)("A live cell with more than three live neighbours dies, as if by overpopulation", ({ given, expected }) => {
			const game = new GameOfLive(GameOfLive.terraform(given));
		
			expect(game.evolve()).toEqual(GameOfLive.terraform(expected).population())
		})
	})

	describe("Survive", () => {
		const testCases = [
			{ 
				given: [
					[D, D, A, D, D],
					[D, A, A, A, D],
					[D, D, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, A, A, A, D],
					[D, A, D, A, D],
					[D, A, A, A, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, A, D, D],
					[D, D, A, D, D],
					[D, D, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, A, A, A, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[D, A, D, D, D],
					[D, D, A, D, D],
					[D, D, D, A, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[D, D, D, A, D],
					[D, D, A, D, D],
					[D, A, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
			{ 
				given: [
					[D, D, D, D, D],
					[D, A, A, D, D],
					[D, A, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, D, D, D],
					[D, A, A, D, D],
					[D, A, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
		];

		test.each(testCases)("A live cell with two or three live neighbours lives on to the next generation", ({ given, expected }) => {
			const game = new GameOfLive(GameOfLive.terraform(given));
		
			expect(game.evolve()).toEqual(GameOfLive.terraform(expected).population())
		})
	})

	describe("Resurrect", () => {
		const testCases = [
			{ 
				given: [
					[D, D, A, D, D],
					[D, A, D, A, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				], 
				expected: [
					[D, D, A, D, D],
					[D, D, A, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D],
					[D, D, D, D, D]	
				]
			},
		]

		test.each(testCases)("A dead cell with exactly three live neighbours becomes a live cell, as if by reproduction", ({ given, expected }) => {
			const game = new GameOfLive(GameOfLive.terraform(given));
		
			expect(game.evolve()).toEqual(GameOfLive.terraform(expected).population())
		})
	})
})