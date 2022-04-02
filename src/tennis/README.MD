# Tennis

Write a program that accepts two integers, and converts them to a tennis-style score.

## The scoring rules:

The scoring rules of tennis (per Wikipedia) are as follows:

A game is won by the first player to have won at least four points in total and at least two points more than the opponent.
Scores from zero to three points are described as “love”, “fifteen”, “thirty”, and “forty” respectively.
If at least three points have been scored by each player and the scores are equal, the score is “deuce”.
If at least three points have been scored by each player and a player has one more point than his opponent, the score is “ad-in” for the player in the lead and “ad-out” for the other.

## Inputs

```typescript
class TennisScoreCalculator {
	constructor(player1Points: number, player2Points: number);
  
	public score(): string;
}
```

## Example

```typescript
const tennisGame = new TennisScoreCalculator(1, 1);

tennisGame.score() // 'fifteen/fifteen'
```
