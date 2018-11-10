import Map from './tilemap.json';

/** @module Player
  * A class representing the player.
  */
export default class Player {
  /** @constructor
    * Constructs a new player instance
    * @param {float} x - the player's x position
    * @param {float} y - the player's y position
    */
  constructor(x, y, dir, moving, h, w) {
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.moving = moving;
    this.tileset = new Image();
    this.tileset.src = "tileset.png";
    this.frameCount = 0;
    this.switch = 0;
    this.HEIGHT = h;
    this.WIDTH = w;

    var a = [];
    Map.layers[1].objects.forEach(function(obj) {
      var thing = { x: obj.x, y: obj.y-32 };
      a.push(thing);
    });

    this.no_go = a;
  }

  /** @method update
    * Updates the player
    * @param {double} deltaT - the elapsed time
    * @param {Input} input - the input object
    */
  update(deltaT, input) {
    if((!this.frameCount && input.keyDown("ArrowLeft")) || (this.frameCount && this.dir == 2)) {
      this.dir = 2;
      if (!this.frameCount && !this.checkForCollisions(Math.round(this.x-32), Math.round(this.y))) {
       return;
     }
     else {
       this.x -= 1.6;
       this.moving = true;
       this.frameCount++;
       if (this.frameCount == 20) {
         this.frameCount = 0;
         this.x = Math.round(this.x);
       }
     }
    }
    else if((!this.frameCount && input.keyDown("ArrowRight")) || (this.frameCount && this.dir == 3)) {
      this.dir = 3;
      if (!this.frameCount && !this.checkForCollisions(Math.round(this.x+32), Math.round(this.y))) {
        return
      }
      else {
       this.x += 1.6;
       this.moving = true;
       this.frameCount++;
       if (this.frameCount == 20) {
         this.frameCount = 0;
         this.x = Math.round(this.x);
       }
     }
    }
    else if((!this.frameCount && input.keyDown("ArrowUp")) || (this.frameCount && this.dir == 1)) {
      this.dir = 1;
      if (!this.frameCount && !this.checkForCollisions(Math.round(this.x), Math.round(this.y-32))) {
        return;
      }
      else {
        this.y -= 1.6;
        this.moving = true;
        this.frameCount++;
        if (this.frameCount == 20) {
          this.frameCount = 0;
          this.y = Math.round(this.y);
        }
      }
    }
    else if((!this.frameCount && input.keyDown("ArrowDown")) || (this.frameCount && this.dir == 0)) {
      this.dir = 0;
      if (!this.frameCount && !this.checkForCollisions(Math.round(this.x), Math.round(this.y+32))) {
        return;
      }
      else {
       this.y += 1.6;
       this.moving = true;
       this.frameCount++;
       if (this.frameCount == 20) {
         this.frameCount = 0;
         this.y = Math.round(this.y);
       }
     }
    }
    else {
      this.moving = false;
      this.switch = 0;
    }
  }

  checkForCollisions(x, y) {
    x = Math.abs(x);
    y = Math.abs(y);
    var length = this.no_go.length;
    for (var i = 0; i < length; i++) {
      if (x == this.no_go[i].x && y == this.no_go[i].y) {
        return false;
      }
    }
    return true;
  }

  /** @method render
    * Renders the player
    * @param {double} deltaT - elapsed time
    * @param {Context2D} context - the rendering context
    */
  render(deltaT, context) {
    context.beginPath();
    switch (this.dir) {
      case 0:
        if (this.moving) {
          if (Math.round(this.frameCount) % 6 == 0) {
            this.switch = (this.switch + 1) % 2;
          }

          if (this.switch) {
            context.drawImage(this.tileset, 32, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
          else {
            context.drawImage(this.tileset, 0, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
        }
        else {
          context.drawImage(this.tileset, 0, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
        }
        break;
      case 1:
        if (this.moving) {
          if (Math.round(this.frameCount) % 6 == 0) {
            this.switch = (this.switch + 1) % 2;
          }

          if (this.switch) {
            context.drawImage(this.tileset, 96, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
          else {
            context.drawImage(this.tileset, 64, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
        }
        else {
          context.drawImage(this.tileset, 64, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
        }
        break;
      case 2:
        if (this.moving) {
          if (Math.round(this.frameCount) % 7 == 0) {
            this.switch = (this.switch + 1) % 2;
          }

          if (this.switch) {
            context.drawImage(this.tileset, 160, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
          else {
            context.drawImage(this.tileset, 128, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
        }
        else {
          context.drawImage(this.tileset, 128, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
        }
        break;
      case 3:
        if (this.moving) {
          if (Math.round(this.frameCount) % 7 == 0) {
            this.switch = (this.switch + 1) % 2;
          }

          if (this.switch) {
            context.drawImage(this.tileset, 224, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
          else {
            context.drawImage(this.tileset, 192, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
          }
        }
        else {
          context.drawImage(this.tileset, 192, 0, 32, 32, this.WIDTH/2, this.HEIGHT/2, 32, 32);
        }
        break;
    }
  }

}
