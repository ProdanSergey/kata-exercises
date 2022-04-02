export interface Emitter {
  produce(...message: unknown[]): void;
}