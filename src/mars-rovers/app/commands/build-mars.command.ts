import { Command, CommandHandler } from "./command";
import { Mars } from "../adapters/mars";
import { MarsFactory } from "../factories/mars-factory";

export class BuildMarsCommand implements Command {
  constructor(public readonly instruction: string, public readonly marsFactory: MarsFactory) {}
}

export class BuildMarsCommandHandler implements CommandHandler<Mars> {
  constructor(private readonly command: BuildMarsCommand) {}

  execute() {
    const [ lat, long ] = this.command.instruction.split(" ").map(Number);

    return this.command.marsFactory.build(lat, long)
  }
}