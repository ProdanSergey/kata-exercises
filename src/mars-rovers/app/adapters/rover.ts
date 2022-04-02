import { Command, Direction, DirectionMap } from "../../shared";
import { Emitter } from "../ports/emitter";
import { Surface } from "../ports/surface";
import { Vehicle } from "../ports/vehicle";

export type RoverParams = {
  x: number,
  y: number,
  direction: Direction,
}

export class Rover implements Vehicle {
	private x: number;
  private y: number;
  private direction: Direction;
  
  constructor(
		instructions: RoverParams,
		private readonly surface: Surface,
    private readonly emitter: Emitter
	) {
    Object.assign(this, instructions);
  }

  public drive(commands: string): void {
		for (const command of commands.split('')) {
      if (command === Command.LEFT) this.turnLeft();
      if (command === Command.RIGHT) this.turnRight();
      if (command === Command.MOVE) this.move();
		}

		this.ping();
	}

	private move(): void {
		let x = this.x, y = this.y;
		
		if (this.direction === Direction.NORTH) y++;
    if (this.direction === Direction.SOUTH) y--;
    if (this.direction === Direction.WEST) x--;
    if (this.direction === Direction.EAST) x++;

		if (this.surface.includes(x, y)) {
			[this.x, this.y] = [x, y];
		} else {
			this.turnAround();
		}
	}

	private turnLeft(): void {
		this.direction = DirectionMap[this.direction].left;
	}

	private turnRight(): void {
		this.direction = DirectionMap[this.direction].right;
	}

	private turnAround(): void {
		this.direction = DirectionMap[this.direction].opposite;
	}

	private ping(): void {
		this.emitter.produce(this.x, this.y, this.direction);
	}
}