import { BowlingRumble } from './app';

let bowlingRumble: BowlingRumble;

beforeEach(() => {
	bowlingRumble = new BowlingRumble();
});

describe('Bowling Game', () => {	
	const simulate = (times: number, pins: number = 0) => {
		for (let i = 0; i < times; i++)
			bowlingRumble.throw(pins);
	}

	const play = (throws: number[]) => {
		for (const pins of throws)
			bowlingRumble.throw(pins);
	};

	it.each([
		[[10], 10],
		[[5], 5],
	])('should show the current player score', (given, expected) => {
		for (const pins of given)
			simulate(1, pins);

		expect(bowlingRumble.showScore()).toEqual(expected);
	});

	it.each([
		[2, 1],
		[8, 4],
		[20, 10],
		[1, 0],
		[7, 3],
		[19, 9]
	])('should complete current frame when player throws twice', (given, expected) => {
		simulate(given);

		expect(bowlingRumble.showPosition()).toBe(expected);
	});

	it.each([
		[10, 10, 1],
		[5, 5, 0]
	])('should complete current frame when player throws a strike', (given, expectedScore, expectedLength) => {
		simulate(1, given);

		expect(bowlingRumble.showScore()).toEqual(expectedScore);
		expect(bowlingRumble.showPosition()).toEqual(expectedLength);
	});

	it('should add score of knocked down pins after a spare to the total score as a bonus', () => {
		simulate(2, 5);
		simulate(1, 7);
		
		expect(bowlingRumble.showScore()).toEqual(24);
	});

	it('should add score of two knocked down pins after a strike to the total score as a bonus', () => {
		simulate(1, 10);
		simulate(1, 7);
		simulate(1, 2);
		
		expect(bowlingRumble.showScore()).toEqual(28);
	});

	it('should add one extra throw to the last frame in case of a spare', () => {
		simulate(20, 5);

		expect(bowlingRumble.isCompleted()).toBeFalsy();
	});

	it('should add two extra throws to the last frame in case of a strike', () => {
		simulate(18);
		simulate(1, 10);
		simulate(1, 5);
		simulate(1, 5);

		expect(bowlingRumble.isCompleted()).toBeTruthy();
	})

	const whenPlayerCompleteTenVariousFrames = () => {
		play([1,3,9,0,10,4,3,2,8,5,3,10,10,2,4,10,4,5]);
	};

	const whenPlayerMissTenFrames = () => {
		simulate(20);
	};

	const whenPlayerSpareTenFramesAndOneBonusThrow = () => {
		simulate(20, 5);
		simulate(1, 5);
	};

	const whenPlayerStrikeTenFramesAndTwoBonusThrows = () => {
		simulate(10, 10);
		simulate(2, 10);
	};
	
	it('should complete a game when player throws ten various frames', () => {
		whenPlayerCompleteTenVariousFrames();

		expect(bowlingRumble.isCompleted()).toBeTruthy();
		expect(bowlingRumble.showScore()).toEqual(123);
	});

	it('should complete a game when player throws ten miss frames', () => {
		whenPlayerMissTenFrames();

		expect(bowlingRumble.isCompleted()).toBeTruthy();
		expect(bowlingRumble.showScore()).toEqual(0);
	});

	it('should complete a game when player throws ten spare frames and one bonus throw', () => {
		whenPlayerSpareTenFramesAndOneBonusThrow();

		expect(bowlingRumble.isCompleted()).toBeTruthy();
		expect(bowlingRumble.showScore()).toEqual(150);
	});

	it('should complete a game when player throws ten strikes frames and two bonus throws', () => {
		whenPlayerStrikeTenFramesAndTwoBonusThrows();

		expect(bowlingRumble.isCompleted()).toBeTruthy();
		expect(bowlingRumble.showScore()).toEqual(300);
	});
});
