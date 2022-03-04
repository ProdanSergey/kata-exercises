describe('TennisScoreCalculator', () => {
	const TennisScoreCalculator = (() => {
		const SCORES = ['love', 'fifteen', 'thirty', 'forty', 'set'];

		class TennisScoreCalculator {
			private mapPointsToScore(points: number): string {
				return SCORES[points];
			}

			private isAdvantage(player1Points: number, player2Points: number) {
				return (player1Points + player2Points) >= 7;
			}
			
			private isDeuce(player1Points: number, player2Points: number) {
				return player1Points === 3 && player2Points === 3;
			};
	
			public score(player1Points: number, player2Points: number): string {
				if (this.isAdvantage(player1Points, player2Points)) {
					return player1Points > player2Points ? 'advantage/forty' : 'forty/advantage';
				}

				if (this.isDeuce(player1Points, player2Points)) {
					return 'deuce/deuce';
				}

				return this.mapPointsToScore(player1Points) + '/' + this.mapPointsToScore(player2Points);
			}
		}

		return TennisScoreCalculator;
	})()

	it.each([
		['love/love', [0, 0]],
		['fifteen/love', [1, 0]],
		['thirty/love', [2, 0]],
		['forty/love', [3, 0]],
		['set/love', [4, 0]],
		['love/love', [0, 0]],
		['love/fifteen', [0, 1]],
		['love/thirty', [0, 2]],
		['love/forty', [0, 3]],
		['love/set', [0, 4]],
		['thirty/thirty', [2, 2]],
		['thirty/forty', [2, 3]],
		['forty/fifteen', [3, 1]],
		['deuce/deuce', [3, 3]],
		['advantage/forty', [4, 3]],
		['forty/advantage', [3, 4]],
	])('should return "%s" for given "%s" score', (expected, [player1Points, player2Points]) => {
		const tennisCalculator = new TennisScoreCalculator();

		expect(tennisCalculator.score(player1Points, player2Points)).toBe(expected);
	});
});