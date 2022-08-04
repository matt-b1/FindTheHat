const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor(field) {
    this.playerX = 0;
    this.playerY = 0;
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

  outOfBounds(x, y) {
    if ((x < 0 || x > this.field[0].length) || (y < 0 || y > this.field.length)) {
      console.log('That location is out of bounds');
      this.gameOver = true
      return true;
    }
    this.validSquare(x, y);
    return false;
  }
}


const myField = new Field([
  ['*', '░', 'O'],
  ['O', '░', '░'],
  ['O', '^', '░'],
]);

myField.startGame();
