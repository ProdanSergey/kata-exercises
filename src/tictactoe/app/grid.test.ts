import { Mark } from "../shared";
import { Grid } from "./grid";

describe("Grid", () => {
  it("should build an empty grid", () => {
    expect(Grid.build().getState()).toEqual([
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ])
  });

  it("should change grid cell value", () => {
    const grid = Grid.build();

    grid.set({ x: 1, y: 1 }, Mark.X);

    expect(grid.getState()).toEqual([
      [null, null, null],
      [null, Mark.X, null],
      [null, null, null]
    ])
  })

  it("should read grid cell value", () => {
    const grid = Grid.build([
      [null, null, null],
      [null, Mark.X, null],
      [null, null, null]
    ]);

    expect(grid.get({ x: 1, y: 1 })).toEqual(Mark.X)
  })
});