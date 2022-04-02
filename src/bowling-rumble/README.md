# Bowling Rumble

Write a program to score a game of Ten-Pin Bowling:
- Input: a number representing knocked pins amount (from 0 to 10). One per each throw.
- Output: game score, game position.

## The scoring rules:

Each game, or "line" of bowling, includes ten turns, or "frames" for the bowler. 
In each frame, the bowler gets up to two tries to knock down all ten pins. 

If the first ball in a frame knocks down all ten pins, this is called a "strike". The frame is over. The score for the frame is ten plus the total of the pins knocked down in the next two balls. 

If the second ball in a frame knocks down all ten pins, this is called a "spare". The frame is over. The score for the frame is ten plus the number of pins knocked down in the next ball. 

If, after both balls, there is still at least one of the ten pins standing the score for that frame is simply the total number of pins knocked down in those two balls.

If you get a spare in the last (10th) frame you get one more bonus ball. If you get a strike in the last (10th) frame you get two more bonus balls.

The game score is the total of all frame scores.

The game position is the current completed frame.

## Inputs
bowlingRumble.throw(0);
bowlingRumble.throw(5);
bowlingRumble.throw(10);

### Example 1
10,10,10,10,10,10,10,10,10,10,10,10 -> Total score = 300

### Example 2
9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,9,1,10 -> Total score = 150

### Example 3
1,3,9,0,10,4,3,2,8,5,3,10,10,2,4,10,4,5 -> Total score = 123
