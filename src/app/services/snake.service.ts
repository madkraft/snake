import { Injectable } from '@angular/core';

@Injectable()
export class SnakeService {
  scale = 20;
  x = 0;
  y = 0;
  xspeed = 1;
  yspeed = 0;
  total = 0;
  tail = [];
  p;

  constructor() { }

  setProcessing (p) {
    this.p = p;
  }

  public update () {
    for (let i = 0; i < this.tail.length - 1; i++) {
      this.tail[i] = this.tail[i + 1];
    }
    this.tail[this.total - 1] = this.p.createVector(this.x, this.y);

    this.x = this.x + this.xspeed * this.scale;
    this.y = this.y + this.yspeed * this.scale;

    this.x = this.p.constrain(this.x, 0, this.p.width - this.scale);
    this.y = this.p.constrain(this.y, 0, this.p.height - this.scale);
  }

  public show () {
    // this.p.fill(255);
    this.p.fill('#FCFF11');
    this.tail.map(piece => this.p.rect(piece.x, piece.y, this.scale, this.scale));
    this.p.rect(this.x, this.y, this.scale, this.scale);
  }

  public direction (x, y) {
    if (x === this.xspeed || y === this.yspeed) {
      return;
    }
    this.xspeed = x;
    this.yspeed = y;
  }

  public eat (pos) {
    const distance = this.p.dist(this.x, this.y, pos.x, pos.y);
    if (distance < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  }

  public death () {
    for (let i = 0; i < this.tail.length; i++) {
      const pos = this.tail[i];
      const distance = this.p.dist(this.x, this.y, pos.x, pos.y);
      if (distance < 1) {
        this.total = 0;
        this.tail = [];
        return true;
      }
    }
  }

  public getScale () {
    return this.scale;
  }

  public getScore () {
    return this.total;
  }
}
