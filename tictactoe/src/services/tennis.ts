
const SCORES = ['love', 'fifteen', 'thirty', 'forty'];

export class TennisScoreCalculator {
	constructor(
		private readonly player1Points: number, 
		private readonly player2Points: number
	) {
		this.validate();
	}

	private validate() {
		if ([this.player1Points, this.player2Points].some(points => points < 0)) {
			throw new Error('Invalid input: points must not be negative');
		}
	}

	private mapPointsToScore(points: number): string {
		return SCORES[points];
	}

	private isSet(): boolean {
		return [this.player1Points, this.player2Points].some(points => points >= 4) && Math.abs(this.player1Points - this.player2Points) > 1;
	}

	private isAdvantage(): boolean {
		return [this.player1Points, this.player2Points].some(points => points >= 3) && Math.abs(this.player1Points - this.player2Points) === 1;
	}
	
	private isDeuce(): boolean {
		return [this.player1Points, this.player2Points].some(points => points >= 3) && this.player1Points === this.player2Points;
	};

	public score(): string {
		if (this.isSet()) {
			return this.player1Points > this.player2Points ? 'set/out' : 'out/set';
		}
		
		if (this.isAdvantage()) {
			return this.player1Points > this.player2Points ? 'ad-in/ad-out' : 'ad-out/ad-in';
		}

		if (this.isDeuce()) {
			return 'deuce';
		}

		return this.mapPointsToScore(this.player1Points) + '/' + this.mapPointsToScore(this.player2Points);
	}
}