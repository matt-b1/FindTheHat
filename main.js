const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    for (let i = 0; i < field.length; i++) {
      for (let j = 0; j < field[i].length; j++) {
        if (field[i][j] === '*') {
          this.playerX = j;
          this.playerY = i;
        }
      }
    }
    this.field = field;
    this.gameOver = false;
  }

  startGame() {
    while (!this.gameOver){
      this.print();
      const input = prompt('Enter user input: ');
      this.movePlayer(input);
    }
  }

  print() {
    for (var line of this.field) {
      const str = line.toString().replace(/,/g, '');
      console.log(str);
    }
  }

  movePlayer(input) {
    let y = this.playerY;
    let x = this.playerX;
    switch(input) {
      case 'u':
        if (!this.outOfBounds(y - 1, x)){
          this.playerY -= 1;
          this.field[this.playerY][this.playerX] = '*';
        }
        break;
      case 'd':
        if (!this.outOfBounds(y + 1, x)) {
          this.playerY += 1;
          this.field[this.playerY][this.playerX] = '*';
        }
        break;
      case 'l':
        if (!this.outOfBounds(y, x - 1)) {
          this.playerX -= 1;
          this.field[this.playerY][this.playerX] = '*';
        }
        break;
      case 'r':
        if (!this.outOfBounds(y, x + 1)) {
          this.playerX += 1;
          this.field[this.playerY][this.playerX] = '*';
        }
        break;
    }
  }

  validSquare(x, y) {
      if (this.field[x][y] == '░' || this.field[x][y] =='*') {
        return true;
      }
      else if (this.field[x][y] == '^') {
        console.log('Congratulations, you found the hat');
      }
      else {
        console.log('Oops, you fell down a hole');
      }
      this.gameOver = true;
      return false;
    
  }

  outOfBounds(y, x) {
    console.log(y);
    console.log(this.field.length);
    if ((x < 0 || x > this.field[0].length - 1) || (y < 0 || y > this.field.length - 1)) {
      console.log('That location is out of bounds');
      this.gameOver = true
      return true;
    }
    this.validSquare(y, x);
    return false;
  }

  static generateField(height, width, holeCount) {
    var newGrid = [...Array(height)].map(e => Array(width).fill('░'));
    newGrid[Math.floor(Math.random() * height)][Math.floor(Math.random() * width)] = '*';
    while (holeCount > 0) {
      let holeY = Math.floor(Math.random() * height);
      let holeX = Math.floor(Math.random() * width);
      while (newGrid[holeY][holeX] !== '░') {
        holeY = Math.floor(Math.random() * height);
        holeX = Math.floor(Math.random() * width);
      }
      newGrid[holeY][holeX] = 'O';
      holeCount--;
    }
    let hatX = Math.floor(Math.random() * height);
    let hatY = Math.floor(Math.random() * width);
    while (newGrid[hatY][hatX] !== '░') {    
      hatY = Math.floor(Math.random() * height);
      hatX = Math.floor(Math.random() * width);
    }
    newGrid[hatY][hatX] = '^';
    return newGrid;
  }
}

/*
const myField = new Field([
  ['*', '░', 'O'],
  ['O', '░', '░'],
  ['O', '^', '░'],
]);
*/

const randomField = new Field(Field.generateField(10, 6, 10));
randomField.startGame();
