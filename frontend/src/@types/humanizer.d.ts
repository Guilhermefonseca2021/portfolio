declare module "humanizer" {
  export default class Humanize {
    constructor(baseUnitName: string, baseUnit: number);
    unit(unitName: string, value: number): this;
    setRound(round: (value: number) => number): this;
    humanize(value: number, preferredUnit?: string): [number, string];
  }
}
