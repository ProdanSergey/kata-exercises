import { Plateau } from "../src/services/plateau/plateau.service";

describe('PlateauService', () => {	
	it('should instantiate map properly', () => {
		const plateau = new Plateau(5, 5);

		expect(plateau).toBeInstanceOf(Plateau);
	});

	it('should determines whether the plateau includes specified coordinates', () => {
		const plateau = new Plateau(5, 5);
		
		expect(plateau.includes(2, 2)).toBeTruthy();
		expect(plateau.includes(0, 0)).toBeTruthy();
		expect(plateau.includes(5, 5)).toBeTruthy();
		expect(plateau.includes(5, 0)).toBeTruthy();
		expect(plateau.includes(0, 5)).toBeTruthy();
	});
});