$(document).ready( () => {
  $.ajax({url: "https://api.themoviedb.org/3/movie/now_playing?api_key=62cfb4f0d7a8e18f1a1b5cc5016faf16&language=en-US&page=1", success: function(result){
    for (i = 0; i < 3; i++) // for loop with 3 loops for 3 movies
    {
      var title = document.createElement("h1");
      title.innerHTML = result.results[i].title;
      var image = document.createElement("img");
      image.id = "image" + (i+1); // i+1 because the loop starts at 0
      image.src = "https://image.tmdb.org/t/p/w500" + result.results[i].poster_path; // base url + image source, from the dev dovs under configuration https://developers.themoviedb.org/3/configuration/get-api-configuration
      var description = document.createElement("p");
      description.id = "description" + (i+1);
      description.className = "description";
      description.style.display = "none"; // description starts off hidden, since desc is hidden and image is not, then toggling them at the same time will make it so they flip back and forth
      description.innerHTML = result.results[i].overview;
      var div = document.createElement("div"); // making  divs for delegate parent selector purposes
      div.className = "container";
      div.appendChild(title);
      div.appendChild(image);
      div.appendChild(description);
      div.id = "movie" + (i+1);
      $("#main").append(div);
    };
    $("#movie1").delegate("h1", "click", function(event) // used ids for each delegate in order to not select every h1 on the page
      {
        $("#image1").toggle(500);
        $("#description1").toggle(500);
      })
    $("#movie2").delegate("h1", "click", function(event)
      {
        $("#image2").toggle(500);
        $("#description2").toggle(500);
      })
    $("#movie3").delegate("h1", "click", function(event)
      {
        $("#image3").toggle(500);
        $("#description3").toggle(500);
      })
  }});

});
