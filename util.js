const random = (n) => {
  return Math.ceil(Math.random() * n);
};

const generateScramble = () => {
  const moves = ['R', 'L', 'U', 'D', 'F', 'B'];
  const postfix = [' ', '\' ', '2 '];
  let scramble = '';
  let count = 0;
  let move;
  let previousMove;
  while(count  < 20) {
    move = moves[random(6) - 1];
    if(scramble === '' || move !== previousMove) {
      scramble += move + postfix[random(3) - 1];
      previousMove = move;
      count++;
    }
  }
  return scramble;
};


module.exports = { random, generateScramble };