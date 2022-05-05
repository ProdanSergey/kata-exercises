import { Rover } from "../adapters/rover";
import { BuildMarsCommand } from "../commands/build-mars.command";
import { BuildRoverCommand } from "../commands/build-rover.command";
import { LaunchRoverCommand } from "../commands/launch-rover.command";
import { MarsFactory } from "../factories/mars-factory";
import { RoverFactory } from "../factories/rover-factory";
import { Surface } from "../ports/surface";
import { MissionCommandProcessor } from "./mars-mission.processor";

export class MarsMissionController {
  private surface: Surface;
	private readonly buffer: string[];
  
	constructor(
		private readonly roverFactory: RoverFactory,
		private readonly marsFactory: MarsFactory,
    private readonly commandProcessor: MissionCommandProcessor,
	) {	
		this.buffer = [];
	}

	public instruct(instruction: string): void {
    const bufferSize = this.buffer.push(instruction);
    
    if (!this.surface) {
      return this.buildSurface();
    }

    if (bufferSize < 2) {
      return;
    }

    const vehicle = this.buildVehicle();
    this.launchVehicle(vehicle);
	}

	private buildSurface(): void {   
    const input = this.buffer.shift(); 
    const command = new BuildMarsCommand(input, this.marsFactory);

		this.surface = this.commandProcessor.execute(command);
	}

	private buildVehicle(): Rover {
    const instruction = this.buffer.shift();
    const command = new BuildRoverCommand(instruction, this.roverFactory, this.surface)

    return this.commandProcessor.execute(command)
	}

  private launchVehicle(vehicle: Rover) {
    const instruction = this.buffer.shift();
    const command = new LaunchRoverCommand(instruction, vehicle)

    this.commandProcessor.execute(command);
  }
};
