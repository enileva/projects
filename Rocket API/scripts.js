var request = "null"; // this will determine whether user is sending request for astronauts or launches

var container = document.getElementById("container"); // container which can be cleared for the info

var httpRequest = new XMLHttpRequest();
var button1 = document.getElementById("sendLaunchRequest");
button1.addEventListener("click", function(){
  request = "launch";
  container.innerHTML = " "; //clear container for new objects each click
  httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/launch/?limit=4&search=NASA"); // reasonable limit plus parameter of nasa launches
  httpRequest.send();
  httpRequest.onreadystatechange = httpProcess;
})
var button2 = document.getElementById("sendAstronautRequest"); // 2 different buttons for 2 different kinds of requests
button2.addEventListener("click", function(){
  request = "astronaut";
  container.innerHTML = " ";
  httpRequest.open("get", "https://lldev.thespacedevs.com/2.2.0/astronaut/?limit=4&is_human=false"); // reasonable limit plus parameter of non-human astronauts
  httpRequest.send();
  httpRequest.onreadystatechange = httpProcess;
})

function httpProcess()
{
  if (httpRequest.readyState == 4 && httpRequest.status == 200)
  {
    var items = httpRequest.responseText; // takes response from our request
    var object = JSON.parse(items); // parses it into an array
    print(object); // our print function
  }
}

function print(object)
{
  /*var name = document.getElementById("name");
  var image = document.getElementById("image");
  var caption = document.getElementById("caption");*/
  console.log(object); // checking where to find things in the object..
  if (request == "launch")
  {
    for (var i = 0; i < object.results.length; i++) // for loops to get all results
    {
      var name = document.createElement("h1");
      name.id = "name";
      name.innerHTML = object.results[i].name;
      var image = document.createElement("img");
      image.id = "image";
      image.src = object.results[i].image;
      var caption = document.createElement("h4");
      caption.id = "caption";
      caption.innerHTML = object.results[i].mission.description;
      container.appendChild(name);
      container.appendChild(image);
      container.appendChild(caption);
    }
  }
  else if (request == "astronaut")
  {
    for (var i = 0; i < object.results.length; i++)
    {
      var name = document.createElement("h1");
      name.id = "name";
      name.innerHTML = object.results[i].name;
      var image = document.createElement("img");
      image.id = "image";
      image.src = object.results[i].profile_image;
      var caption = document.createElement("h4");
      caption.id = "caption";
      caption.innerHTML = object.results[i].bio;
      container.appendChild(name);
      container.appendChild(image);
      container.appendChild(caption);
    }
  }
  /*var newName = object.results[];
  var newImage = object.results[];
  var newCaption = object.results[];*/
}

// home button to clear stuff
var home = document.getElementById("home");
home.addEventListener("click", function(){
  container.innerHTML = "";
})
