import { Emitter } from "../ports/emitter";

export class Radio implements Emitter {
  produce(...message: unknown[]): void {
    console.log(...message)
  }
}