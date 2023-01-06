
export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  static add(a: Vector2, b: Vector2) :Vector2 {
    return new Vector2(a.x + b.x, a.y + b.y);
  }

  static multiply(a: Vector2, value: number) :Vector2 {
    return new Vector2(a.x * value, a.y * value);
  }
}

export enum Alignment {
  Top,
  Left,
  Right,
  Bottom,
  Center,
}

export enum ConnPointAlignment {
  Left,
  Right,
}