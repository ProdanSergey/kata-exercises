import { Command, CommandHandler } from "./command";
import { Direction } from "../../shared";
import { Rover } from "../adapters/rover";
import { RoverFactory } from "../factories/rover-factory";
import { Surface } from "../ports/surface";

export class BuildRoverCommand implements Command {
  constructor(
    public readonly instruction: string, 
    public readonly roverFactory: RoverFactory, 
    public readonly surface: Surface 
  ) {}
}

export class BuildRoverCommandHandler implements CommandHandler<Rover> {
  constructor(private readonly command: BuildRoverCommand, ) {}

  execute() {
    const [x, y, direction] = this.command.instruction.split(' ');

		return this.command.roverFactory.build({ 
      x: Number(x), 
      y: Number(y), 
      direction: direction as Direction 
    }, this.command.surface)
  }
}