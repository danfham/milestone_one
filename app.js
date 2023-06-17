// static elements of page
const formulaForm = document.getElementById('formulaForm');
const formulaInput = document.getElementById('formulaInput');
const answerForm = document.getElementById('answerForm');
const answerInput = document.getElementById('answerInput');
const notification = document.getElementById('notification');
const scoreElement = document.querySelector('.scoreboard.left');
const resetButton = document.getElementById('reset');
const timerElement = document.getElementById('timer');

//character 'models'
const character1 = document.getElementById('character1');
const enemy1 = document.getElementById('enemy1');
const ship = document.getElementById('spaceship');


// set global variables 
let score = 0;
let val1 = 0; 
let val2 = 0; 
let plyrNum = 1;
let distance= 500;
let turn = 0;
let duration = 30;
let stopTimer=false;

// generate a question that we can then solve!
formulaForm.addEventListener('submit', function(e) {
  e.preventDefault();

  // Generate a random multiplication expression
  val1 = Math.floor(Math.random() * 10) + 1;
  val2 = Math.floor(Math.random() * 10) + 1;
  const expression = `${val1} × ${val2}`;

  countdownTimer(duration, () => {
    // Timer completed, perform any desired actions here
    alert('Countdown timer completed!');
  });

  // Display the next expression
  formulaInput.placeholder = expression;
  formulaInput.value = '';
});

// do the valiation of the expression generated by request
answerForm.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const answerGiven = answerInput.value;
    
    // placeholder space to evaluate turn based on click of submit button; even turns for player 2 
    //turn++
  
    // Validate the answer
    if (parseInt(answerGiven) === val1 * val2) {
      stopTimer=true;
      notification.textContent = 'OOOOOHHHH YEAAAA!';
      score++;
      scoreElement.textContent = 'Player'+plyrNum+' Score: ' + score;
      
      // todo: need to be more dynamic based on which player ...      
      character1.style.left=moveCharacter(character1.style.left)
      
      //check collision with Ship, then animate the ship based on success
      checkCollision(false); //checking ship collision; hence dino -> false

    } else {
      notification.textContent = 'Oops! The correct answer is: '+operand1*operand2+'. Try again.';
      enemy1.style.left=moveEnemy(enemy1.style.left)
      checkCollision(true); //checking dino collision -> true

    }
  
  });

resetButton.addEventListener('click',restartGame)

function restartGame(){
  location.reload(true);
}  

// need to add in a declalaration of which character to move.
function moveCharacter(position) {
  // Move the character here
  if(!isNaN(parseInt(position))){
    position=(parseInt(position) + 20)+'%';
  } else {
    position+=10+'%';
  }
  return position;
}

function moveEnemy(position) {
  // Move the character here
  if(!isNaN(parseInt(position))){
    position=(parseInt(position) + 20)+'%';
  } else {
    position+=-20+'%';
  }
  return position;
}

function checkCollision(flag){
  const charRect = character1.getBoundingClientRect();
  const enemyRect = enemy1.getBoundingClientRect();
  const shipRect = ship.getBoundingClientRect();
  
  // evaulate collision based on interaction; the ship and dino respectively
  if(flag===true){
    //alert("cb: "+charRect.bottom+","+"eb: "+enemyRect.bottom+"cl: "+charRect.left+","+"er: "+(enemyRect.right-250))
    if (
      charRect.left < (enemyRect.right-250) &&
      charRect.bottom < enemyRect.bottom
    ) {
      // Collision detected
      character1.style.display = 'none';
      notification.textContent = 'DINO GOT YA!';
      resetButton.style.display ='block'
      answerForm.style.display='none';
      formulaForm.style.display='none'; 
    }
  } else{
    //alert("cb: "+charRect.bottom+","+"sr: "+enemyRect.bottom+"cl: "+charRect.left+","+"sr: "+(shipRect.left))
    if (
      charRect.left > (shipRect.left) &&
      charRect.bottom < shipRect.bottom
    ) {
      // Collision detected
      character1.style.display = 'none';
      notification.textContent = 'Welcome Aboard Captain';
    }
  }

}

function countdownTimer(duration, answer, callback) {
  let timer = duration;
  let minutes, seconds;

  const interval = setInterval(() => {
    minutes = Math.floor((timer / 60) % 60).toString().padStart(2, '0');
    seconds = Math.floor(timer % 60).toString().padStart(2, '0');

    const timerText = `${minutes}:${seconds}`;
    timerElement.textContent = timerText;

    if (timer <= 0) {
      clearInterval(interval);
      if (callback) {
        callback();
      }
    }

    timer--;
  }, 1000);
}





