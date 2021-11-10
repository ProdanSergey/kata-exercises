import { createSandbox, SinonStubbedInstance } from "sinon";
import { Plateau } from "../src/services/plateau/plateau.service";
import { Rover } from "../src/services/rover/rover.service";
import { Transmitter } from "../src/services/transmitter/transmitter.service";

describe('TransmitterService', () => {
	let transmitter: Transmitter;
	let radio: SinonStubbedInstance<Console>; 

	class MockedRover extends Rover {}
	class MockedPlateau extends Plateau {}

	const sandbox = createSandbox();

	beforeEach(() => {
		radio = sandbox.createStubInstance(console.Console);
		transmitter = new Transmitter(MockedRover, MockedPlateau, radio);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should instantiate transmitter properly', () => {
		expect(transmitter).toBeInstanceOf(Transmitter);
	});

	it('should land a rover and receive a response by the radio', () => {
		transmitter.consume('5 5');

		transmitter.consume('1 2 N');
		transmitter.consume('LMRMLMLMM');

		expect(radio.log.called).toBeTruthy();
	});

	it('should land a rover and skip wrong command and receive a response by the radio', () => {
		transmitter.consume('5 5');

		transmitter.consume('1 2 N');
		transmitter.consume('LMRMLMLDMM');

		expect(radio.log.called).toBeTruthy();
	});
});