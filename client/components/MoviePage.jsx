import React from 'react';
import MovieGrid from './MovieGrid.jsx';
import MovieOptions from './MovieOptions.jsx';

/**
component responsive for rendering the entire page. 

	grabs data from snagfilms api
	renders MovieGrid component to display movies
	renders options component that allows user to set options for how the movies should be displayed, and handles the updates
**/
class MoviePage extends React.Component {
	
  constructor(props) {
    super(props);
    this.state = {
      movies: {}, //object returned from API, movies.film is an array containing an object for each movie
      status: "loading", //loading | error | ready
      
      //url params for api: e.g. limit=10 & offset = 5 would return movies 5 through 15
      limit: 11,
      offset: 300,
      
      displayType: "movie-list" //movie-list | movie-table
    }
  }

	//displays the status if movie data is not ready, otherwise renders <MovieGrid> to display movie data
  render() {
    return (
      <div className="grid movie-page">
        <MovieOptions limit={this.state.limit} offset={this.state.offset} limitChangeHandler={this.limitChangeHandler.bind(this)} pageChangeHandler={this.pageChangeHandler.bind(this)} />
        { //if component is ready(done fetching data) render movies, otherwise rende status
          (this.state.status == "ready") ?
            this.renderMovies()
          :
            this.renderStatus()
        }
      </div>
    )
  }

	//render the status while movie data is still being retrieved from API, or when an error occurs
  renderStatus() {
    return <h1>{this.state.status}</h1>
  }
  
  //render a MovieGrid that displays the movie data retrieved from api
  renderMovies() {
    return <MovieGrid movies={this.state.movies.film} displayType={this.state.displayType} />
  }

  //callback for changing limit(how many movies are displayed). set as onChange handler for limit input directly
  limitChangeHandler(e) {
    this.setState({
      limit: e.target.value
    });
  }
  
  pageChangeHandler(e) {
    if (Number(e.target.value) != NaN && Number(e.target.value) != 0) {
      this.setState({
        page: Number(e.target.value),
        offset: Number(e.target.value) * this.state.limit
      }, (p) => {console.log("updated state. page:" + this.state.page + ", offset:" + this.state.offset, p)}); //call ajax in setState callback(second param) - or use componentWillUpdate
    }
  }
  
  /** 
  send a get request to the snagfilms api, plugging in limit/offset url params from state for pagination, then converts the response stream into JSON and updates state
  
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



export default MoviePage;