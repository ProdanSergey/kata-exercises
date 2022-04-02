import { Direction } from "../shared";
import { MarsFactory } from "./factories/mars-factory";
import { RoverFactory } from "./factories/rover-factory";
import { Surface } from "./ports/surface";
import { Vehicle } from "./ports/vehicle";

export class MissionControl {
  private vehicle: Vehicle;
  private surface: Surface;
	private readonly buffer: string[];
  
	constructor(
		private readonly roverFactory: RoverFactory,
		private readonly marsFactory: MarsFactory,
	) {	
		this.buffer = [];
	}

	public execute(input: string): void {
    const bufferSize = this.buffer.push(input);

    if (!this.surface) {
      return this.buildSurface();
    }

    if (bufferSize > 1) {
      this.buildVehicle();
      this.launchVehicle();
    }
	}

	private buildSurface(): void {
    const input = this.buffer.pop();
    
		const [ cols, rows ] = this.parseSurface(input);

		this.surface = this.marsFactory.build(cols, rows);
	}

  private parseSurface(input: string) {
    return input.split(' ').map(Number)
  }

	private buildVehicle(): void {
		const input = this.buffer.shift();
		
    const [x, y, direction] = this.parseVehicle(input);

		this.vehicle = this.roverFactory.build({ x, y, direction }, this.surface);
	}

	private parseVehicle(input: string): [number, number, Direction] {
		const [x, y, direction] = input.split(' ');

		return [Number(x), Number(y), direction as Direction]
	}

  private launchVehicle() {
    const commands = this.buffer.shift();

    this.vehicle.drive(commands);
  }
};