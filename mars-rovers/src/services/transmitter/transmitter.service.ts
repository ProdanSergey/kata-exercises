import { Direction } from "../../constants";
import { Plateau } from "../plateau/plateau.service";
import { Rover } from "../rover/rover.service";
import { Command, ITransmitter } from "./transmitter.definition";

export class Transmitter implements ITransmitter {
	private readonly buffer: string[];
	private map: Plateau;

	constructor(
		private readonly rover = Rover,
		private readonly plateau = Plateau,
		private readonly radio = console,
	) {	
		this.buffer = [];
		this.map = null;
	}

	public consume(input: string): void {
		const size = this.buffer.push(input);

		switch (size) {
			case 1:
				this.initMap(input);
				break;
			case 3: {
				const commands = this.buffer.pop();
				const position = this.buffer.pop();
	
				this.initRover(position, commands);

				break;
			}
			default:
				break;
		}
	}

	private initMap(input: string): void {
		const [cols, rows] = this.parseBoundaries(input);

		this.map = new this.plateau(cols, rows);
	}

	private parseBoundaries(boundaries: string): number[] {
		return boundaries.split(' ').map(Number);
	}

	private initRover(position: string, commands: string): void {
		const rover = this.chargeRover(position);
		
		this.landRover(rover, commands);
	}

	private chargeRover(position: string): Rover {
		const [x, y, head] = this.parseCoordinates(position);

		return new this.rover(x, y, head, this.map);
	}

	private parseCoordinates(coordinates: string): [number, number, Direction] {
		const [x, y, head] = coordinates.split(' ');

		return [Number(x), Number(y), head as Direction]
	} 

	private landRover(rover: Rover, commands: string): void {
		for (const command of commands.split('')) {
			switch (command) {
				case Command.LEFT:
					rover.turnLeft();
					break;
				case Command.RIGHT:
					rover.turnRight();
					break;
				case Command.MOVE:
					rover.move();
					break;
				default:
					break;
			}
		}

		rover.echo(this.radio);
	}
};