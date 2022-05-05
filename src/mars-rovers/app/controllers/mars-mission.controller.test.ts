import { createSandbox, match, assert } from "sinon";
import { Mars } from "../adapters/mars";
import { Rover } from "../adapters/rover";
import { BuildMarsCommand } from "../commands/build-mars.command";
import { BuildRoverCommand } from "../commands/build-rover.command";
import { LaunchRoverCommand } from "../commands/launch-rover.command";
import { MarsFactory } from "../factories/mars-factory";
import { RoverFactory } from "../factories/rover-factory";
import { MarsMissionController } from "./mars-mission.controller";
import { MissionCommandProcessor } from "./mars-mission.processor";

describe('Mission Control', () => {
	const sandbox = createSandbox();

  const mars = sandbox.createStubInstance(Mars);
  const rover = sandbox.createStubInstance(Rover);
  
  const marsFactory = sandbox.createStubInstance(MarsFactory);
  const roverFactory = sandbox.createStubInstance(RoverFactory);

  marsFactory.build.returns(mars);
  roverFactory.build.returns(rover);

  const commandProcessor = sandbox.createStubInstance(MissionCommandProcessor);

  let marsMission: MarsMissionController;

	beforeEach(() => {
    marsMission = new MarsMissionController(roverFactory, marsFactory,  commandProcessor);
	});

  afterEach(() => {
    sandbox.reset();
  })

	it('should execute build surface command', () => {
    marsMission.instruct('5 5');

		assert.calledOnceWithExactly(commandProcessor.execute, match.instanceOf(BuildMarsCommand));
  });

  it('should execute landing position', () => {	
    commandProcessor.execute.onFirstCall().returns(mars as any);

    marsMission.instruct('5 5');
		marsMission.instruct('1 2 N');
    
    assert.match(commandProcessor.execute.getCall(0).args[0], match.instanceOf(BuildMarsCommand));
    assert.calledOnceWithExactly(commandProcessor.execute, match.instanceOf(BuildMarsCommand));
	});

  it('should execute list of commands and launch a vehicle', () => {	
    commandProcessor.execute.onFirstCall().returns(mars as any).onSecondCall().returns(rover as any);

    marsMission.instruct('5 5');
		marsMission.instruct('1 2 N');
		marsMission.instruct('LMRMLMLMM');

		assert.match(commandProcessor.execute.getCall(0).args[0], match.instanceOf(BuildMarsCommand));
    assert.match(commandProcessor.execute.getCall(1).args[0], match.instanceOf(BuildRoverCommand));
    assert.match(commandProcessor.execute.getCall(2).args[0], match.instanceOf(LaunchRoverCommand));
    assert.calledThrice(commandProcessor.execute);
	});
});