import { assert, createSandbox, SinonStubbedInstance } from "sinon";
import { Command, Direction } from "../../shared";
import { Mars } from "./mars";
import { Radio } from "./radio";
import { Rover } from "./rover";

describe('Rover', () => {
	let surface: SinonStubbedInstance<Mars>;
	let radio: SinonStubbedInstance<Radio>;

	const sandbox = createSandbox();

	beforeEach(() => {
		surface = sandbox.createStubInstance(Mars)
		radio = sandbox.createStubInstance(Radio);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it.each([
    [Command.LEFT, Direction.WEST],
    [Command.RIGHT, Direction.EAST]
  ])('should turn rover %s and head it to %s', (command, direction) => {
		const rover = new Rover({ x: 1, y: 1, direction: Direction.NORTH}, surface, radio);

    surface.includes.returns(true);

		rover.drive(command);

    assert.calledOnceWithExactly(radio.produce, 1, 1, direction);
	});

	it.each([
    [Direction.NORTH, [2, 3]],
    [Direction.WEST, [1, 2]],
    [Direction.SOUTH, [2, 1]],
    [Direction.EAST, [3, 2]],
  ])('should move rover in %s direction', (direction, [x, y]) => {
		const rover = new Rover({ x: 2, y: 2, direction}, surface, radio);

		surface.includes.returns(true);

		rover.drive(Command.MOVE);

    assert.calledOnceWithExactly(radio.produce, x, y, direction);
	});

	it('should leave rover where it was before', () => {
    const rover = new Rover({ x: 2, y: 2, direction: Direction.NORTH}, surface, radio);

		surface.includes.returns(true);

		rover.drive('UNKNOWN');

    assert.calledOnceWithExactly(radio.produce, 2, 2, Direction.NORTH);
	});

	it('should turn rover around due to breaching the boundaries of the surface', () => {
		const rover = new Rover({ x: 2, y: 0, direction: Direction.WEST}, surface, radio);

		surface.includes.returns(false);

		rover.drive(Command.MOVE);

		expect(radio.produce.calledWithExactly(2, 0, Direction.EAST)).toBeTruthy();
	});
});