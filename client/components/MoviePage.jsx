import React from 'react';

/**
  component that handles 
**/
class MoviePage extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      movies: {}, //object returned from API, movies.film is an array containing an object for each movie
      status: "loading", //loading | error | ready
      
      //url params: limit=10 & offset = 5 would return movies 5 through 15
      limit: 11,
      offset: 22,
      
      displayType: "movie-list" //movie-list | movie-table
    }
  }

  render() {
    return (
      <div className="grid movie-page">
        { //if component is ready(done fetching data) render movies, otherwise rende status
          (this.state.status == "ready") ?
            this.renderMovies()
          :
            this.renderStatus()
        }
      </div>
    )
  }

  renderStatus() {
    return <h1>{this.state.status}</h1>
  }
  
  //create a list or grid(depending on state.displayType) and renders each movie element from state.movies.film array inside of it
  renderMovies() {
    return (
      <div className={this.state.displayType}>
        {
          this.state.movies.film.map((movie) => {
            return this.renderMovie(movie)
          })
        }
      </div>
    )
  }
  
  //renders a single movie
  renderMovie(movie) { 
    return <Movie title={movie.title} />
  }
  
  /** 
  send a get request to the snagfilms url, plugging in limit/offset url params from state for pagination, then converts the response stream into JSON and updates state
  
  onError: set state.status to "error" so component can render an error message to user
  **/
  componentDidMount() {
    fetch("http://www.snagfilms.com/apis/films.json?limit=" + this.state.limit + "&offset=" + this.state.offset)
    .then((response) => response.json())
    .then((movies) => {
      console.log(movies.films);
      this.setState({
        movies: movies.films,
        status: "ready"
      });
    }).catch((err) => {
      this.setState({
        status: "error"
      });
    });
  }
}

/**
  Stateless functional component for movies
  each instance renders a grid element to display a single movie
  
  -props: title:String, author:String, runtime:Number, tags:[String],
**/
const Movie = function(props) {
    return (
      <div className="movie-item">
        
      </div>
    )
  
}


export default MoviePage;