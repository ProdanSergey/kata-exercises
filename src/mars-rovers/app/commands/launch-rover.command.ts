import { Command, CommandHandler } from "./command";
import { Rover } from "../adapters/rover";

export class LaunchRoverCommand implements Command {  
  constructor(
    public readonly instruction: string, 
    public readonly vehicle: Rover, 
  ) {}
}

export class LaunchRoverCommandHandler implements CommandHandler {
  constructor(private readonly command: LaunchRoverCommand) {}

  execute(): void {
    this.command.vehicle.drive(this.command.instruction);
  }
}