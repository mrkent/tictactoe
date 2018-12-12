class Game {
  constructor() {
    this.board = [];
    this.board[0] = ['', '', ''];
    this.board[1] = ['', '', ''];
    this.board[2] = ['', '', ''];

    this.xsMove = true;
    this.winner = null;
    this.pieceCount = 0;

    this._winState = {};
  }

  placePiece(i, j) {
    if (!this.winner && this.board[i][j] === '' && this.pieceCount < 9) {
      this.board[i][j] = this.xsMove ? 'x' : 'o';
      this.pieceCount += 1;
      this._updateWinState();
      this._endTurn();
      console.log(this.board[0]);
      console.log(this.board[1]);
      console.log(this.board[2]);
    }
  }

  _applyGraity() {
    this._rotateBoard();
    this._dropPieces();
    this._dropPieces();
  }

  _updateWinState() {
    this._winState = {
      r0: this.board[0],
      r1: this.board[1],
      r2: this.board[2],
      c0: [this.board[0][0], this.board[1][0], this.board[2][0]],
      c1: [this.board[0][1], this.board[1][1], this.board[2][1]],
      c2: [this.board[0][2], this.board[1][2], this.board[2][2]],
      d1: [this.board[0][0], this.board[1][1], this.board[2][2]],
      d2: [this.board[0][2], this.board[1][1], this.board[2][0]]
    };
  }

  _endTurn() {
    this.xsMove = !this.xsMove;
    this._updateWinState();
    this._determineWinner();
  }

  _determineWinner() {
    for (var key in this._winState) {
      if (this._winState[key].join('') === 'xxx') {
        this.winner = 'x';
      } else if (this._winState[key].join('') === 'ooo') {
        this.winner = 'o';
      } else {
        if (this.pieceCount >= 9) {
          this.winner = 'draw';
        } 
      }
    }
  }
}