import { Command, CommandProcessor } from "../commands/command";
import { BuildMarsCommand, BuildMarsCommandHandler } from "../commands/build-mars.command";
import { BuildRoverCommand, BuildRoverCommandHandler } from "../commands/build-rover.command";
import { LaunchRoverCommand, LaunchRoverCommandHandler } from "../commands/launch-rover.command";

export class MissionCommandProcessor implements CommandProcessor {
  execute(command: BuildMarsCommand): ReturnType<BuildMarsCommandHandler['execute']>;
  execute(command: BuildRoverCommand): ReturnType<BuildRoverCommandHandler['execute']>;
  execute(command: LaunchRoverCommand): ReturnType<LaunchRoverCommandHandler['execute']>;
  
  execute(command: Command) {
    if(command instanceof BuildMarsCommand) {
      return new BuildMarsCommandHandler(command).execute();
    }
    if(command instanceof BuildRoverCommand) {
      return new BuildRoverCommandHandler(command).execute();
    }
    if(command instanceof LaunchRoverCommand) {
      return new LaunchRoverCommandHandler(command).execute();
    }
  }
};