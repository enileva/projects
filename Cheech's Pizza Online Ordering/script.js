window.addEventListener("load", function(){ //on load the type and amount dropdowns will initialize
  var pizzaType = document.getElementById("pizzaType");
  var pizzaTypeArray = ["Select One", "Pepperoni", "Sausage", "Hawaiian", "Anchovy", "Bacon"];
  for (var i = 0; i < pizzaTypeArray.length; i++)
  {
    var newPizzaType = document.createElement("option");
    newPizzaType.value = pizzaTypeArray[i]; // change value and innerHTML so we can send values into validate function
    newPizzaType.innerHTML = pizzaTypeArray[i];
    pizzaType.appendChild(newPizzaType);
  }
  var pizzaAmount = document.getElementById("pizzaAmount");
  for (var k = 1; k < 11; k++) // start at 1 so customer can't choose zero
  {
    var newPizzaAmount = document.createElement("option");
    newPizzaAmount.value = k;
    newPizzaAmount.innerHTML = k;
    pizzaAmount.appendChild(newPizzaAmount);
  }
})

var button = document.getElementById("validate");

button.addEventListener("click", function(){ //submit button gets all values and puts the into the validating function
  console.log(1);
  var pizzaType = document.getElementById("pizzaType").value;
  var pizzaAmount = document.getElementById("pizzaAmount").value;
  var customerName = document.getElementById("customerName").value;
  var customerPhone = document.getElementById("customerPhone").value;
  validateData(pizzaType, pizzaAmount, customerName, customerPhone);
})



function validateData(type, amount, name, phone)
{
  var isValidType = true; // three different value types -- this is so if the customer gets more than one thing wrong and only fixes one, then the fixed one can go back to normal (isvalid) while the incorrect one will stay invalid
  var isValidName = true;
  var isValidPhone = true;
  var nameStatus = document.getElementById("NameStatus");
  var nameInput = document.getElementById("customerName");
  var phoneStatus = document.getElementById("PhoneStatus");
  var phoneInput = document.getElementById("customerPhone");
  var typeInput = document.getElementById("pizzaType");
  var typeStatus = document.getElementById("TypeStatus");

  console.log(4);
  var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;


  if (type == "Select One") // select one is not a type of pizza
  {
    isValidType = false;
    typeInput.style.backgroundColor = "rgb(242, 165, 165)";
    typeStatus.innerHTML = "Please select a pizza type.";
  }

  if (type != "Select One") // switch back if they fixed it
  {
    typeInput.style.backgroundColor = "transparent";
    typeStatus.innerHTML = ""; // no need to use hidden/visible, just take text out
    isValidType = true;
  }

  if (name.length < 6) // name must be longer than 6 characters
  {
    nameInput.style.backgroundColor = "rgb(242, 165, 165)";
    nameStatus.innerHTML = "Name must be 6 characters or longer.";
    isValidName = false;
    if (name == "") // name is contained within less than 6 characters if because otherwise <6 will trigger even when string is empty
    {
      isValidName = false;
      name = " "; // set string to space so no null error
      nameInput.style.backgroundColor = "rgb(242, 165, 165)";
      nameStatus.innerHTML = "Please enter a name.";
      console.log(3);
    }
  }

  if (name.length >= 6)
  {
    nameInput.style.backgroundColor = "transparent";
    nameStatus.innerHTML = "";
    isValidName = true;
  }

  if (!phone.match(regex))
  {
    phoneInput.style.backgroundColor = "rgb(242, 165, 165)";
    phoneStatus.innerHTML = "Please enter a valid phone number. (Ex: 123-456-7890)";
    isValidPhone = false; // provide format for customer
    if (phone == "") // this is placed inside the if for the same reason as the name if
    {
      isValidPhone = false;
      phone = " ";
      phoneInput.style.backgroundColor = "rgb(242, 165, 165)";
      phoneStatus.innerHTML = "Please enter a phone number.";
    }
  }

  if (phone.match(regex))
  {
    phoneInput.style.backgroundColor = "transparent";
    phoneStatus.innerHTML = "";
    isValidPhone = true;
  }

  if (isValidName && isValidType && isValidPhone) // if all is valid send data along to thankyou page
  {
    console.log(1);
    thankYou(type, amount, name, phone);
  }
}

function thankYou(type, amount, name, phone)
{ // this proceeds the url to the thankyou page with all of their unique data
  window.location.href = "thankyou.html?customerName=" + name + "&customerPhone=" + phone + "&pizzaType=" + type + "&pizzaAmount=" + amount;
}
