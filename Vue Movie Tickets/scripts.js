//const movies = "https://api.themoviedb.org/3/movie/upcoming?api_key=62cfb4f0d7a8e18f1a1b5cc5016faf16&language=en-US&page=1"
// API

/*
Vue.component("showings",{
  template: `
  <div class="showing">
    <h1>{{title}}</h1>
    <img v-bind:src=img>
    <p>{{overview}}</p>
    <button id={{title}} v-on:click="addAdultTicket()">Adult Ticket</button>
    <button id={{title}} v-on:click="addChildTicket()">Child Ticket</button>
  </div>
    `,
    props:['title', 'img', 'overview']
}); // component to copy paste all the elements
*/

Vue.component('showings', {
        template: ' <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);padding: 16px;text-align: center;background-color: #f1f1f1;" class="card"><img v-bind:src=img><h1>{{title}}</h1><p>{{overview}}</p><button id=movie.title @click="addAdultTicket(movie)">Adult Ticket</button><button id=movie.title @click="addChildTicket(movie)">Child Ticket</button></div>',
        props: ['img', 'title', 'overview'],
        data: function(){
          return{
            movie: "",
            adultTix: 0,
            childTix: 0,
            total: 0.0
          }
        }
      })

var app = new Vue({
  el: "#main", // get main divs
  data: {
    arrMovies: [], // empty array for API result
    movies: [], // movies that will be displayed
    title: "Movie Tickets",
    adultTixAmt: 0,
    adultTixCost: 0.0,
    // so these ticket amounts were intended to keep track of the amounts for the order page
    childTixAmt: 0,
    childTixCost: 0.0,
    totalTixAmt: 0,
    totalCost: 0.0,
    cartVisibility: true,
    // this visibility was intended to flip in response to the "add ticket" button being pushed which you can see in the method
    // and intended to be reversible when all orders were removed
  },
  created ()
  {
    axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=62cfb4f0d7a8e18f1a1b5cc5016faf16&language=en-US&page=1")
    .then((response) => {
        this.arrMovies = response.data.results;
        for (var i = 0; i < 4; i++)
        {
          this.movies.push(this.arrMovies[i]);
        }
      })
  }, // so I put the axios call in the created lifecycle so I could then initialize an amount of tickets on each movie object in the json file
  // within the updated cycle.
  updated ()
  {
    for (i = 0; i < this.movies.length; i++)
    {
      console.log(this.movies[i].title);
      this.movies[i].adultTickets = 0;
      this.movies[i].childTickets = 0;

    }
  },
  methods:
  {
    /*initializeTix(movie)
    {
      console.log(this.movie.title);
      this.movie.adultTickets = 0;
      this.movie.childTickets = 0;
    },*/
    addAdultTicket(movie)
      {
        this.adultTixAmt += 1;
        this.totalCost += 6.99;
        this.totalTixAmt += 1;
        movie.adultTickets += 1;
        this.cartVisibility = false;
        console.log(movie.adultTickets);
        console.log(this.totalTixAmt);
        console.log(this.totalCost);
      },
    addChildTicket(movie)
      {
        this.childTixAmt += 1;
        this.totalCost += 3.99;
        this.totalTixAmt += 1;
        movie.childTickets += 1;
        this.cartVisibility = false;
        console.log(movie.childTickets);
        console.log(this.totalTixAmt);
        console.log(this.totalCost);
      }
  }
});

// what really tripped me up on this project was the vue components
// we initialize the array of movie in the vue app, but then this data has to be shared amongst the vue components
// which was difficult to keep track of for me
