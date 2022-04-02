import { Mark } from "../shared";

export class Grid {
  private constructor(private readonly state: Mark[][]) {}
  
  public set({ x, y }: { x: number, y: number }, mark: Mark): void {
    this.state[x][y] = mark;
  }
  
  public get({ x, y }: { x: number, y: number }): Mark {
    return this.state[x][y];
  }

  public getState(): Mark[][] {
    return JSON.parse(JSON.stringify(this.state));
  } 

  static build(initialState?: Mark[][]) {
    return new Grid(initialState ?? [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ]);
  }
}