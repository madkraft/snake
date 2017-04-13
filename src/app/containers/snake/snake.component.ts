import { Component, OnInit } from '@angular/core';
import { SnakeService } from '../../services/snake.service';
declare var p5: any;

@Component({
  selector: 'app-snake',
  templateUrl: './snake.component.html',
  styleUrls: ['./snake.component.scss']
})
export class SnakeComponent implements OnInit {
  p;
  frames = 5;
  food;
  score = 0;
  gameOver = false;

  constructor(private snake: SnakeService) {}

  ngOnInit() {
    this.p = new p5(this.sketch.bind(this), 'sketch');
    this.snake.setProcessing(this.p);
  }

  private pickLocation (p) {
    const cols = p.floor(p.width / this.snake.getScale());
    const rows = p.floor(p.height / this.snake.getScale());
    this.food = p.createVector(p.floor(p.random(cols)), p.floor(p.random(rows)));
    this.food.mult(this.snake.getScale());
    // make this function to return food
  };

  private sketch (p) {
    p.setup = () => {
      // const height = window.innerHeight * 0.75;
      // const width = window.innerHeight / 1.75;
      p.createCanvas(600, 400);
      this.pickLocation(p); // assign to new food
    };

    p.draw = () => {
      // p.background(51);
      p.background(0);

      if (this.snake.eat(this.food)) {
        this.pickLocation(p);
        this.frames++;
      }

      if (this.snake.death()) {
        this.frames = 5;
        this.gameOver = true;
      }

      this.snake.update();
      this.snake.show();

      p.fill(255, 0, 100);
      p.rect(this.food.x, this.food.y, this.snake.getScale(), this.snake.getScale());
      p.frameRate(this.frames);
      this.score = this.snake.getScore();
    };

    p.keyPressed = () => {
      if (p.keyCode === p.UP_ARROW) {
        this.snake.direction(0, -1);
      } else if (p.keyCode === p.DOWN_ARROW) {
        this.snake.direction(0, 1);
      } else if (p.keyCode === p.RIGHT_ARROW) {
        this.snake.direction(1, 0);
      } else if (p.keyCode === p.LEFT_ARROW) {
        this.snake.direction(-1, 0);
      }
    };
  }
}
