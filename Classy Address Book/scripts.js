class Contacts {
    constructor(name, last, email, pic){
        this.name = name;
        this.last = last;
        this.email = email;
        this.pic = pic
    }
    updateContact() {
        var contactDiv = document.getElementById('name');
        contactDiv.innerHTML = "";
        contactDiv.innerHTML = `<h1>${this.name} ${this.last}</h1><h3>${this.email}</h3>`
        document.getElementById('contactImg').src = `images/${this.pic}`
    }
}

var contact1 = new Contacts("Snow", "White", "swhite@castle.com", "snowwhite.png");
var contact2 = new Contacts ("Dopey", "Dwarf", "ddwarf@cottage.com", "dopey.png")

var contacts=[contact1, contact2]

function contactsList() // putting this in a function list so we can call and update the list of contacts with each press of Add Contact
{
  //display the name of all of the contacts we currently have
  var strContacts = "<ul>"
  for (var i = 0; i < contacts.length; i++)
  {
    strContacts += `<li value=${i}>${contacts[i].name} ${contacts[i].last} </li>`
  }
  strContacts += "</ul>"
  document.getElementById('contactList').innerHTML = strContacts

  document.getElementById('contactList').addEventListener('click', function(e)
  {
    contacts[e.target.value].updateContact();
  })
}

contactsList(); // initialize list of contacts w default contacts in array

var button = document.getElementById('submit');

button.addEventListener('click', function()
{
  var firstName = document.getElementById('firstName'); // get all inputs on page
  var lastName = document.getElementById('lastName');
  var email = document.getElementById('email');
  var imgSrc = document.getElementById('imgSrc');
  var newContact = new Contacts(firstName.value, lastName.value, email.value, imgSrc.value); // create a new Contacts object with all the values entered by the user
  contacts.push(newContact) // add to the end of contacts array
  contactsList(); // show the new list of contacts with new contact
})
