$(document).ready( () => {
  $.ajax({url: "https://api.themoviedb.org/3/person/popular?api_key=62cfb4f0d7a8e18f1a1b5cc5016faf16&language=en-US", success: function(result){
    for (i = 0; i < result.results.length; i++) // loops for the amount of results given by api
    {
      var name = document.createElement("h1");
      name.innerHTML = result.results[i].name;
      var button = document.createElement("button");
      button.innerHTML = "Get Details";
      button.id = result.results[i].id; // giving the button an id so we can pass it on into the new Details api call trust me this was the only way. at least that i could figure out.
      var div = document.createElement("div"); // making  divs for styling purposes
      div.className = "container";
      div.appendChild(name);
      div.appendChild(button);
      div.id = "Person" + result.results[i].id;
      $("#main").append(div);
      button.addEventListener("click", function(){
        var buttonId = "Person" + this.id; // make buttonId BEFORE going into ajax because otherwise "this" stops working
          $.ajax({url: "https://api.themoviedb.org/3/person/" + this.id + "?api_key=62cfb4f0d7a8e18f1a1b5cc5016faf16&language=en-US", success: function(resultDetails){
            var bio = document.createElement("h3");
            bio.innerHTML = resultDetails.biography;
            var profile = document.createElement("img");
            profile.src = "https://image.tmdb.org/t/p/w500" + resultDetails.profile_path;
            var buttonDiv = document.getElementById(buttonId);
            buttonDiv.appendChild(profile);
            buttonDiv.appendChild(bio);
            }});
      });
    };
  }});
});

// ended up using "this" keyword with the button id but tried a lot of different things
// tried to pass through the anonymous function. simply could not do this
// tried to make a separate function but calling a function not wrapped within an anonymous function with parameters (i kept passing in the div and button) just. ran it for each actor
// tried to wrap it in an anonymous function but this meant that since the for loop had been completed, id was set to the very last actor's id and the event listener would only use that
// even though i thought that it would add the function with those particular id's for each for loop. well this way works though
