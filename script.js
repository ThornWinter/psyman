var strict = false;
var quadrants = ['red', 'yellow', 'blue', 'green'];
var redNote = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var yellowNote = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var blueNote = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var greenNote = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
var sounds = [redNote, yellowNote, blueNote, greenNote];
var sequence = [];
var answer = [];
var fail = false;
var round = 1;

playRound(round);

function playRound(num) {
  addSequence();
  document.getElementById('current').innerHTML = sequence.length;
  playSequence();
  //document.getElementById('output').innerHTML = sequence;
}

function disarmButtons() {
  document.getElementById('red').disabled = true;
  document.getElementById('yellow').disabled = true;
  document.getElementById('blue').disabled = true;
  document.getElementById('green').disabled = true;
}

function armButtons() {
  document.getElementById('red').disabled = false;
  document.getElementById('yellow').disabled = false;
  document.getElementById('blue').disabled = false;
  document.getElementById('green').disabled = false;
}

function addSequence() {
  sequence.push(Math.floor(Math.random() * 4));
}

function playSequence() {
  sequence.forEach(function(cur, ind, arr) {
    setTimeout(function(x) {
      return function() {
        document.getElementById(quadrants[x]).style = "opacity: 1;";
        sounds[x].play();
        setTimeout(function() {
          document.getElementById(quadrants[x]).style = "opacity: .5;";
        }, 500);
      };
    }(cur), 1000 * (ind + 1));
  });
}

function tap(color) {
  var x = quadrants.indexOf(color);
  answer.push(x);
  document.getElementById(color).style = "opacity: 1;";
  sounds[x].play()
  setTimeout(function() {
    document.getElementById(color).style = "opacity: .5;";
  }, 500);
  if (answer[answer.length - 1] !== sequence[answer.length - 1]) {
    alert('WRONG')
    answer.splice(0);
    if (strict) {
      sequence.splice(0);
      round = 1;
      playRound(round);
    }
    playSequence();
  }
  if (answer.length === sequence.length) {
    if (sequence.length === 20) {
      alert("YOU WIN!!!!");
      restart();
    }
    round++;
    answer.splice(0);
    playRound(round);
  }
}

function strictToggle() {
  if (!strict) {
    strict = true;
    document.getElementById('strict').style = "background-color: red;";
  } else {
    strict = false;
    document.getElementById('strict').style = "background-color: none";
  }
}

function restart() {
  sequence.splice(0);
  answer.splice(0);
  round = 1;
  playRound(round);
}