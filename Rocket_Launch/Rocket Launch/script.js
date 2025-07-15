
// confusion

  var request = new XMLHttpRequest();
  var type = "launch";
  var type2 = "astronaut";

// spaceship 
createRequest("https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=5&search=SpaceX")
// createRequest("")

function createRequest(url) {
  request.open("get", url);
  request.send();
  request.onreadystatechange = httpResponse;
}


function httpResponse() {
  console.log(request.status);
  console.log(request.readyState)
  if (request.readyState == 4 && request.status == 200 )
  {
      //write code to process the json data
      var rockets = request.responseText; //data received from the server, api call (the json)
      var rocketsObj = JSON.parse(rockets);
      display(rocketsObj)
      console.log(rocketsObj)
  }
}


function display(rocketsObj) {
    if (type == "launch") {
      type = rocketsObj.results[4]
      document.getElementById("rocket").src = type.image
      console.log(launch.image)
      }
     else if (type == "astronaut") {
       type = rocketsObj.results[4]
       document.getElementById("rocket").src = launch.image
       console.log(launch.image)
      }
}

// document.getElementById('rocket2').addEventListener('click', function() {

// Rocket

// let spaceContainer = document.querySelector('.space');
