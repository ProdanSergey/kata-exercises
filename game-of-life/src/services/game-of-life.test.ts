class Universe {
	state: number[][];
	nextState: number[][];

	constructor(state: number[][]) {
		this.state = state;
		this.nextState = [
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]	
		]
	}

	evolve() {
		return this.nextState;
	}
}

describe("Game of Life", () => {
	it("should return all dead", () => {
		const universe = new Universe([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]	
		]);
	
		expect(universe.evolve()).toEqual([
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0]	
		])
	})
})