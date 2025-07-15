var imageArrayHA = ["arnold.jpg", "helga.jpg", "phoebe.jpg", "gerald.jpg"];

var imageArrayPPG = ["all.jpg", "blossom.jpg", "bubbles.jpg", "buttercup.jpg"];

var arraySwitch = 0; // we initialize arrayswitch at zero even though the main image set (HA) is 1 because we need to increment/decrement arraySwitch with each call.

window.addEventListener("load", initializeImages(imageArrayHA, arraySwitch)); // initializes main image set on load with arraySwitch set at zero

function initializeImages(array)
{
  var mainImageContainer = document.getElementById("Main"); // creating a MainImage along with the thumbnails enables the main to switch along with the array, meaning no mismatch
  mainImageContainer.innerHTML = ""; // clear it out each time for new main image
  var mainImage = document.createElement("img");
  mainImage.src = array[0]; // index 0 has the first image in an array, which is the default main image
  mainImage.id = "MainImage"; // ensure mainImageEvent works plus styling
  mainImageContainer.appendChild(mainImage);


  var thumbnails = document.getElementById("Container");
  thumbnails.innerHTML = ""; // clear out for new thumbnails
  for (var i = 0; i < array.length; i++) // we loop around 4 times (array length) creating and appending images
  {
    var newImage = document.createElement("img");
    newImage.src = array[i];
    thumbnails.appendChild(newImage);
    console.log(i)
  }

  if (arraySwitch == 1) // binary array switch means we can switch between two arrays. adding another array would only be a matter of adding a 2 case and subtracting 2 to get back to zero.
  {
    arraySwitch -= 1;
    imageEvents();

    mainImageEvent(arraySwitch); // pass in array switch to continue the never ending loop of array switch
  }
  else if (arraySwitch == 0)
  {
    arraySwitch += 1;
    imageEvents();

    mainImageEvent(arraySwitch);
  }
}
function imageEvents()
{
  var images = document.getElementsByTagName("img"); // we can simply get all img elements despite main being an img element because clicking on main would only switch its src to itself which has no effect
  for (var i = 0; i < images.length; i++)
  {
    images[i].addEventListener("click", function(e) // we have to pass in e in order to use this. we can't just use images[i] because it is out of scope in the anonymous function.
  {
    document.getElementById("MainImage").src = this.src; // "this" refers to itself; in this case "itself" is images[i]
  })
  }
}


function mainImageEvent(arraySwitch) // previously i had the contents of mainImageEvent in the body of this file but i had to move it into a function in order to have Zero images hard coded into the html. plus benefit of no mismatched main/thumbnails
{
  var mainImage = document.getElementById("MainImage");
  mainImage.addEventListener("dblclick", function()
  {
    if (arraySwitch == 1)
    {
      initializeImages(imageArrayPPG)
    }
    else if (arraySwitch == 0)
    {
      initializeImages(imageArrayHA)
    }
  });
}
