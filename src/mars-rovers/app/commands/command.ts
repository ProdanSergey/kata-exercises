// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Command {}

export interface RevertibleCommand extends Command {
  undo(): void;
}

export interface CommandHandler<R = void> {
  execute(): R
}

export interface CommandProcessor {
  execute(command: Command): ReturnType<CommandHandler['execute']>
};