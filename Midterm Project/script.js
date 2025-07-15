var spaceColorsArray = ["cyan", "magenta", "yellow", "green", "indigo", "crimson"];
var spaceHexesArray = ["#00AEEF", "#EC008C", "#FFF200", "#00A651", "#2E3192", "#ED1C24"];
var cardTextsArray = ["you studied really hard for your exam and did great!", "you partied instead of studying. shameful.", "the system glitched and wiped your assignment!", "your internet went out right as you were submitting; don't wait until the last 5 minutes next time.", "you worked really hard on your midterm and turned it in.", "thunderstorm, your house doesn't have wifi and you didn't finish your assignment.", "yay, the teacher let us have extra credit!", "you talked all through class and didn't learn a thing. At least you weren't bored.", "you spent your time wisely and programmed some independent projects. Good job!", "you fell asleep at your computer before you finished debugging!" ];
var gradesArray = ["A", "B", "C", "D", "F"];

var container = document.getElementById("BoardContainer");
var size = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
container.style.height = size + "px";
container.style.width = "65%";

var player1 = {name: "Player 1", turns: 0, classes: 0};
var player2 = {name: "Player 2", turns: 0, classes: 0};

var currentSpaceNum1 = 1;
var currentSpaceNum2 = 1;

var canvasButton = document.getElementById("CanvasButton");
var rollDieButton = document.getElementById("DieButton");

//var canvasBool = false; //whether they are allowed to click the canvas button

window.addEventListener("load", function() {
  initializeBoard();
});

function canvasButtonPressed(player)
{
    takeAClass(player);
}

rollDieButton.addEventListener("click", function() {
  var spacesToMove = Math.floor(Math.random() * 6) + 1;
  var cardsList = document.querySelectorAll(".cardSpace");
	var cardSpaces = Array.from(cardsList);
  var cardSpacesNumbers = [3, 6, 9, 12, 15, 18];
  var classSpacesNumbers = [6, 12, 18];
  var cardText = document.getElementById("AnnouncementCardText");
  cardText.innerHTML = " "; // clear announcements for clarity.
  var classText = document.getElementById("AnnouncementClassText");
  classText.innerHTML = " ";
  var pressCanvas = document.getElementById("PressCanvasText");
  pressCanvas.innerHTML = " ";
  canvasButton.removeEventListener("click", canvasButtonPressed)
  if (player1.turns == player2.turns)
  {
    for (var i = 1; i < 19; i++)
    {
      var p1Spaces = document.getElementById("player1Triangle" + i)
      p1Spaces.style.visibility = "hidden";
    }
    currentSpaceNum1 += spacesToMove;
    if (currentSpaceNum1 > 18)
    {
      currentSpaceNum1 = currentSpaceNum1 - 18;
    }
    var p1 = document.getElementById("player1Triangle" + currentSpaceNum1);
    p1.style.visibility = "visible";
    for (var k = 0; k < cardSpacesNumbers.length; k++)
    {
      if (currentSpaceNum1 == cardSpacesNumbers[k])
      {
        pullACard(player1);
      }
    }
    for (var d = 0; d < classSpacesNumbers.length; d++)
    {
      if (currentSpaceNum1 == classSpacesNumbers[d])
      {
        pressCanvas.innerHTML = player1.name + ", please press the Canvas button to see your grade.";
        canvasButton.addEventListener("click", function(){
          canvasButtonPressed(player1)
        });
      }
    }
    player1.turns++;
  }
  else
  {
    for (var i = 1; i < 19; i++)
    {
      var p2Spaces = document.getElementById("player2Triangle" + i)
      p2Spaces.style.visibility = "hidden";
    }
    currentSpaceNum2 += spacesToMove;
    if (currentSpaceNum2 > 18)
    {
      currentSpaceNum2 = currentSpaceNum2 - 18;
    }
    var p2 = document.getElementById("player2Triangle" + currentSpaceNum2);
    p2.style.visibility = "visible";
    for (var k = 0; k < cardSpacesNumbers.length; k++)
    {
      if (currentSpaceNum2 == cardSpacesNumbers[k])
      {
        pullACard(player2);
      }
    }
    for (var d = 0; d < classSpacesNumbers.length; d++)
    {
      if (currentSpaceNum2 == classSpacesNumbers[d])
      {
        var pressCanvas = document.getElementById("PressCanvasText");
        pressCanvas.innerHTML = player2.name + ", please press the Canvas button to see your grade.";
        canvasButton.addEventListener("click", function(){
          canvasButtonPressed(player2)
        });
      }
    }
    player2.turns++;
  }
})

function initializeBoard()
{
  container.innerHTML = ""; // clear the board out each time
  var title = document.createElement("h1");
  title.innerHTML = "Trials and Tribulations";
  container.appendChild(title);
  makeSpaces(3);
  var spacesList = document.querySelectorAll(".space");
	var spaces = Array.from(spacesList);
	var width = size/2;
  var height = size/2;
  var angle = 0;
	var step = 2 * Math.PI / spaces.length;
  var radius = 0.7 * width;

  var angle = -90 * Math.PI / 180;

	spaces.forEach(function(element) {
	  var x = Math.round(width + radius * Math.cos(angle));
    var y = Math.round(height + radius * Math.sin(angle));
		element.style.right = x + 'px';
		element.style.top = y + 'px';
    angle =  angle - step;
	});
  var classes1Announcement = document.getElementById("player1Classes");
  classes1Announcement.innerHTML = "Player 1 classes: " + player1.classes;
  var classes2Announcement = document.getElementById("player2Classes");
  classes2Announcement.innerHTML = "Player 2 classes: " + player2.classes;
}

function makeSpaces(times)
{
  var count = 1;
  for (var k = 1; k < times+1; k++)
  {
    for (var i = 1; i < spaceHexesArray.length + 1; i++)
    {

      var space = document.createElement("div");
      space.setAttribute("class", "space");
      space.setAttribute("id", "space" + count);
      space.innerHTML = " ";
      space.style.backgroundColor = spaceHexesArray[i-1];
      container.appendChild(space);

      var player1Triangle = document.createElement("div");
      player1Triangle.setAttribute("id", "player1Triangle" + count);
      player1Triangle.style.zIndex = "9";
      player1Triangle.style.visibility = "hidden";
      player1Triangle.style.width = 0;
      player1Triangle.style.height = 0;
      player1Triangle.style.borderLeftWidth = "25px";
      player1Triangle.style.borderLeftStyle = "solid";
      player1Triangle.style.borderLeftColor = "transparent";
      player1Triangle.style.borderRightWidth = "25px";
      player1Triangle.style.borderRightStyle = "solid";
      player1Triangle.style.borderRightColor = "transparent";
      player1Triangle.style.borderTopWidth = "50px";
      player1Triangle.style.borderTopStyle = "solid";
      player1Triangle.style.borderTopColor = "rgb(255, 255, 255)";
      var player2Triangle = document.createElement("div");
      player2Triangle.setAttribute("id", "player2Triangle" + count);
      player2Triangle.style.zIndex = "9";
      player2Triangle.style.visibility = "hidden";
      player2Triangle.style.width = 0;
      player2Triangle.style.height = 0;
      player2Triangle.style.borderLeftWidth = "25px";
      player2Triangle.style.borderLeftStyle = "solid";
      player2Triangle.style.borderLeftColor = "transparent";
      player2Triangle.style.borderRightWidth = "25px";
      player2Triangle.style.borderRightStyle = "solid";
      player2Triangle.style.borderRightColor = "transparent";
      player2Triangle.style.borderBottomWidth = "50px";
      player2Triangle.style.borderBottomStyle = "solid";
      player2Triangle.style.borderBottomColor = "rgb(0, 0, 0)";

      if (count % 3 == 0) // placing cards every 3 spaces
      {
        var card = document.createElement("img");
        card.src = "images/sparkle.png";
        card.style.height = "40px";
        card.style.width = "40px";
        card.setAttribute("class", "cardSpace");
        card.setAttribute("id", "card" + count);
        space.appendChild(card);
      }

      if (count % 6 == 0) // placing cards every 3 spaces
      {
        var classReport = document.createElement("img");
        classReport.src = "images/class.png";
        classReport.style.height = "40px";
        classReport.style.width = "40px";
        classReport.setAttribute("class", "classSpace");
        classReport.setAttribute("id", "class" + count);
        space.appendChild(classReport);
      }

      if (space.id == "space1")
      {
        player1Triangle.style.visibility = "visible";
        player2Triangle.style.visibility = "visible";
      }
      space.appendChild(player1Triangle);
      space.appendChild(player2Triangle);
      count++;
    }
  }
}

function pullACard(player)
{
  var cardPulled = Math.floor(Math.random() * 10) + 1;
  var cardContainer = document.getElementById("Announcement");
  var cardText = document.getElementById("AnnouncementCardText");
  cardText.innerHTML = player.name + ", " + cardTextsArray[cardPulled-1];
}

function takeAClass(player)
{
  var gradeAchieved = Math.floor(Math.random() * 5) + 1;

  var classContainer = document.getElementById("Announcement");
  var classText = document.getElementById("AnnouncementClassText");
  classText.innerHTML = player.name + ", your grade was " + gradesArray[gradeAchieved-1];
  if (gradeAchieved-1 < 3) // 3 in the array is D and above is F if they got under those then they passed another class
  {
    player.classes++;
  }
  // update all classes
  var classes1Announcement = document.getElementById("player1Classes");
  classes1Announcement.innerHTML = "Player 1 classes: " + player1.classes;
  var classes2Announcement = document.getElementById("player2Classes");
  classes2Announcement.innerHTML = "Player 2 classes: " + player2.classes;

  if (player.classes > 3)
  {
    var pressCanvas = document.getElementById("PressCanvasText");
    pressCanvas.innerHTML = player.name + ", you won! Congratulations!"
  }
  else if (player.classes = 3)
  {
    pressCanvas.innerHTML = player.name + ", your next class is the Capstone and if you pass, you will win."
  }
}
