export class Interpolation {
  static MODES = {
    LINEAR: "LINEAR",
    EASE_IN: "EASE_IN",
    EASE_OUT: "EASE_OUT",
    SPIKE: "SPIKE",
  };

  static Lerp(start, target, progress) {
    return start + (target - start) * progress;
  }

  static EaseIn(start, target, progress) {
    // console.log("progress", progress);
    return this.Lerp(start, target, this.Quindratic(progress));
  }

  static EaseOut(start, target, progress) {
    // debugger;
    return this.Lerp(
      start,
      target,
      this.Flip(this.Quindratic(this.Flip(progress)))
    );
  }

  static Spike(start, target, progress) {
    if (progress <= 0.5) return this.EaseIn(start, target, progress / 0.5);

    return this.EaseIn(start, target, this.Flip(progress) / 0.5);
  }

  static Flip(t) {
    return 1 - t;
  }

  static Square(x) {
    return x * x;
  }

  static Cubic(x) {
    return x * x * x;
  }

  static Quadratic(x) {
    return x * x * x * x;
  }

  static Quindratic(x) {
    return x * x * x * x;
  }
}
