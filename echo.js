

// creating a variable list with all the vars inside
var echo = {
  level: 0,
  possibilities: ['.green','.blue', '.pink', '.orange'],
  currentEchoes: [],
  player: [],
  sound:{
    blue: new Audio('blue.mp3'), 
    pink: new Audio('pink.mp3'), 
    orange: new Audio('orange.mp3'), 
    green: new Audio('green.mp3'),
    fail:new Audio('fail.mp3')
  },
}



//ensuring replay

function newGame() {
  clearGame();

}

function clearGame() {
  echo.currentEchoes = [];
  echo.level = 0;
  addLevel();
}

//click start button (onclick jQuery)

$(document).ready(function(){
  $("a.button").click(function(){
    newGame();
  });
});

//Level increment
function addLevel() {
  echo.level++
  $('#clickNumber').addClass('animated fadeOutDown');
  
  setTimeout(function(){
    $('#clickNumber').removeClass('fadeOutDown').html("Level "+echo.level).addClass('fadeInDown');
  }, 200);
  
  generateMove();
}

function generateMove(){
    echo.currentEchoes.push(echo.possibilities[(Math.floor(Math.random()*4))]); // generating a new echo
  showMoves();
}

//The logic and loop part:  ********************************  BACK END ********************************

function showMoves() {

  var i=0; // i will be the number of moves (computer)
  var moves = setInterval(function(){ // Interval looping, go through all the moves in the list
    showEcho(echo.currentEchoes[i]) // showEcho() shows the button, loops through the entire echo list(all clicks)
    i++; // next echo in the list
    if (i >= echo.currentEchoes.length) { // if no more echoes, stop (players turn) 
      clearInterval(moves);
    }

  },600) // between 0.6 seconds

  clearPlayer() // ensuring user starts with nothing

}

//**********************************************************  FRONT END ********************************

function showEcho(field) {

  var csound = field.slice(1);
  if (csound == 'blue'){echo.sound.blue.play()}
  if (csound == 'pink'){echo.sound.pink.play()}
  if (csound == 'orange'){echo.sound.orange.play()}
  if (csound == 'green'){echo.sound.green.play()}
  
  var light=document.getElementById("lightmode").checked;
  if (light == true) {
    $(field).css({
   'background-color' : '#E5E8E8',
   'animation-name' : 'pulse',
   'animation-duration' : '0.4s',
});
  }
  else {
    $(field).css({
   'background-color' : 'rgba(255,255,255,0.5)',
   'animation-name' : 'pulse',
   'animation-duration' : '0.4s',
});}

  setTimeout(function(){
      $(field).css({
   'background-color' : 'none',
});
  }, 500);
}





// PLAYERS TURN

function clearPlayer() {
  echo.player = [];
}

function addToPlayer(id) {
  var field = "."+id
  console.log(field);
  echo.player.push(field);
  playerTurn(field);
} 

function playerTurn(field) {
  if (echo.player[echo.player.length - 1] !== echo.currentEchoes[echo.player.length - 1]) {
      incorrect();
      echo.sound.fail.play()
      sleep(2000);
      newGame();
   } 
   else {
      var cpsound = field.slice(1);
      if (cpsound == 'blue'){echo.sound.blue.play()}
      if (cpsound == 'pink'){echo.sound.pink.play()}
      if (cpsound == 'orange'){echo.sound.orange.play()}
      if (cpsound == 'green'){echo.sound.green.play()}

      console.log('Good Move!');
      var check = echo.player.length === echo.currentEchoes.length;
      if (check) {
          showdiv()
          nextLevel();
      }
    }
}

function nextLevel(){
  addLevel();
}

function showdiv() {
  setTimeout(function(){document.getElementsbyClassName("gamebutton").disabled = true;}, 5000)
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", "hide"); }, 1000);
}

function incorrect(){
  setTimeout(function(){document.getElementsbyClassName("gamebutton").disabled = true;}, 5000)
  var x = document.getElementById("snackbar2");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", "hide"); }, 3000);
}








function help() {
  var modal = document.getElementById('myModal');
  modal.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  var modal = document.getElementById('myModal');
  if (event.target == modal) {
    modal.style.display = "none";
  }
}



function settings() {
  var settings = document.getElementById('settingsdiv');
  settings.style.display = "block";
}

function closesettings() {
  var settings = document.getElementById('settingsdiv');
  settings.style.display = "none";
  var light=document.getElementById("lightmode").checked;
  if (light == true) {
    document.body.style.backgroundColor = 'white';
    document.body.style.color = 'black';
    document.getElementById('logo').style.color= 'black';
    document.getElementById('yo').style.color= 'black';
    document.getElementById('yo').style.backgroundColor= 'white';
  }
  else {
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    document.getElementById('logo').style.color= 'white';
    document.getElementById('yo').style.color= 'white';
    document.getElementById('yo').style.backgroundColor= 'black';
  }
}
  
