import { Alive, Dead, Terran } from "./terran";

describe('Terran', () => {
  
  it('should get terran latitude position', () => {
    const terran = new Terran(2, 5);

    expect(terran.lat()).toBe(2);
  });

  it("should get terran longitude position", () => {
    const terran = new Terran(2, 5);

    expect(terran.long()).toBe(5);
  });

  it("should create a copy of a terran", () => {
    const terran = new Terran(5, 5);

    expect(terran).toEqual(terran.replicate());
  });
});

describe('Alive', () => {
  it("should return an alive copy of a terran", () => {
    const terran = new Alive(5, 5);

    expect(terran.die()).toEqual(new Dead(5, 5));
  });
})

describe('Dead', () => {
  it("should return an alive copy of a terran", () => {
    const terran = new Dead(5, 5);

    expect(terran.alive()).toEqual(new Alive(5, 5));
  });
})