import { TennisScoreCalculator } from "./tennis";

describe('TennisScoreCalculator', () => {
	describe('First player', () => {
		test.each([
			['love/love', 0],
			['fifteen/love', 1],
			['thirty/love', 2],
			['forty/love', 3],
			['set/out', 4],
		])('the first player score is %s for given %s points', (expected, given) => {
			const tennisCalculator = new TennisScoreCalculator(given, 0);
	
			expect(tennisCalculator.score()).toBe(expected);
		});
	});

	describe('Second player', () => {
		test.each([
			['love/love', 0],
			['love/fifteen', 1],
			['love/thirty', 2],
			['love/forty', 3],
			['out/set', 4],
		])('the second player score is %s for given %s points', (expected, given) => {
			const tennisCalculator = new TennisScoreCalculator(0, given);
	
			expect(tennisCalculator.score()).toBe(expected);
		});
	})

	describe('Game of two players', () => {
		test.each([
			['out/set', 1, 4],
			['thirty/thirty', 2, 2],
			['ad-out/ad-in', 2, 3],
			['out/set', 2, 4],
			['forty/fifteen', 3, 1],
			['deuce', 3, 3],
			['ad-out/ad-in', 3, 4],
			['ad-in/ad-out', 4, 3],
			['set/out', 5, 3],
			['ad-in/ad-out', 5, 4],
			['deuce', 5, 5],
			['ad-out/ad-in', 5, 6],
			['ad-in/ad-out', 11, 10],
			['set/out', 12, 10],
		])('the score is "%s" when the first player has "%s" points and the second player has "%s" points', (expected, player1Points, player2Points) => {
			const tennisCalculator = new TennisScoreCalculator(player1Points, player2Points);
	
			expect(tennisCalculator.score()).toBe(expected);
		});
	})

	describe('Corner Cases', () => {
		it('should throw an error when any player has negative points', () => {
			expect(() => {
				new TennisScoreCalculator(-1, 0);
			}).toThrowError('Invalid input: points must not be negative');
		});
	});
});