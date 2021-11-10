import { createSandbox, SinonStubbedInstance } from "sinon";
import { Direction } from "../src/constants";
import { Plateau } from "../src/services/plateau/plateau.service";
import { Rover } from "../src/services/rover/rover.service";

describe('RoverService', () => {
	let map: SinonStubbedInstance<Plateau>;
	let radio: SinonStubbedInstance<Console>;

	const sandbox = createSandbox();

	beforeEach(() => {
		map = sandbox.createStubInstance(Plateau)
		radio = sandbox.createStubInstance(console.Console);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should instantiate rover properly', () => {
		const rover = new Rover(1, 1, Direction.NORTH, map);

		expect(rover).toBeInstanceOf(Rover);
	});

	it('should turn rover to left and head it to south', () => {
		const rover = new Rover(1, 1, Direction.WEST, map);

		rover.turnLeft();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(1, 1, Direction.SOUTH)).toBeTruthy();
	});

	it('should turn rover to right and head it to east', () => {
		const rover = new Rover(1, 1, Direction.NORTH, map);

		rover.turnRight();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(1, 1, Direction.EAST)).toBeTruthy();
	});

	it('should move rover to north direction', () => {
		const rover = new Rover(2, 2, Direction.NORTH, map);

		map.includes.returns(true);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(2, 3, Direction.NORTH)).toBeTruthy();
	});

	it('should move rover to south direction', () => {
		const rover = new Rover(2, 2, Direction.SOUTH, map);

		map.includes.returns(true);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(2, 1, Direction.SOUTH)).toBeTruthy();
	});

	it('should move rover to west direction', () => {
		const rover = new Rover(2, 2, Direction.WEST, map);

		map.includes.returns(true);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(1, 2, Direction.WEST)).toBeTruthy();
	});

	it('should move rover to east direction', () => {
		const rover = new Rover(2, 2, Direction.EAST, map);

		map.includes.returns(true);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(3, 2, Direction.EAST)).toBeTruthy();
	});

	it('should leave rover where it was', () => {
		const rover = new Rover(2, 2, 'UNKNOWN' as Direction, map);

		map.includes.returns(true);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(2, 2, 'UNKNOWN' as Direction)).toBeTruthy();
	});

	it('should turn rover around due to breaching the boundaries of the plateau', () => {
		const rover = new Rover(0, 2, Direction.WEST, map);

		map.includes.returns(false);

		rover.move();
		rover.echo(radio);

		expect(radio.log.calledWithExactly(0, 2, Direction.EAST)).toBeTruthy();
	});
});