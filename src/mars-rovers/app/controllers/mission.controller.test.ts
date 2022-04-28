import { createSandbox } from "sinon";
import { Direction } from "../../shared";
import { Mars } from "../adapters/mars";
import { Rover } from "../adapters/rover";
import { MarsFactory } from "../factories/mars-factory";
import { RoverFactory } from "../factories/rover-factory";
import { MissionController } from "./mission.controller";
import { MissionCommandProcessor } from "./mission.processor";

describe('Mission Control', () => {
	const sandbox = createSandbox();

  const mockedSurface = sandbox.createStubInstance(Mars);
  const mockedRover = sandbox.createStubInstance(Rover);

  const marsFactory = sandbox.createStubInstance(MarsFactory);
  const roverFactory = sandbox.createStubInstance(RoverFactory);

	afterEach(() => {
    sandbox.reset();
	});

	it('should execute surface params', () => {
    const mission = new MissionController(roverFactory, marsFactory,  new MissionCommandProcessor());

    marsFactory.build.returns(mockedSurface);

    mission.execute('5 5');

		expect(marsFactory.build.calledOnceWith(5, 5)).toBe(true);
    expect(roverFactory.build.notCalled).toBe(true);
	});

  it('should execute landing position', () => {
    const mission = new MissionController(roverFactory, marsFactory, new MissionCommandProcessor());

    marsFactory.build.returns(mockedSurface);
		
    mission.execute('5 5');
		mission.execute('1 2 N');

		expect(marsFactory.build.calledOnce).toBe(true);
    expect(roverFactory.build.notCalled).toBe(true);
	});

  it('should execute list of commands and launch a vehicle', () => {
    const mission = new MissionController(roverFactory, marsFactory,  new MissionCommandProcessor());

    marsFactory.build.returns(mockedSurface);
    roverFactory.build.returns(mockedRover);
		
    mission.execute('5 5');
		mission.execute('1 2 N');
		mission.execute('LMRMLMLMM');

		expect(marsFactory.build.calledOnce).toBe(true);
    expect(roverFactory.build.calledOnceWith({x: 1, y: 2, direction: Direction.NORTH}, mockedSurface)).toBe(true);
    expect(mockedRover.drive.calledOnceWith('LMRMLMLMM')).toBe(true);
	});
});