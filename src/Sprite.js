class Sprite {
  currentRef;
  x;
  y;
  degree;
  visible;
  size;

  constructor({
    currentRef,
    x = 10,
    y = 10,
    degree = 90,
    visible = true,
    size,
  }) {
    this.currentRef = currentRef;
    this.x = x;
    this.y = y;
    this.degree = degree;
    this.visible = visible;
    this.size = size;
  }

  move(x, y) {
    this.x = x;
    this.y = y;
  }

  turn(degrees, direction = "clockwise") {
    this.degree = degrees;
    console.log("DIRECTION:", direction);
  }

  glide(x, y, duration) {
    this.x = x;
    this.y = y;
    console.log("DURATION:", duration);
  }
}

export default Sprite;
