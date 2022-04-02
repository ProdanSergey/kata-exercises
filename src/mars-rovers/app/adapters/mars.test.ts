import { Mars } from "./mars";

describe('Mars Surface', () => {	
	it.each([
    [2, 2],
    [0, 0],
    [5, 5],
    [5, 0],
    [0, 5]
  ])('should determines whether the plateau includes %s, %s', (x, y) => {
		const plateau = new Mars(5, 5);
		
		expect(plateau.includes(x, y)).toBeTruthy();
	});
});